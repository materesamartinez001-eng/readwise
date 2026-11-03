# READWISE web app

## Files
- `index.html`: app interface
- `app.js`: reading comparison and teacher review logic
- `manifest.json`: installable web app metadata
- `sw.js`: basic offline caching
- `icon.svg`: app icon

## Publish free with GitHub Pages
1. Create/sign in to a GitHub account.
2. Create a new **public** repository named `readwise`.
3. Upload all five files from this folder to the repository root (not inside another folder).
4. In the repository, open **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select branch **main**, folder **/(root)**, then click **Save**.
7. Wait for the Pages deployment. Your site address should look like `https://YOUR-USERNAME.github.io/readwise/`.
8. Open the address in Chrome. On Android, use Chrome menu → **Install app** or **Add to Home screen** if offered.

## Important limitations
- Browser speech recognition support varies and may require internet. Some browser providers process audio remotely.
- The text-match score is only an approximate transcript comparison, not validated pronunciation assessment.
- The app does not upload learner records to a READWISE server. CSV reports are downloaded to the device.
- Do not collect identifiable student voice recordings or learner data without school approval, appropriate consent, and privacy safeguards.
- The service worker caches the app shell for repeat visits, but speech recognition may not work offline.
