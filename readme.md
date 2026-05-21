# EDAP Pakistan Website — Maintenance Guide

This guide is written for the **EDAP Pakistan team** (Ms. Shazia Hasan and anyone she nominates). You do **not** need to know how to code to maintain this website. Each section below explains a specific task in plain language.

If you get stuck on anything, scroll to **§ 8 — Help & Contacts**.

---

## Contents
1. [What's in this folder](#1-whats-in-this-folder)
2. [Editing text on a page](#2-editing-text-on-a-page)
3. [Swapping an image](#3-swapping-an-image)
4. [Setting up Formspree (one-time, do this first)](#4-setting-up-formspree-one-time-do-this-first)
5. [Setting up Vercel & going live (one-time)](#5-setting-up-vercel--going-live-one-time)
6. [Day-to-day: making changes after launch](#6-day-to-day-making-changes-after-launch)
7. [Adding a News / Media page later](#7-adding-a-news--media-page-later)
8. [Help & contacts](#8-help--contacts)

---

## 1. What's in this folder

```
edap-website/
├── index.html         ← Home page
├── about.html         ← About EDAP (the organization)
├── founder.html       ← About the Founder (Ms. Shazia Hasan's story)
├── programs.html      ← Programs (Computer / Sign Language / Counselling)
├── media.html         ← Talks, videos and photo gallery
├── contact.html       ← Contact form + map
│
├── css/
│   └── style.css      ← Look & feel (colours, fonts, spacing)
│
├── js/
│   └── main.js        ← Forms, mobile nav, photo lightbox
│
├── images/
│   ├── media/                       ← Real EDAP photos (used everywhere)
│   │   ├── main-profile.jpeg        ← Ms. Shazia portrait (About page)
│   │   ├── tedx-talk.jpeg           ← TEDx stage shot (Media page)
│   │   ├── lab.png, lab-2.jpg       ← Computer lab photos
│   │   ├── audience.jpg             ← Community event
│   │   └── session.jpeg, talk*.jpeg, computer-lab.jpg, ...
│   └── logos/
│       ├── logo-mark.svg            ← The 6 dots used in nav + favicon
│       ├── logo-braille.svg         ← Full logo (Concept C — chosen)
│       └── logo-monogram.svg, ...   ← Alternative concepts (kept for reference)
│
├── vercel.json        ← Tells Vercel how to host the site
└── readme.md          ← (This file)
```

**Rule of thumb:** the four `.html` files in the top folder are the pages. Everything they need lives inside `css/`, `js/`, and `images/`.

---

## 2. Editing text on a page

All page text lives directly inside the `.html` files. To edit a paragraph:

1. Open the `.html` file in any text editor (Notepad works; **Visual Studio Code** is friendlier — free from <https://code.visualstudio.com>).
2. Use **Ctrl + F** to search for a few words from the sentence you want to change.
3. Edit the words. **Do not delete the surrounding `<` and `>` tags** — those tell the browser what is a heading, paragraph, button, etc.
4. Save the file (Ctrl + S).
5. Refresh the page in your browser to see the change.

**Where common things live:**

| Want to edit… | Open this file | Look near… |
|---|---|---|
| Home page headline | `index.html` | `<section class="hero">` |
| The 3 service cards on the home page | `index.html` | `<div class="impact-grid">` |
| "Meet the Founder" block on home page | `index.html` | `<section class="founder-teaser">` |
| "Our Story" on the EDAP about page | `about.html` | "Empowering since 2008" |
| **Ms. Shazia's life story** | `founder.html` | each section is clearly commented (childhood, callouts, etc.) |
| The closing motto on the founder page | `founder.html` | `<section class="pull-quote">` |
| Program descriptions | `programs.html` | section IDs `computer-training`, `sign-language`, `counselling` |
| Contact address, email, phone | `contact.html` AND the footer of every page | "Get In Touch" |
| Facebook page URL | footer of every page | search for `facebook.com/empowering.tdp` |
| The About **dropdown** (in nav) | every `.html` file, near the top | search for `has-dropdown` |
| Footer (appears on every page) | every `.html` file, near the bottom | `<footer class="site-footer">` |

> **Important:** the address, email and phone appear in the footer of *all four pages*. If they change, update all four.

---

## 3. Swapping an image

The website is set up so you can **replace any photo without touching the code** — as long as the new file has the **same name** as the old one.

**Example — swap the About page photo:**

1. The About page uses `images/ph_23098_169500.jpg`.
2. Prepare your new photo (JPG format, ideally 1200 × 800 pixels or larger).
3. **Rename your new photo to `ph_23098_169500.jpg`** (the exact same name as the old one).
4. Drop it into the `images/` folder, replacing the old file.
5. Refresh the page.

**Photos currently in use:**

| File | Where it's used |
|---|---|
| `images/media/lab.png` | Home hero background (in `css/style.css`), Programs > Computer Training |
| `images/media/lab-2.jpg` | Home Computer Training card |
| `images/media/session.jpeg` | Home Sign Language card, Programs > Sign Language |
| `images/media/talk.jpeg` | Home Counselling card |
| `images/media/talk-2.jpeg` | Programs > Counselling |
| `images/media/main-profile.jpeg` | About page (Our Story section) |
| `images/media/audience.jpg` | About page (What Drives Us section) |
| `images/media/*` (all photos) | Media page photo gallery |

The original `images/*.jpg` files (the older photos) are kept in the folder for reference but are no longer displayed on the site.

> **Tip:** Avoid using emojis or spaces in filenames. Stick to lowercase letters, numbers, hyphens.

---

## 4. Setting up Formspree (one-time, do this first)

The contact forms and newsletter signup send messages to **edap.pakistan@gmail.com** via a free service called **Formspree**. You only do this setup once.

### Steps

1. Go to <https://formspree.io> and click **Sign Up**.
2. Sign up with **edap.pakistan@gmail.com**.
3. Verify your email.
4. Click **New Form** → enter "EDAP Pakistan Contact" → click **Create Form**.
5. Formspree will show you a **form endpoint** that looks like:
   ```
   https://formspree.io/f/xpzgyabc
   ```
   The last part (`xpzgyabc` in this example) is your **Form ID**.
6. Open every `.html` file (index, about, programs, contact). Use **Find and Replace** (Ctrl + H) to swap **every occurrence** of `YOUR_FORMSPREE_ID` with your real Form ID.

There are 5 places to replace (1 home form + 1 contact form + 4 newsletter forms — 6 total, since the newsletter appears on every page).

After replacing, every form on the site will email submissions to `edap.pakistan@gmail.com`.

### Reading submissions

- Login at <https://formspree.io>.
- Click your form. You'll see every submission with the name, email, message and date.
- Formspree also emails you a copy of each submission.

### Free tier limits

- 50 submissions per month (plenty for a small NGO).
- If you outgrow that, the paid tier is ~$10/month.

---

## 5. Setting up Vercel & going live (one-time)

Vercel hosts the site (for free). It is connected to GitHub, so any change you push to GitHub goes live automatically.

### Steps

1. Create a free GitHub account at <https://github.com> if you don't have one.
2. Create a new **public** repository called `edap-website`.
3. Push this folder to that repository. (Your developer can do this for you the first time.)
4. Go to <https://vercel.com> and sign in with GitHub.
5. Click **Add New → Project**, pick the `edap-website` repository, and click **Deploy**.
6. After 30–60 seconds, Vercel will give you a URL like `https://edap-website.vercel.app`. That's your live site.

### Optional: custom domain

If EDAP buys a domain (e.g. `edap.org.pk`), you can attach it inside Vercel → Project Settings → Domains. Vercel walks you through it.

---

## 6. Day-to-day: making changes after launch

Once Vercel is connected, the workflow becomes:

1. **Edit the file** (text or image) on your computer.
2. **Push the change to GitHub.** (One click in GitHub Desktop, or `git push` in the terminal.)
3. Vercel sees the change, rebuilds, and the live site updates in ~30 seconds.

If you'd rather not deal with Git at all, you can edit files **directly in the GitHub web interface**:

1. Go to your GitHub repo in a browser.
2. Click any `.html` file → click the pencil icon → edit → scroll down → **Commit changes**.
3. Vercel deploys automatically.

---

## 7. Updating the Media page

The Media page (`media.html`) has three editable sections: the **featured TEDx video**, the **other-videos grid**, and the **photo gallery**.

### To change a YouTube video

Each video on the page is loaded with an **embed URL** that looks like `https://www.youtube.com/embed/VIDEOID`. To swap one out:

1. Open YouTube → find the new video.
2. Look at its URL — it ends with something like `?v=19YuweboxcQ`. That last part is the **video ID**.
3. Open `media.html`, find the `<iframe src=…` line for the video you want to replace, and change just the video ID at the end of the URL.
4. Update the surrounding `<h3>`, `<p>` description and `title="…"` text so they match the new video.

There are **4 iframes** in `media.html` — the TEDx one (first) and three more in the grid below.

### To add a new photo to the gallery

In `media.html`, find the `<div class="photo-gallery">` block. Each photo is **one short block of HTML**:

```html
<a href="images/media/your-photo.jpg" data-lightbox>
  <img src="images/media/your-photo.jpg" alt="Short description of the photo" />
</a>
```

To add a photo:

1. Drop the new image into `images/media/` (use lowercase, hyphens instead of spaces — e.g. `karachi-event-2026.jpg`).
2. Copy any existing `<a> … </a>` block in the gallery and paste it where you want the new photo to appear.
3. Change both filenames (in `href` and `src`) and the `alt` text.
4. Save and refresh — done.

To **remove** a photo, just delete its `<a> … </a>` block.

### Photos with spaces in their names

Don't use spaces. Use hyphens. If you ever name a file with a space (like `my photo.jpg`), the browser may not load it. Rename it to `my-photo.jpg`.

---

## 7b. About the two "About" pages

The site has **two** About pages, surfaced as a single "About" dropdown in
the nav:

| Page | File | What it covers |
|---|---|---|
| **About EDAP** | `about.html` | The organization, the mission, what it does |
| **About the Founder** | `founder.html` | Ms. Shazia Hasan's life story, chronologically |

If you want to **add a third About page** (e.g. "Our Team"), do this:

1. Make a copy of `about.html` or `founder.html`.
2. Save it with a new name (e.g. `team.html`).
3. In **every** HTML file's nav block, add a new line inside the dropdown:
   ```html
   <li><a href="team.html">Our Team</a></li>
   ```
   Look for the `<ul class="dropdown">` block — it's right after the
   `<a href="about.html"…>About</a>` line.

If you want to **rename** one of the pages, just rename the file *and*
update every link to it across the codebase (use Find and Replace on the
old filename).

---

## 8. Help & contacts

If something breaks or you're not sure what a step means:

- **The original developers (Habib University Khidmat team):**
  - Aquib Ansari — 0316-2595214
  - Mohammed Aun Abbas — 0336-0224419
- **Formspree support:** <https://help.formspree.io>
- **Vercel support:** <https://vercel.com/help>

### Troubleshooting cheat-sheet

| Symptom | Likely cause | Fix |
|---|---|---|
| Form submission shows "site isn't connected to a form service" | Formspree ID still says `YOUR_FORMSPREE_ID` | See § 4 |
| An image isn't showing | Filename in the folder doesn't match what the HTML expects | Check spelling, lowercase, no spaces |
| Site looks broken after an edit | A `<` or `>` was accidentally deleted | Undo the change (Ctrl + Z) and try again more carefully |
| Submissions stopped arriving | Formspree free-tier limit reached | Check Formspree dashboard for usage |

---

*This site was built by Aquib Ansari & Mohammed Aun Abbas as part of Habib University's Khidmat programme, under the supervision of Ms. Shazia Hasan, founder of Empowering the Differently Abled Persons Pakistan.*
