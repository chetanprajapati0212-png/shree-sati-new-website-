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
