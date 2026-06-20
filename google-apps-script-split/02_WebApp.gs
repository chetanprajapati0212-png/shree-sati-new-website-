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
