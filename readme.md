# EDAP Pakistan — Website

The official website for **Empowering the Differently Abled Persons Pakistan (EDAP)** — an NGO based at Ida Rieu College for Blind & Deaf in Karachi, providing computer training, Pakistan Sign Language education, and counselling since 2008. Founded by **Ms. Shazia Hasan**.

**Live site:** <https://khidmat-one.vercel.app/>

Built by Aquib Ansari and Mohammed Aun Abbas as part of Habib University's **Khidmat** programme, under the supervision of Ms. Shazia Hasan.

---

### Folder structure

```
edap-website/
├── index.html · about.html · founder.html
├── programs.html · media.html · contact.html
│
├── css/
│   └── style.css            ← Design system + all components
│
├── js/
│   └── main.js              ← Forms, mobile nav, lightbox, maps
│
├── images/
│   ├── media/               ← Real EDAP photos (used site-wide)
│   └── logos/               ← Brand mark + alternate logo concepts
│
├── vercel.json              ← Clean URLs, security headers, caching
├── .vercelignore            ← Files to exclude from production
└── readme.md
```

### Tech stack

- **Frontend:** Plain HTML5, CSS3, vanilla JavaScript (ES2017+).
- **Fonts:** Plus Jakarta Sans (headings) + Inter (body) from Google Fonts.
- **Forms:** [Formspree](https://formspree.io) for contact + newsletter submissions.
- **Maps:** Google Maps embed iframe.
- **Hosting:** [Vercel](https://vercel.com) — clean URLs, free tier, auto-deploy from GitHub.

---

## How to run locally

This site has no build step. Three ways to view it on your machine:

### Option 1 — Open the file directly

Double-click `index.html`. It opens in your default browser. Works for casual viewing but the YouTube and Google Maps embeds may behave oddly under the `file://` protocol.

### Option 2 — Use VS Code Live Server (recommended)

1. Install [Visual Studio Code](https://code.visualstudio.com/).
2. Install the **Live Server** extension by Ritwick Dey.
3. Open the project folder in VS Code → right-click `index.html` → **Open with Live Server**.
4. The site opens at `http://localhost:5500` and auto-refreshes when you save any file.

### Option 3 — Python's built-in server

If you have Python installed, from the project folder run:

```bash
python -m http.server 8000
```

Then visit <http://localhost:8000> in your browser.

---

## Deployment

Pushing to the GitHub repo's `master` branch automatically triggers a Vercel rebuild. The live site updates within ~30 seconds. No manual deploy step.

---

*© Empowering the Differently Abled Persons Pakistan. All rights reserved.*
