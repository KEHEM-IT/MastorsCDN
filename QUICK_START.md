# MastorsCDN - Quick Start Guide

Get up and running in 5 minutes! ⚡

---

## 📋 Prerequisites

- ✅ Node.js v16+ installed ([Download](https://nodejs.org/))
- ✅ A code editor (VS Code recommended)
- ✅ Terminal/Command Prompt

---

## 🚀 Setup in 4 Steps

### Step 1: Install Dependencies

```bash
npm install
```

**What this does:**
- Installs `mastors-fluider` (fluid typography)
- Installs `mastors-gridder` (grid system)
- Installs `sass` (SCSS compiler)
- Installs `typescript` (TS compiler)

**Expected output:**
```
added 4 packages in 3s
```

---

### Step 2: Build the Project

```bash
npm run build
```

**What this does:**
- ✅ Compiles `styles/mastorscdn.scss` → `styles/mastorscdn.css`
- ✅ Compiles `scripts/script.ts` → `scripts/script.js`

**Expected output:**
```
> mastorscdn@1.0.0 scss:build
> sass --load-path=node_modules styles/mastorscdn.scss styles/mastorscdn.css

> mastorscdn@1.0.0 ts:build
> tsc
```

**Check for these files:**
- `styles/mastorscdn.css` ✅
- `scripts/script.js` ✅

---

### Step 3: Open in Browser

```bash
# Open index.html in your default browser
# macOS
open index.html

# Windows
start index.html

# Linux
xdg-open index.html
```

**Or:** Double-click `index.html` in your file explorer.

---

### Step 4: Start Development

```bash
npm run watch
```

**What this does:**
- 👀 Watches for changes in `.scss` files → auto-compiles CSS
- 👀 Watches for changes in `.ts` files → auto-compiles JS
- 🔄 Keeps running until you press `Ctrl+C`

**Now you can:**
- Edit `styles/mastorscdn.scss` → see instant CSS updates
- Edit `scripts/script.ts` → see instant JS updates
- Refresh browser to see changes

---

## ✅ Verification

Your setup is correct if:

1. **Files exist:**
   ```
   ✅ styles/mastorscdn.css
   ✅ scripts/script.js
   ```

2. **Page loads with:**
   - ✅ Dark theme background
   - ✅ MastorsCDN logo in navbar
   - ✅ Gradient text in hero
   - ✅ No console errors (press F12)

3. **Features work:**
   - ✅ Mobile menu toggles (resize browser)
   - ✅ Code has syntax highlighting
   - ✅ Showcase slider slides
   - ✅ Copy buttons copy code

---

## 🎯 Common Commands

| Command | What it does |
|---------|--------------|
| `npm run build` | Compile everything once |
| `npm run watch` | Watch and auto-compile |
| `npm run scss:build` | Compile CSS only |
| `npm run scss:watch` | Watch CSS only |
| `npm run ts:build` | Compile JS only |
| `npm run ts:watch` | Watch JS only |

---

## 🔧 Development Workflow

**Daily workflow:**

```bash
# 1. Start watch mode
npm run watch

# 2. Edit files:
#    - styles/mastorscdn.scss
#    - scripts/script.ts
#    - index.html
#    - about.html

# 3. Refresh browser to see changes

# 4. When done, press Ctrl+C to stop watch mode
```

---

## 📁 Project Structure

```
mastorsCDN/
├─ .github/
├─ assets/
├─ components/
│  ├─ head-common.html      # Shared <head> markup
│  └─ header.html           # Site header component
├─ node_modules/
├─ scripts/
│  ├─ about.ts              # About page logic (TS)
│  ├─ about.js              # Compiled JS ⚙️
│  ├─ components.ts         # Component loader (TS)
│  ├─ components.js         # Compiled JS ⚙️
│  ├─ navbar.ts             # Navbar logic (TS)
│  ├─ navbar.js             # Compiled JS ⚙️
│  ├─ script.ts             # Global scripts (TS)
│  └─ script.js             # Compiled JS ⚙️
├─ styles/
│  ├─ _variables.scss       # Global SCSS variables
│  ├─ _mixins.scss          # SCSS mixins
│  ├─ _about.scss           # About page styles (partial)
│  ├─ mastorscdn.scss       # Main SCSS entry
│  ├─ mastorscdn.css        # Compiled CSS ⚙️
│  └─ mastorscdn.css.map    # Source map
├─ index.html               # Main page
├─ about.html               # About page
├─ package.json
├─ package-lock.json
├─ sass.config.ts           # Sass configuration
├─ tsconfig.json
├─ README.md
├─ QUICK_START.md
└─ TROUBLESHOOTING.md

```

**Files you edit:** `.scss`, `.ts`, `.html`  
**Files auto-generated:** `.css`, `.js` (don't edit these!)

---

## 🎨 Making Changes

### Change Colors

Edit `styles/_variables.scss`:

```scss
// Change primary color
$primary: #6366f1; // Indigo (default)
$primary: #3b82f6; // Blue
$primary: #8b5cf6; // Purple
```

Then rebuild:
```bash
npm run scss:build
```

### Add New Styles

Edit `styles/mastorscdn.scss`:

```scss
// Add at the bottom
.my-custom-class {
  @include fluid-font(1rem, 2rem);
  padding: $spacing-4;
  background: $primary;
}
```

### Add New JavaScript

Edit `scripts/script.ts`:

```typescript
// Add new class
class MyFeature {
  constructor() {
    console.log('My feature initialized!');
  }
}

// Initialize in DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  new MyFeature();
});
```

---

## 🐛 Something Not Working?

### SCSS Import Error?

```
Error: Can't find stylesheet to import.
```

**Fix:** Use updated package.json (already provided):
```bash
npm run scss:build
```

This includes `--load-path=node_modules` flag.

### TypeScript Error?

```
';' expected.ts(1005)
```

**Fix:** Ensure `scripts/globals.d.ts` exists (already provided).

### More help?

See **TROUBLESHOOTING.md** for detailed solutions.

---

## 🎓 Learn the Libraries

### Mastors Fluider
Fluid typography and spacing:

```scss
.hero {
  @include fluid-font(2rem, 4rem);        // Text scales from 2rem to 4rem
  @include fluid-size(padding, 1rem, 3rem); // Padding scales from 1rem to 3rem
}
```

📚 [Full Fluider Documentation](https://kehem-it.github.io/Mastors-Fluider/)

### Mastors Gridder
CSS Grid utilities:

```scss
.container {
  @include grid-container(12, 1.5rem);  // 12 columns, 1.5rem gap
}

.card {
  @include grid-item(1, 4, 1, 2);       // Column 1-4, Row 1-2
}
```

📚 [Full Gridder Documentation](https://kehem-it.github.io/Mastors-Gridder/)

---

## 🚢 Ready to Deploy?

1. **Build production files:**
   ```bash
   npm run build
   ```

2. **Upload these files:**
   - `index.html`
   - `about.html`
   - `styles/mastorscdn.css`
   - `scripts/script.js`
   - `assets/` folder

3. **Done!** 🎉

---

## 💡 Pro Tips

1. **Use watch mode** during development:
   ```bash
   npm run watch
   ```

2. **Check browser console** (F12) for errors

3. **Test mobile view** (resize browser or use DevTools)

4. **Commit only source files** to Git:
   - ✅ Commit: `.scss`, `.ts`, `.html`
   - ❌ Don't commit: `.css`, `.js` (auto-generated)

5. **Add to .gitignore:**
   ```
   node_modules/
   styles/mastorscdn.css
   scripts/script.js
   ```

---

## 📞 Need Help?

- 📖 **Full README:** `README.md`
- 🔧 **Troubleshooting:** `TROUBLESHOOTING.md`
- 🐛 **Report Issues:** [GitHub Issues](https://github.com/KEHEM-IT/MastorsCDN/issues)

---

**Happy coding! 🚀**

Built with ❤️ by KEHEM-IT