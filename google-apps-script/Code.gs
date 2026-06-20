const REGISTRATION_SHEET = "Registrations";
const CERTIFICATE_SHEET = "Certificates";
const DOCUMENT_FOLDER = "SSLTC Registration Documents";
const TIME_ZONE = "Asia/Kolkata";
const REGISTRATION_PREFIX = "SSLTC";

const REGISTRATION_HEADERS = [
  "Registration Number",
  "Name",
  "Father Name",
  "Mobile",
  "Email",
  "Address",
  "State",
  "District",
  "Course",
  "Registration Date",
  "Status",
  "Date of Birth",
  "Aadhaar",
  "Photo URL",
  "Aadhaar Front URL",
  "Aadhaar Back URL"
];

const CERTIFICATE_HEADERS = [
  "Registration Number",
  "Certificate URL",
  "Issue Date"
];

function doGet(e) {
  try {
    ensureSheets();
    const action = sanitize(e.parameter.action || "");
    if (action === "certificate") {
      return jsonResponse(findCertificate(e.parameter.registrationNumber));
    }
    return jsonResponse({ ok: false, message: "गलत अनुरोध है।" }, 400);
  } catch (error) {
    return jsonResponse({ ok: false, message: "समस्या आई। कृपया पुनः प्रयास करें।" }, 500);
  }
}

function doPost(e) {
  try {
    ensureSheets();
    const payload = JSON.parse(e.postData.contents || "{}");
    if (payload.action === "register") {
      return jsonResponse(registerStudent(payload));
    }
    return jsonResponse({ ok: false, message: "गलत अनुरोध है।" }, 400);
  } catch (error) {
    return jsonResponse({ ok: false, message: error.message || "समस्या आई। कृपया पुनः प्रयास करें।" }, 500);
  }
}

function registerStudent(payload) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const data = normalizeRegistrationPayload(payload);
    const sheet = getSheet(REGISTRATION_SHEET, REGISTRATION_HEADERS);
    const values = sheet.getDataRange().getValues();
    const duplicate = values.slice(1).some((row) => {
      const mobile = String(row[3] || "").trim();
      const email = String(row[4] || "").trim().toLowerCase();
      return mobile === data.mobile || (data.email && email === data.email.toLowerCase());
    });

    if (duplicate) {
      return { ok: false, duplicate: true, message: "आप पहले से पंजीकृत हैं।" };
    }

    const registrationNumber = nextRegistrationNumber(values);
    const fileUrls = saveFiles(registrationNumber, data.files);
    const date = Utilities.formatDate(new Date(), TIME_ZONE, "dd/MM/yyyy");

    sheet.appendRow([
      registrationNumber,
      data.fullName,
      data.fatherName,
      data.mobile,
      data.email,
      data.address,
      data.state,
      data.district,
      data.course,
      date,
      "Registered",
      data.dob,
      data.aadhaar,
      fileUrls.photo || "",
      fileUrls.aadhaarFront || "",
      fileUrls.aadhaarBack || ""
    ]);

    return {
      ok: true,
      registrationNumber,
      message: "पंजीकरण सफलतापूर्वक हो गया है।"
    };
  } finally {
    lock.releaseLock();
  }
}

function findCertificate(rawRegistrationNumber) {
  const registrationNumber = normalizeRegistrationNumber(rawRegistrationNumber);
  if (!registrationNumber) {
    return { ok: false, message: "कृपया सही पंजीकरण क्रमांक दर्ज करें।" };
  }

  const sheet = getSheet(CERTIFICATE_SHEET, CERTIFICATE_HEADERS);
  const values = sheet.getDataRange().getValues();
  for (let i = 1; i < values.length; i += 1) {
    const rowRegistration = normalizeRegistrationNumber(values[i][0]);
    if (rowRegistration === registrationNumber) {
      const certificateUrl = sanitize(values[i][1] || "");
      if (!certificateUrl) break;
      return {
        ok: true,
        found: true,
        record: {
          registrationNumber,
          certificateUrl,
          downloadUrl: makeDownloadUrl(certificateUrl),
          issueDate: sanitize(values[i][2] || "")
        }
      };
    }
  }

  return {
    ok: true,
    found: false,
    message: "आपका प्रमाणपत्र अभी उपलब्ध नहीं है।"
  };
}

function normalizeRegistrationPayload(payload) {
  const data = {
    fullName: sanitize(payload.fullName),
    fatherName: sanitize(payload.fatherName),
    mobile: sanitize(payload.mobile),
    email: sanitize(payload.email),
    dob: sanitize(payload.dob),
    aadhaar: sanitize(payload.aadhaar),
    address: sanitize(payload.address, 500),
    state: sanitize(payload.state),
    district: sanitize(payload.district),
    course: sanitize(payload.course),
    files: Array.isArray(payload.files) ? payload.files : []
  };

  const requiredFields = [
    ["fullName", "पूरा नाम भरें।"],
    ["fatherName", "पिता का नाम भरें।"],
    ["mobile", "मोबाइल नंबर भरें।"],
    ["dob", "जन्म तिथि भरें।"],
    ["aadhaar", "आधार नंबर भरें।"],
    ["address", "पूरा पता भरें।"],
    ["state", "राज्य भरें।"],
    ["district", "जिला भरें।"],
    ["course", "पाठ्यक्रम चुनें।"]
  ];

  requiredFields.forEach(([field, message]) => {
    if (!data[field]) throw new Error(message);
  });
  if (!/^[6-9]\d{9}$/.test(data.mobile)) throw new Error("कृपया सही 10 अंकों का मोबाइल नंबर दर्ज करें।");
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) throw new Error("कृपया सही ईमेल दर्ज करें।");
  if (!/^\d{12}$/.test(data.aadhaar)) throw new Error("कृपया सही 12 अंकों का आधार नंबर दर्ज करें।");

  ["photo", "aadhaarFront", "aadhaarBack"].forEach((field) => {
    if (!data.files.some((file) => file.field === field && file.data)) {
      throw new Error("कृपया सभी आवश्यक फोटो अपलोड करें।");
    }
  });

  return data;
}

function nextRegistrationNumber(values) {
  const year = Utilities.formatDate(new Date(), TIME_ZONE, "yyyy");
  const pattern = new RegExp("^" + REGISTRATION_PREFIX + "-" + year + "-(\\d+)$");
  let max = 0;
  values.slice(1).forEach((row) => {
    const value = String(row[0] || "").trim();
    const match = value.match(pattern);
    if (match) max = Math.max(max, Number(match[1]));
  });
  return REGISTRATION_PREFIX + "-" + year + "-" + String(max + 1).padStart(5, "0");
}

function saveFiles(registrationNumber, files) {
  const folder = getOrCreateFolder(DOCUMENT_FOLDER);
  const saved = {};
  files.forEach((file) => {
    const field = sanitize(file.field);
    const mimeType = sanitize(file.mimeType);
    const name = sanitize(file.name || field);
    if (!["photo", "aadhaarFront", "aadhaarBack"].includes(field)) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(mimeType)) {
      throw new Error("फोटो JPG, PNG या WEBP में होनी चाहिए।");
    }
    const bytes = Utilities.base64Decode(String(file.data || ""));
    if (bytes.length > 6 * 1024 * 1024) throw new Error("फोटो 6 MB से कम होनी चाहिए।");
    const extension = mimeType === "image/png" ? "png" : mimeType === "image/webp" ? "webp" : "jpg";
    const blob = Utilities.newBlob(bytes, mimeType, registrationNumber + "-" + field + "-" + name + "." + extension);
    const driveFile = folder.createFile(blob);
    driveFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    saved[field] = driveFile.getUrl();
  });
  return saved;
}

function ensureSheets() {
  getSheet(REGISTRATION_SHEET, REGISTRATION_HEADERS);
  getSheet(CERTIFICATE_SHEET, CERTIFICATE_HEADERS);
}

function getSheet(name, headers) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(name);
  if (!sheet) sheet = spreadsheet.insertSheet(name);
  const firstRow = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
  const hasHeaders = firstRow.some((value) => String(value || "").trim());
  if (!hasHeaders) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function getOrCreateFolder(name) {
  const folders = DriveApp.getFoldersByName(name);
  return folders.hasNext() ? folders.next() : DriveApp.createFolder(name);
}

function sanitize(value, maxLength) {
  return String(value || "")
    .replace(/[\u0000-\u001F\u007F<>]/g, "")
    .trim()
    .slice(0, maxLength || 160);
}

function normalizeRegistrationNumber(value) {
  const normalized = sanitize(value).toUpperCase();
  return /^SSLTC-\d{4}-\d{5,}$/.test(normalized) ? normalized : "";
}

function makeDownloadUrl(url) {
  const fileId = extractDriveFileId(url);
  return fileId ? "https://drive.google.com/uc?export=download&id=" + fileId : url;
}

function extractDriveFileId(url) {
  const text = String(url || "");
  const patterns = [
    /\/d\/([a-zA-Z0-9_-]+)/,
    /id=([a-zA-Z0-9_-]+)/
  ];
  for (let i = 0; i < patterns.length; i += 1) {
    const match = text.match(patterns[i]);
    if (match) return match[1];
  }
  return "";
}

function jsonResponse(body, statusCode) {
  return ContentService
    .createTextOutput(JSON.stringify(body))
    .setMimeType(ContentService.MimeType.JSON);
}
