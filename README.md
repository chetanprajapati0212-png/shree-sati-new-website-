# श्री सती लाइवस्टॉक ट्रेनिंग सेंटर वेबसाइट

यह पैकेज मौजूदा वेबसाइट के समान पेज रखता है और नया पंजीकरण तथा प्रमाणपत्र डाउनलोड workflow जोड़ता है।

## पेज

- `/` होम
- `/about` हमारे बारे में
- `/courses` प्रशिक्षण पाठ्यक्रम
- `/register` छात्र पंजीकरण
- `/verify` प्रमाणपत्र डाउनलोड
- `/contact` संपर्क करें

## व्यवस्थापक संपर्क

- मोबाइल: `8529552449`
- ईमेल: `Shree.sati.livestock.training@gmail.com`

## वेबसाइट सेटअप

1. Google Sheet बनाएँ।
2. उसी Sheet में `Extensions > Apps Script` खोलें।
3. `google-apps-script/Code.gs` की पूरी सामग्री Apps Script editor में डालें।
4. Apps Script में `Deploy > New deployment > Web app` चुनें।
5. Execute as: `Me`
6. Who has access: `Anyone`
7. Deploy करने के बाद Web app URL कॉपी करें।
8. Vercel project में environment variable सेट करें:

```text
NEXT_PUBLIC_APPS_SCRIPT_URL=आपका Apps Script Web app URL
```

9. Vercel पर deploy करें।

## Google Sheet संरचना

Apps Script पहली बार चलते ही दो sheets बना देगा:

### Registrations

- Registration Number
- Name
- Father Name
- Mobile
- Email
- Address
- State
- District
- Course
- Registration Date
- Status
- Date of Birth
- Aadhaar
- Photo URL
- Aadhaar Front URL
- Aadhaar Back URL

### Certificates

- Registration Number
- Certificate URL
- Issue Date

## प्रमाणपत्र workflow

1. छात्र पंजीकरण करता है।
2. वेबसाइट `SSLTC-2026-00001` जैसे क्रमांक दिखाती है।
3. Apps Script data को `Registrations` sheet में save करता है।
4. व्यवस्थापक प्रमाणपत्र PDF manually बनाता है।
5. PDF को Google Drive में upload करें।
6. PDF की sharing `Anyone with the link` करें।
7. Drive link को `Certificates` sheet में उसी registration number के सामने डालें।
8. छात्र `/verify` पेज पर registration number डालकर प्रमाणपत्र देख और डाउनलोड कर सकता है।

## सुरक्षा

- Registration number backend पर generate होता है।
- Duplicate registration mobile या email से रोका जाता है।
- Frontend और backend दोनों पर validation है।
- Google Sheet ID frontend में expose नहीं होती।
- Uploaded photos Google Drive folder में save होती हैं।

## टेस्टिंग checklist

- सही data से नया पंजीकरण
- उसी mobile से duplicate पंजीकरण
- उसी email से duplicate पंजीकरण
- खाली required fields
- गलत mobile number
- गलत email
- गलत Aadhaar
- गलत registration number format
- certificate found
- certificate not found
- Apps Script URL missing
- slow network या API failure
- Android mobile viewport

## स्थानीय commands

```bash
npm install
npm run dev
npm run build
```
