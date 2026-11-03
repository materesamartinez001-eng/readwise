# I-RISE READ – A Guided Digital Oral Reading Companion

## Files
- `index.html` – student interface
- `app.js` – passage library, transcript comparison, and teacher review
- `manifest.json` – installable web app settings
- `sw.js` – basic app-shell caching
- `icon.svg` – app icon

## Update the existing GitHub Pages website
1. Open your existing `readwise` repository on GitHub.
2. Open the repository's Code tab.
3. Click Add file → Upload files.
4. Upload these five files from this folder to the repository root.
5. GitHub will warn that files with the same names already exist; choose to replace/commit the changes.
6. Commit changes to the `main` branch.
7. Wait a few minutes, then refresh your published website. If the old version remains, hard-refresh (Ctrl+Shift+R) or clear the site cache.

## Current features
- 12 passages: 4 Simple, 4 Moderate, and 4 Hard.
- Student workflow: choose level and passage, read first, check reading, then practice again.
- Tentative transcript comparison flags possible substitutions, omissions, repetitions, and extra words.
- Teacher review fields for verified mispronunciations, substitutions, repetitions, and omissions.
- CSV download and print/save report.

## Important limitations
- The text-match percentage is only a rough transcript comparison, not a validated reading fluency or pronunciation score.
- Browser speech recognition support varies and may require internet. Some browsers may process audio using their speech service.
- A text mismatch is not automatically a student miscue. Teacher verification is required.
- The app does not provide persistent student accounts or cloud storage. Teacher CSV reports download to the device.
- Do not put identifiable learner data in the public GitHub repository. Follow school approvals, consent, and privacy procedures for student assessments and audio.
