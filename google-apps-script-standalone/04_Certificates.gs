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
