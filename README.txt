DST TOOLS INTRO PWA
===================

FILES
- index.html: page structure
- styles.css: all visual styling
- site-config.js: the three links you will replace
- app.js: link setup and install button behavior
- manifest.webmanifest: PWA identity and install settings
- service-worker.js: offline app-shell caching
- assets/: app icons

EDIT THE LINKS
Open site-config.js and replace these values:

mainSkinSiteUrl: "https://REPLACE-WITH-YOUR-MAIN-SKIN-SITE-URL"
toe3EditorUrl: "https://REPLACE-WITH-YOUR-TOE3-EDITOR-URL"
gtoEditorUrl: "https://REPLACE-WITH-YOUR-GTO-EDITOR-URL"

Keep each URL inside its quotation marks. You can leave editor placeholders in place until those sites are published.

TESTING IN SPCK
1. Extract the ZIP into a project folder.
2. Open index.html in Spck to check the layout and interactions.
3. PWA installation and service-worker behavior require HTTPS or localhost. A basic local file preview will not install as a PWA.
4. When testing installation, deploy to a temporary HTTPS host or use a local development server.
5. Once the site is deployed, use the browser's Install App option.

IMPORTANT
- Only this intro site is configured as an installable PWA.
- TOE3 and GTO are ordinary linked websites.
- Main Skin Site and editor links are intentionally placeholders until you replace them.
- The service worker caches the app shell. If you change the app version or core files after deployment, update CACHE_NAME in service-worker.js (for example, dst-tools-v1 to dst-tools-v2) to force a fresh cache.
