Use this method if Extensions > Apps Script shows a Google Drive error.

1. Open your Google Sheet.
2. Copy the Sheet ID from the URL.

Example URL:
https://docs.google.com/spreadsheets/d/17jYMqaAmngOjeidKSjT3vHbn_BjB0hdImMxBwLIstxA/edit

Sheet ID is the part between /d/ and /edit:
17jYMqaAmngOjeidKSjT3vHbn_BjB0hdImMxBwLIstxA

3. Open a new tab:
https://script.google.com/home/start

4. Make sure the top-right account is Shree.sati.livestock.training@gmail.com.
5. Click New project.
6. Paste the files one by one:
   01_Config.gs
   02_WebApp.gs
   03_Registration.gs
   04_Certificates.gs
   05_Utils.gs
7. In 01_Config.gs replace:
   PASTE_YOUR_GOOGLE_SHEET_ID_HERE
   with your real Sheet ID.
8. Save.
9. Deploy > New deployment > Web app.
10. Execute as: Me.
11. Who has access: Anyone.
12. Click Deploy and authorize access.
13. Copy the Web app URL.
14. Put that URL in Vercel as:
NEXT_PUBLIC_APPS_SCRIPT_URL=your Web app URL
