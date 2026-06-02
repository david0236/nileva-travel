# Nileva Travel — Website

## Folder structure

```
nileva-travel/
├── index.html          ← Main homepage
├── css/
│   └── style.css       ← ALL styles (colours, fonts, layout)
├── js/
│   └── main.js         ← ALL javascript (WhatsApp form, nav, animations)
├── images/             ← Put all photos here
│   └── (empty for now — currently using Unsplash URLs)
└── tours/              ← Individual tour pages go here
    └── classic-egypt.html (coming soon)
```

## How to make changes

1. Open this folder in VS Code
2. Edit the file you need:
   - Change colours/fonts → `css/style.css`
   - Change WhatsApp number → `js/main.js` line with `WA_NUMBER`
   - Change page content → `index.html`
3. Save the file
4. Upload ONLY the changed file to Hostinger File Manager → public_html

## WhatsApp number
Located in `js/main.js`:
```js
const WA_NUMBER = '447423696012';
```
Change this if the number ever changes.

## To add a new tour page
1. Copy `tours/classic-egypt.html` (once created)
2. Rename it e.g. `tours/nile-cruise.html`
3. Edit the content inside
4. Upload to Hostinger under `public_html/tours/`
