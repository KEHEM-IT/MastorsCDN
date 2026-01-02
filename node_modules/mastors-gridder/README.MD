# Mastors-Gridder

**Comprehensive SCSS Grid System** - Professional-grade grid mixins for modern web layouts.

A powerful, flexible, and production-ready SASS grid utility library that provides everything you need to build responsive, complex layouts with ease.

---

<p align="center">
  <a href="./README-CSS.md">
    <img src="https://img.shields.io/badge/CSS-DOCUMENTATION-2965f1?style=for-the-badge&logo=css&logoColor=white">
  </a>
  &nbsp;
  <a href="https://kehem-it.github.io/Mastors-Gridder/">
    <img src="https://img.shields.io/badge/FULL-DOCUMENTATION-2ea44f?style=for-the-badge&logo=readthedocs&logoColor=white">
  </a>
</p>

---


## 📋 Table of Contents

- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [Grid Mixins Overview](#-grid-mixins-overview)
- [Quick Reference Table](#-quick-reference-table)
- [Detailed Documentation](#-detailed-documentation)
  - [Responsive Grid Mixins](#responsive-grid-mixins)
  - [Fixed Grid Mixins](#fixed-grid-mixins)
  - [Layout Pattern Mixins](#layout-pattern-mixins)
  - [Grid Item Mixins](#grid-item-mixins)
  - [Alignment & Utility Mixins](#alignment--utility-mixins)
- [Usage Examples](#-usage-examples)
- [Best Practices](#-best-practices)
- [Browser Support](#-browser-support)
- [FAQ](#-faq)
- [Changelog](#-changelog)

---

## 🚀 Installation

### Via CDN (Recommended for Quick Start)

Add this link in your HTML `<head>`:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/KEHEM-IT/Mastors-Gridder@main/mastors-gridder.css"
/>
```

### Via NPM

Install the package:

```bash
npm i mastors-gridder
```

Then import in your SCSS file:

```scss
@use "mastors-gridder" as *;
```

Or with a custom namespace:

```scss
@use "mastors-gridder" as grid;

// Usage: @include grid.grid-auto(250px, 1rem);
```

### Manual Installation

Download `_mastors-gridder.scss` and import it:

```scss
@import "path/to/mastors-gridder";
```

---

## ⚡ Quick Start

```scss
// Auto-fit responsive grid
.gallery {
  @include grid-auto(300px, 2rem);
}

// Fixed 4-column grid
.dashboard {
  @include grid-cols(4, 1.5rem);
}

// Sidebar layout
.layout {
  @include grid-sidebar(250px, 2rem);
}

// Centered content
.hero {
  @include grid-center;
  min-height: 400px;
}

// Span multiple columns
.featured {
  @include grid-span(2, 1);
}
```

---

## 🎯 Grid Mixins Overview

| Category       | Mixins                                               | Use Case               |
| -------------- | ---------------------------------------------------- | ---------------------- |
| **Responsive** | `grid-auto`, `grid-fill`, `grid-cards`               | Auto-responsive grids  |
| **Fixed**      | `grid-cols`, `grid-rows`, `grid-template`            | Fixed column/row grids |
| **Layouts**    | `grid-sidebar`, `grid-holy-grail`, `grid-full-bleed` | Common layout patterns |
| **Items**      | `grid-span`, `grid-area`, `grid-order`               | Grid item positioning  |
| **Alignment**  | `grid-center`, `grid-align`, `grid-self`             | Content alignment      |
| **Utilities**  | `grid-gap`, `grid-dense`, `grid-subgrid`             | Special functionality  |

---

## 📊 Quick Reference Table

Complete list of all mixins with parameters, defaults, and usage examples.

### Responsive Grid Mixins

| Mixin          | Parameters                     | Defaults                 | Usage Example                              |
| -------------- | ------------------------------ | ------------------------ | ------------------------------------------ |
| `grid-auto`    | `$min`, `$gap`                 | `250px`, `1rem`          | `@include grid-auto(300px, 2rem);`         |
| `grid-fill`    | `$min`, `$gap`                 | `250px`, `1rem`          | `@include grid-fill(280px, 1.5rem);`       |
| `grid-cards`   | `$min`, `$max`, `$gap`         | `280px`, `1fr`, `1.5rem` | `@include grid-cards(300px, 400px, 2rem);` |
| `grid-dense`   | `$min`, `$gap`                 | `150px`, `1rem`          | `@include grid-dense(200px, 1.5rem);`      |
| `grid-stacked` | `$cols`, `$gap`, `$breakpoint` | `2`, `1rem`, `640px`     | `@include grid-stacked(3, 1.5rem, 768px);` |

### Fixed Grid Mixins

| Mixin             | Parameters          | Defaults         | Usage Example                                    |
| ----------------- | ------------------- | ---------------- | ------------------------------------------------ |
| `grid-cols`       | `$cols`, `$gap`     | `12`, `1rem`     | `@include grid-cols(4, 1.5rem);`                 |
| `grid-rows`       | `$rows`, `$gap`     | `3`, `1rem`      | `@include grid-rows(5, 2rem);`                   |
| `grid-template`   | `$template`, `$gap` | required, `1rem` | `@include grid-template(200px 1fr 300px, 2rem);` |
| `grid-equal-rows` | `$rows`, `$gap`     | `3`, `1rem`      | `@include grid-equal-rows(4, 1rem);`             |

### Layout Pattern Mixins

| Mixin                     | Parameters                              | Defaults                 | Usage Example                                             |
| ------------------------- | --------------------------------------- | ------------------------ | --------------------------------------------------------- |
| `grid-sidebar`            | `$sidebar-width`, `$gap`, `$position`   | `300px`, `1rem`, `left`  | `@include grid-sidebar(250px, 2rem, left);`               |
| `grid-sidebar-responsive` | `$sidebar-width`, `$gap`, `$breakpoint` | `300px`, `1rem`, `768px` | `@include grid-sidebar-responsive(280px, 1.5rem, 992px);` |
| `grid-holy-grail`         | `$sidebar-width`, `$gap`                | `250px`, `1rem`          | `@include grid-holy-grail(200px, 1rem);`                  |
| `grid-full-bleed`         | `$content-width`, `$gap`                | `1200px`, `1rem`         | `@include grid-full-bleed(800px, 2rem);`                  |
| `grid-masonry`            | `$cols`, `$gap`                         | `3`, `1rem`              | `@include grid-masonry(4, 1.5rem);`                       |
| `grid-asymmetric`         | `$ratio`, `$gap`                        | `2`, `1rem`              | `@include grid-asymmetric(3, 2rem);`                      |

### Grid Item Mixins

| Mixin        | Parameters                                         | Defaults                           | Usage Example                     |
| ------------ | -------------------------------------------------- | ---------------------------------- | --------------------------------- |
| `grid-span`  | `$col-span`, `$row-span`                           | `1`, `1`                           | `@include grid-span(2, 1);`       |
| `grid-area`  | `$col-start`, `$col-end`, `$row-start`, `$row-end` | required, required, `auto`, `auto` | `@include grid-area(1, 4, 2, 4);` |
| `grid-order` | `$order`                                           | `0`                                | `@include grid-order(-1);`        |

### Alignment Mixins

| Mixin         | Parameters           | Defaults           | Usage Example                         |
| ------------- | -------------------- | ------------------ | ------------------------------------- |
| `grid-center` | none                 | -                  | `@include grid-center;`               |
| `grid-align`  | `$justify`, `$align` | `center`, `center` | `@include grid-align(start, center);` |
| `grid-self`   | `$justify`, `$align` | `auto`, `auto`     | `@include grid-self(end, start);`     |

### Utility Mixins

| Mixin          | Parameters             | Defaults       | Usage Example                         |
| -------------- | ---------------------- | -------------- | ------------------------------------- |
| `grid-gap`     | `$row-gap`, `$col-gap` | `1rem`, `1rem` | `@include grid-gap(2rem, 1rem);`      |
| `grid-subgrid` | `$rows`, `$cols`       | `true`, `true` | `@include grid-subgrid(false, true);` |

---

## 📖 Detailed Documentation

### Responsive Grid Mixins

#### `@mixin grid-auto($min, $gap)`

Creates a **responsive grid** that automatically fits as many columns as possible based on minimum width.

**Parameters:**

- `$min`: Minimum width per column (default: `250px`)
- `$gap`: Gap between items (default: `1rem`)

**Use case:** Image galleries, product cards, any content that should flow naturally

```scss
.gallery {
  @include grid-auto(300px, 2rem);
}

// Compiles to:
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
```

---

#### `@mixin grid-fill($min, $gap)`

Similar to `grid-auto`, but uses `auto-fill` instead of `auto-fit`. Creates **empty columns** if there's extra space.

**Parameters:**

- `$min`: Minimum width per column (default: `250px`)
- `$gap`: Gap between items (default: `1rem`)

**Difference from `grid-auto`:**

- `auto-fit`: Collapses empty tracks, items stretch to fill space
- `auto-fill`: Keeps empty tracks, items maintain consistent size

```scss
.product-grid {
  @include grid-fill(280px, 1.5rem);
}
```

---

#### `@mixin grid-cards($min, $max, $gap)`

Responsive card grid with **min/max constraints** for better control.

**Parameters:**

- `$min`: Minimum card width (default: `280px`)
- `$max`: Maximum card width (default: `1fr`)
- `$gap`: Gap between cards (default: `1.5rem`)

```scss
.cards {
  @include grid-cards(300px, 400px, 2rem);
}
```

---

### Fixed Grid Mixins

#### `@mixin grid-cols($cols, $gap)`

Creates a grid with a **fixed number of columns**.

**Parameters:**

- `$cols`: Number of columns (default: `12`)
- `$gap`: Gap between items (default: `1rem`)

```scss
.dashboard {
  @include grid-cols(4, 1.5rem);
}

// Compiles to:
.dashboard {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}
```

---

#### `@mixin grid-rows($rows, $gap)`

Creates a grid with a **fixed number of rows**.

**Parameters:**

- `$rows`: Number of rows (default: `3`)
- `$gap`: Gap between items (default: `1rem`)

```scss
.vertical-layout {
  @include grid-rows(5, 2rem);
}
```

---

#### `@mixin grid-template($template, $gap)`

Creates a grid with **custom column sizes**.

**Parameters:**

- `$template`: CSS grid-template-columns value
- `$gap`: Gap between items (default: `1rem`)

```scss
.custom-layout {
  @include grid-template(200px 1fr 300px, 2rem);
}

// Asymmetric layout
.blog {
  @include grid-template(2fr 1fr, 1rem);
}
```

---

### Layout Pattern Mixins

#### `@mixin grid-sidebar($sidebar-width, $gap, $position)`

Creates a **sidebar + main content** layout.

**Parameters:**

- `$sidebar-width`: Width of sidebar (default: `300px`)
- `$gap`: Gap between sidebar and content (default: `1rem`)
- `$position`: `left` or `right` (default: `left`)

```scss
.layout {
  @include grid-sidebar(250px, 2rem, left);
}

// Right sidebar
.layout-alt {
  @include grid-sidebar(300px, 1.5rem, right);
}
```

---

#### `@mixin grid-sidebar-responsive($sidebar-width, $gap, $breakpoint)`

Sidebar that **stacks on mobile** and appears side-by-side on larger screens.

**Parameters:**

- `$sidebar-width`: Width of sidebar (default: `300px`)
- `$gap`: Gap between elements (default: `1rem`)
- `$breakpoint`: When to switch to sidebar layout (default: `768px`)

```scss
.responsive-layout {
  @include grid-sidebar-responsive(280px, 1.5rem, 992px);
}
```

---

#### `@mixin grid-holy-grail($sidebar-width, $gap)`

Classic **Holy Grail layout** (header, sidebar, content, footer).

**Parameters:**

- `$sidebar-width`: Width of sidebars (default: `250px`)
- `$gap`: Gap between elements (default: `1rem`)

```scss
.page {
  @include grid-holy-grail(200px, 1rem);
}

// HTML structure:
.page {
  .header {
    grid-area: header;
  }
  .sidebar-left {
    grid-area: sidebar-left;
  }
  .content {
    grid-area: content;
  }
  .sidebar-right {
    grid-area: sidebar-right;
  }
  .footer {
    grid-area: footer;
  }
}
```

---

#### `@mixin grid-full-bleed($content-width, $gap)`

Grid that allows items to **break out** to full width while keeping content centered.

**Parameters:**

- `$content-width`: Max width of content area (default: `1200px`)
- `$gap`: Gap between items (default: `1rem`)

```scss
.article {
  @include grid-full-bleed(800px, 2rem);

  > * {
    grid-column: 2; // Default content column
  }

  .full-width-image {
    grid-column: 1 / -1; // Break out to full width
  }
}
```

---

#### `@mixin grid-masonry($cols, $gap)`

Creates a **masonry-style layout** effect.

**Parameters:**

- `$cols`: Number of columns (default: `3`)
- `$gap`: Gap between items (default: `1rem`)

```scss
.masonry {
  @include grid-masonry(4, 1.5rem);

  .item {
    grid-row-end: span 10; // Adjust based on content height
  }
}
```

---

### Grid Item Mixins

#### `@mixin grid-span($col-span, $row-span)`

Makes a grid item **span across multiple columns/rows**.

**Parameters:**

- `$col-span`: Number of columns to span (default: `1`)
- `$row-span`: Number of rows to span (default: `1`)

```scss
.featured-card {
  @include grid-span(2, 1); // Span 2 columns, 1 row
}

.large-item {
  @include grid-span(3, 2); // Span 3 columns, 2 rows
}
```

---

#### `@mixin grid-area($col-start, $col-end, $row-start, $row-end)`

Places item in a **specific grid area**.

**Parameters:**

- `$col-start`: Starting column line
- `$col-end`: Ending column line
- `$row-start`: Starting row line (default: `auto`)
- `$row-end`: Ending row line (default: `auto`)

```scss
.header {
  @include grid-area(1, 4); // Columns 1-4
}

.sidebar {
  @include grid-area(1, 2, 2, 4); // Columns 1-2, Rows 2-4
}
```

---

#### `@mixin grid-order($order)`

Changes the **visual order** of grid items without changing HTML.

**Parameters:**

- `$order`: Order value (default: `0`)

```scss
.first {
  @include grid-order(-1); // Appears first
}

.last {
  @include grid-order(999); // Appears last
}
```

---

### Alignment & Utility Mixins

#### `@mixin grid-center`

Centers content **both horizontally and vertically** within a grid cell.

```scss
.hero {
  @include grid-center;
  min-height: 400px;
}

// Compiles to:
.hero {
  display: grid;
  place-items: center;
}
```

---

#### `@mixin grid-align($justify, $align)`

Aligns **all items** in the grid container.

**Parameters:**

- `$justify`: Horizontal alignment (default: `center`)
- `$align`: Vertical alignment (default: `center`)

**Values:** `start`, `end`, `center`, `stretch`

```scss
.grid {
  @include grid-align(start, center);
}
```

---

#### `@mixin grid-self($justify, $align)`

Aligns a **single grid item** within its cell.

**Parameters:**

- `$justify`: Horizontal self-alignment (default: `auto`)
- `$align`: Vertical self-alignment (default: `auto`)

```scss
.special-item {
  @include grid-self(end, start);
}
```

---

#### `@mixin grid-gap($row-gap, $col-gap)`

Sets **different gaps** for rows and columns.

**Parameters:**

- `$row-gap`: Vertical gap (default: `1rem`)
- `$col-gap`: Horizontal gap (default: `1rem`)

```scss
.grid {
  @include grid-gap(2rem, 1rem); // More vertical space
}
```

---

#### `@mixin grid-dense($min, $gap)`

Fills gaps by placing items **densely** (useful for varying item sizes).

**Parameters:**

- `$min`: Minimum item width (default: `150px`)
- `$gap`: Gap between items (default: `1rem`)

```scss
.pinterest-style {
  @include grid-dense(200px, 1.5rem);
}
```

---

#### `@mixin grid-equal-rows($rows, $gap)`

Creates rows with **equal height**.

**Parameters:**

- `$rows`: Number of rows (default: `3`)
- `$gap`: Gap between rows (default: `1rem`)

```scss
.equal-height {
  @include grid-equal-rows(4, 1rem);
}
```

---

#### `@mixin grid-subgrid($rows, $cols)`

Creates a **subgrid** (inherits parent grid lines).

**Parameters:**

- `$rows`: Use subgrid for rows (default: `true`)
- `$cols`: Use subgrid for columns (default: `true`)

```scss
.parent {
  @include grid-cols(4);
}

.nested-grid {
  @include grid-span(2, 1);
  @include grid-subgrid(false, true); // Inherit parent's columns
}
```

---

#### `@mixin grid-stacked($cols, $gap, $breakpoint)`

**Mobile-first stacked grid** that expands on larger screens.

**Parameters:**

- `$cols`: Number of columns on desktop (default: `2`)
- `$gap`: Gap between items (default: `1rem`)
- `$breakpoint`: When to switch to multi-column (default: `640px`)

```scss
.cards {
  @include grid-stacked(3, 1.5rem, 768px);
}
```

---

#### `@mixin grid-asymmetric($ratio, $gap)`

Creates an **asymmetric 2-column layout** with custom ratio.

**Parameters:**

- `$ratio`: Ratio of first column (default: `2`)
- `$gap`: Gap between columns (default: `1rem`)

```scss
.blog-layout {
  @include grid-asymmetric(3, 2rem); // 3:1 ratio (main content : sidebar)
}
```

---

## 💡 Usage Examples

### Responsive Image Gallery

```scss
.gallery {
  @include grid-auto(300px, 2rem);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }

  .featured {
    @include grid-span(2, 2);
  }
}
```

---

### Dashboard Layout

```scss
.dashboard {
  @include grid-template(250px 1fr, 1rem);
  min-height: 100vh;

  .sidebar {
    @include grid-center;
    background: #f5f5f5;
  }

  .main-content {
    @include grid-cols(3, 1.5rem);
    padding: 2rem;

    .widget {
      padding: 1.5rem;
      background: white;
      border-radius: 8px;

      &.large {
        @include grid-span(2, 1);
      }
    }
  }
}
```

---

### Blog Layout with Sidebar

```scss
.blog {
  @include grid-sidebar-responsive(300px, 2rem, 992px);

  .article {
    @include grid-rows(auto 1fr auto, 1rem);

    .article-header {
      /* ... */
    }
    .article-content {
      /* ... */
    }
    .article-footer {
      /* ... */
    }
  }

  .sidebar {
    .widget {
      padding: 1.5rem;
      margin-bottom: 1rem;
    }
  }
}
```

---

### Card Grid with Dense Packing

```scss
.products {
  @include grid-dense(280px, 1.5rem);

  .product-card {
    background: white;
    border-radius: 8px;
    padding: 1rem;

    &.featured {
      @include grid-span(2, 2);
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    &.sale {
      @include grid-span(1, 2);
    }
  }
}
```

---

### Full-Width Content Sections

```scss
.article {
  @include grid-full-bleed(800px, 2rem);

  h1,
  p,
  ul {
    grid-column: 2; // Content column
  }

  .full-width-image {
    grid-column: 1 / -1; // Break out to full width
    width: 100%;
    height: 500px;
    object-fit: cover;
  }

  .highlight-box {
    grid-column: 1 / -1;
    background: #f0f0f0;
    padding: 2rem;
    text-align: center;
  }
}
```

---

### Responsive Navigation

```scss
.nav {
  @include grid-stacked(4, 1rem, 768px);

  a {
    @include grid-center;
    padding: 1rem;
    text-decoration: none;

    &:hover {
      background: #f0f0f0;
    }
  }
}
```

---

### Holy Grail Layout

```scss
.page-layout {
  @include grid-holy-grail(200px, 1rem);

  .header {
    grid-area: header;
    @include grid-center;
    background: #333;
    color: white;
    padding: 1rem;
  }

  .sidebar-left {
    grid-area: sidebar-left;
    background: #f5f5f5;
  }

  .content {
    grid-area: content;
    @include grid-auto(300px, 1.5rem);
  }

  .sidebar-right {
    grid-area: sidebar-right;
    background: #f5f5f5;
  }

  .footer {
    grid-area: footer;
    @include grid-center;
    background: #222;
    color: white;
    padding: 2rem;
  }
}
```

---

## ✅ Best Practices

### 1. **Choose the Right Mixin**

- Use `grid-auto()` for **content that should flow naturally** (galleries, products)
- Use `grid-cols()` for **fixed layouts** (dashboards, forms)
- Use `grid-sidebar()` for **classic two-column layouts**
- Use `grid-template()` for **precise control** over column sizes

---

### 2. **Mobile-First Approach**

Start with mobile styles and use responsive mixins to adapt:

```scss
.cards {
  // Mobile: 1 column
  @include grid-cols(1, 1rem);

  @media (min-width: 768px) {
    // Tablet: 2 columns
    @include grid-cols(2, 1.5rem);
  }

  @media (min-width: 1024px) {
    // Desktop: auto-responsive
    @include grid-auto(300px, 2rem);
  }
}
```

---

### 3. **Consistent Gap Values**

Define gap variables for consistency:

```scss
$gap-sm: 0.5rem;
$gap-md: 1rem;
$gap-lg: 1.5rem;
$gap-xl: 2rem;

.grid {
  @include grid-auto(300px, $gap-lg);
}
```

---

### 4. **Semantic Class Names**

Use descriptive class names that explain purpose:

```scss
// ✅ Good
.product-grid {
  @include grid-auto(280px);
}
.article-layout {
  @include grid-sidebar(300px);
}

// ❌ Avoid
.grid-1 {
  @include grid-auto(280px);
}
.layout-2 {
  @include grid-sidebar(300px);
}
```

---

### 5. **Combine Mixins Thoughtfully**

```scss
.complex-layout {
  @include grid-sidebar(250px, 2rem);

  .sidebar {
    @include grid-rows(auto 1fr auto);
  }

  .main-content {
    @include grid-auto(300px, 1.5rem);

    .featured {
      @include grid-span(2, 1);
    }
  }
}
```

---

### 6. **Test Responsiveness**

Always test with:

- Different screen sizes (mobile, tablet, desktop)
- Different content amounts (1 item, 10 items, 100 items)
- Different item sizes (varying heights, widths)

---

### 7. **Use Subgrid When Appropriate**

For nested grids that need to align with parent:

```scss
.parent {
  @include grid-cols(4);

  .nested {
    @include grid-span(2, 1);
    @include grid-subgrid(false, true); // Align with parent columns
  }
}
```

---

## 🌐 Browser Support

- **Modern Browsers:** Chrome 57+, Firefox 52+, Safari 10.1+, Edge 16+
- **CSS Grid:** 95%+ global support
- **Subgrid:** Chrome 117+, Firefox 71+, Safari 16+ (use fallbacks for older browsers)

---

## ❓ FAQ

### Can I use this with Bootstrap or Tailwind?

Yes! Mastors-Gridder is framework-agnostic and works alongside any CSS framework. Use it for custom grid layouts where framework utilities fall short.

---

### Why SCSS mixins instead of CSS classes?

**Advantages of mixins:**

- More semantic HTML (no utility class clutter)
- Greater flexibility and customization
- Better for component-based architecture
- Compile-time optimizations
- No CSS bloat from unused classes

---

### How do I handle IE11?

CSS Grid is not fully supported in IE11. Use feature queries:

```scss
.grid {
  display: flex; // Fallback
  flex-wrap: wrap;

  @supports (display: grid) {
    @include grid-auto(300px);
  }
}
```

---

### Can I customize the mixins?

Absolutely! Copy the mixin code and modify parameters, add new features, or create your own custom mixins based on these templates.

---

### How do I debug grid layouts?

Use browser DevTools:

```scss
// Temporary debug styles
.grid {
  @include grid-auto(300px);

  > * {
    border: 1px solid red; // Visualize grid items
  }
}
```

Or use Firefox Grid Inspector / Chrome Grid Overlay tools.

---

### What's the performance impact?

CSS Grid is highly performant and hardware-accelerated. These mixins compile to standard CSS Grid properties with no runtime overhead.

---

## 📋 Changelog

### Version 1.0.0

**Released:** December 30, 2025 - Initial Release

#### 🎉 Features

- ⭐ 25+ production-ready grid mixins
- ⭐ Responsive grid utilities (auto-fit, auto-fill)
- ⭐ Common layout patterns (sidebar, holy grail, full-bleed)
- ⭐ Grid item positioning mixins (span, area, order)
- ⭐ Alignment utilities (center, align, self)
- ⭐ Advanced features (subgrid, dense packing, masonry)
- ⭐ Comprehensive documentation with real-world examples
- ⭐ Mobile-first approach with responsive helpers
- ⭐ Zero dependencies, framework-agnostic

---

## 📄 License

Free to use in personal and commercial projects.

---

## 🤝 Contributing

Found an issue or have a suggestion? Contributions are welcome!

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 🔗 Related Projects

- [Mastors-Fluider](https://github.com/KEHEM-IT/Mastors-Fluider) - Responsive breakpoint utility system

---

**Maintained by:** [KEHEM-IT](https://github.com/KEHEM-IT)  
**License:** Free to Use  
**Version:** 1.0.0
