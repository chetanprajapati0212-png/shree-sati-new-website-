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

function jsonResponse(body, statusCode) {
  return ContentService
    .createTextOutput(JSON.stringify(body))
    .setMimeType(ContentService.MimeType.JSON);
}
