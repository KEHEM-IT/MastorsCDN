# MastorsCDN - Component Loader Architecture

A production-grade, framework-free component loader system built with TypeScript, SCSS, and static HTML for GitHub Pages deployment.

## 🚀 Features

- **Zero FOUC (Flash of Unstyled Content)** - Smooth loading with opacity transitions
- **Component-Based Architecture** - Reusable header, footer, and navigation components
- **Hash Router** - SPA-like navigation without page reloads
- **Smart Prefetching** - Hover-based and viewport-based prefetching
- **Loading Indicators** - Visual progress bar for component loading
- **Active Nav States** - Automatic highlighting of current page
- **Route Guards** - Protect routes with custom validation
- **TypeScript-First** - Full type safety and auto-completion
- **Dark Mode Support** - Built-in theme toggle with localStorage persistence
- **Smooth Transitions** - Page and component load animations
- **GitHub Pages Ready** - Automated deployment with GitHub Actions

## 📁 Project Structure

```
mastorsCDN/
├── index.html              # Main entry point
├── about.html              # About page
├── contact.html            # Contact page
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions deployment
├── src/
│   ├── ts/
│   │   ├── main.ts         # App initialization
│   │   ├── router.ts       # Hash router with transitions
│   │   ├── component-loader.ts  # Component loading system
│   │   └── prefetch.ts     # Smart prefetching logic
│   └── scss/
│       ├── main.scss       # Main stylesheet
│       ├── _variables.scss # Design tokens
│       ├── _components.scss # Component styles
│       └── _transitions.scss # Animations
├── components/
│   ├── header.html         # Header component
│   ├── footer.html         # Footer component
│   └── nav.html            # Navigation component
└── dist/
    ├── css/
    │   └── mastorscdn.css        # Compiled CSS (auto-generated)
    └── js/
        └── main.js         # Compiled JS (auto-generated)
```

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/KEHEM-IT/mastorsCDN.git
cd mastorsCDN

# Install dependencies
npm install

# Build the project
npm run build
```

## 📝 Development

```bash
# Start development with watch mode
npm run dev

# Watch TypeScript only
npm run watch:ts

# Watch SCSS only
npm run watch:scss

# Build for production
npm run build
```

## 🚀 Deployment

### Automatic (GitHub Actions)

Push to `main` branch:

```bash
git add .
git commit -m "Your message"
git push origin main
```

The GitHub Action will automatically build and deploy to GitHub Pages.

### Manual

```bash
npm run build
npm run deploy
```

## 🎯 Usage

### Adding Components

1. Create HTML file in `components/` directory
2. Add component slot in HTML:

```html
<div id="my-component-slot"></div>
```

3. Load component in `src/ts/main.ts`:

```typescript
await this.loader.loadComponents([
  { selector: '#my-component-slot', path: 'components/my-component.html' }
]);
```

### Adding Routes

In `src/ts/main.ts`, register routes:

```typescript
this.router.register('page-name', {
  path: 'page-name',
  title: 'Page Title',
  guard: () => {
    // Optional: return false to prevent navigation
    return true;
  }
});
```

### Styling Components

Add styles to `src/scss/_components.scss`:

```scss
.my-component {
  padding: var(--spacing-lg);
  background: var(--bg-elevated);
}
```

## 🎨 Theming

The project includes a built-in dark/light theme system. Customize colors in `src/scss/_variables.scss`:

```scss
:root {
  --bg-primary: #ffffff;
  --text-primary: #1a1a1a;
  --accent-primary: #6366f1;
}

[data-theme="dark"] {
  --bg-primary: #0a0a0a;
  --text-primary: #ffffff;
}
```

## ⚡ Performance Features

- **Component Caching** - Components loaded once and cached
- **Smart Prefetching** - Prefetch on hover with delay
- **Viewport Prefetching** - Prefetch visible links on idle
- **Progressive Loading** - Show progress during component load
- **Optimized Transitions** - Hardware-accelerated CSS transitions

## 🔒 Route Guards

Protect routes with custom logic:

```typescript
this.router.register('admin', {
  path: 'admin',
  title: 'Admin Panel',
  guard: () => {
    const isAuthenticated = checkAuth();
    if (!isAuthenticated) {
      alert('Please login first');
      return false;
    }
    return true;
  }
});
```

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with TypeScript, SCSS, and modern web standards
- Inspired by modern SPA frameworks but keeping it simple
- Part of the MastorsCDN ecosystem

## 📞 Support

- 📧 Email: contact@kehem.com
- 💬 GitHub Issues: [Report a bug](https://github.com/KEHEM-IT/MastorsCDN/issues)
- 📚 Documentation: [View Docs](https://mastorscdn.kehem.com)

---

**Made with ❤️ by KEHEM-IT**