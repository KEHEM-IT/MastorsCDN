mastorsCDN/
├─ index.html
├─ about.html
├─ styles/
├─ _variables.scss
├─ _mixins.scss
├─ _utilities.scss
└─ mastorscdn.scss
└─ mastorscdn.css 
├─ scripts/
│  ├─ script.ts
│  └─ script.js
├─ assets/
│  └─ logo.png
├─ package.json
└─ tsconfig.json


# MastorsCDN

A powerful, lightweight SCSS mixin and CSS utility library designed for CDN delivery and modern web development.

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install Dependencies**

```bash
npm install
```

This will install:
- `mastors-fluider` - Fluid typography and responsive utilities
- `mastors-gridder` - Advanced grid system
- `sass` - SCSS compiler
- `typescript` - TypeScript compiler

2. **Build the Project**

```bash
# Build SCSS and TypeScript
npm run build

# Or watch for changes during development
npm run watch
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run scss:build` | Compile SCSS to CSS once |
| `npm run scss:watch` | Watch SCSS files and auto-compile |
| `npm run ts:build` | Compile TypeScript to JavaScript |
| `npm run ts:watch` | Watch TS files and auto-compile |
| `npm run build` | Build both SCSS and TypeScript |
| `npm run watch` | Watch both SCSS and TypeScript |

## 📁 Project Structure

```
mastorsCDN/
├─ index.html           # Homepage
├─ about.html           # About page
├─ styles/
│  ├─ _variables.scss   # Design tokens and variables
│  ├─ mastorscdn.scss   # Main stylesheet (imports libraries)
│  └─ mastorscdn.css    # Compiled CSS (generated)
├─ scripts/
│  ├─ script.ts         # TypeScript source
│  └─ script.js         # Compiled JavaScript (generated)
├─ assets/
│  └─ logo.png
├─ package.json
└─ tsconfig.json
```

## 🎨 SCSS Import Issue Fix

### Problem
If you see this error:
```
Error: Can't find stylesheet to import.
  @use 'mastors-fluider/mastors-fluider' as *;
```

### Solution
The issue is fixed in the updated `package.json`. The scripts now include `--load-path=node_modules`:

```json
"scss:build": "sass --load-path=node_modules styles/mastorscdn.scss styles/mastorscdn.css",
"scss:watch": "sass --watch --load-path=node_modules styles/mastorscdn.scss:styles/mastorscdn.css"
```

This tells Sass where to find the installed npm packages.

### Alternative Approaches

If you still have issues, try one of these:

**Option 1: Use relative paths**
```scss
@use '../node_modules/mastors-fluider/mastors-fluider' as *;
@use '../node_modules/mastors-gridder/mastors-gridder' as *;
```

**Option 2: Use @import (legacy)**
```scss
@import '../node_modules/mastors-fluider/mastors-fluider';
@import '../node_modules/mastors-gridder/mastors-gridder';
```

**Option 3: Add includePaths in a config file**

Create `sass-config.json`:
```json
{
  "includePaths": ["node_modules"]
}
```

## 🔧 Using the Libraries

### Mastors Fluider
Fluid typography and responsive spacing:

```scss
.hero {
  @include fluid-font(2rem, 4rem);
  @include fluid-size(padding, 1rem, 3rem);
}
```

[Full Documentation](https://kehem-it.github.io/Mastors-Fluider/)

### Mastors Gridder
Advanced CSS Grid system:

```scss
.container {
  @include grid-container(12, 1.5rem);
}

.card {
  @include grid-item(1, 4, 1, 2);
}
```

[Full Documentation](https://kehem-it.github.io/Mastors-Gridder/)

## 📝 Development

### Watch Mode
For active development, use watch mode:

```bash
npm run watch
```

This will:
- ✅ Auto-compile SCSS when you save `.scss` files
- ✅ Auto-compile TypeScript when you save `.ts` files
- ✅ Show errors in the terminal

### TypeScript Configuration

The `tsconfig.json` is already configured for the project. It compiles:
- Input: `scripts/script.ts`
- Output: `scripts/script.js`
- Target: ES2020 with DOM support

## 🌐 Deployment

### Build for Production

1. **Compile everything:**
   ```bash
   npm run build
   ```

2. **Files to deploy:**
   - `index.html`
   - `about.html`
   - `styles/mastorscdn.css` (compiled)
   - `scripts/script.js` (compiled)
   - `assets/` folder

### CDN Integration

The project uses these external CDNs:
- **Font Awesome** - Icons
- **Google Fonts** - Inter font family
- **Prism.js** - Syntax highlighting
- **Swiper** - Carousel slider

## 🎯 Features

- ✨ Modern dark theme with gradient accents
- 📱 Fully responsive (mobile-first approach)
- ⚡ Lightweight and performant
- 🎨 Smooth animations and transitions
- 💻 Syntax highlighting for code examples
- 🔄 Interactive components (tabs, sliders, copy buttons)
- ♿ Accessible design
- 🌙 Dark mode ready

## 📚 Documentation

- **Mastors Fluider**: https://kehem-it.github.io/Mastors-Fluider/
- **Mastors Gridder**: https://kehem-it.github.io/Mastors-Gridder/
- **GitHub Repository**: https://github.com/KEHEM-IT/MastorsCDN

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - Free to use in personal and commercial projects.

## 👨‍💻 Author

**KEHEM-IT**
- GitHub: [@KEHEM-IT](https://github.com/KEHEM-IT)

---

Built with ❤️ for the modern web