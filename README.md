# Thann Dy — Personal Portfolio

A static personal portfolio built with HTML, CSS, and vanilla JavaScript. No build step or package installation is required.

## Run locally

Open `index.html` in your browser, or use the VS Code Live Server extension.

## Deploy to Vercel

1. Push the contents of this folder to the **root** of a GitHub repository. `index.html` must be at the repository root.
2. In Vercel, import that GitHub repository.
3. Set **Framework Preset** to `Other`.
4. Leave **Build Command** and **Install Command** empty.
5. Set **Output Directory** to `.` if Vercel asks for one.
6. Deploy.

The `vercel.json` file enables clean URLs. This is a static HTML site; it does not need `npm install` or `npm run build`.

## Update your content

Edit the `CONFIG` object near the top of `javascript.js` to change your email, social links, skills, roles, and projects. Replace `dy.png` to change your profile photo (keep the same filename, or update the `src` in `index.html`).

## Contact form

By default, the contact form validates the fields and opens the visitor's email application using the email address in `CONFIG.email`. To send messages directly from the website, configure a supported form service and set `CONFIG.formEndpoint` (and `CONFIG.accessKey` if required) in `javascript.js`. Do not put private server secrets in frontend JavaScript.
