Paste these files into Google Apps Script as separate script files.

1. Open your Google Sheet.
2. Go to Extensions > Apps Script.
3. Rename the default Code file to 01_Config.
4. Paste 01_Config.gs into it.
5. Click + next to Files > Script.
6. Create 02_WebApp and paste 02_WebApp.gs.
7. Create 03_Registration and paste 03_Registration.gs.
8. Create 04_Certificates and paste 04_Certificates.gs.
9. Create 05_Utils and paste 05_Utils.gs.
10. Save.
11. Deploy > New deployment > Web app.
12. Execute as: Me.
13. Who has access: Anyone.
14. Copy the Web app URL and put it in Vercel:
NEXT_PUBLIC_APPS_SCRIPT_URL=your Web app URL

Do not paste both Code.gs and these split files together. Use one method only.
