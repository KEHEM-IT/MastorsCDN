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
- [What's New in v1.2](#-whats-new-in-v12)
- [Quick Start](#-quick-start)
- [Grid Mixins Overview](#-grid-mixins-overview)
- [Quick Reference Table](#-quick-reference-table)
- [Detailed Documentation](#-detailed-documentation)
  - [Core Grid Mixins](#core-grid-mixins)
  - [Responsive Grid Mixins](#responsive-grid-mixins)
  - [Fixed Grid Mixins](#fixed-grid-mixins)
  - [Layout Pattern Mixins](#layout-pattern-mixins)
  - [Grid Item Mixins](#grid-item-mixins)
  - [Alignment & Utility Mixins](#alignment--utility-mixins)
  - [Advanced Grid Mixins (NEW)](#advanced-grid-mixins-new)
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
@use "mastors-gridder/mastors-gridder" as *;
```

Or with a custom namespace:

```scss
@use "mastors-gridder/mastors-gridder" as grid;

// Usage: @include grid.grid-auto(250px, 1rem);
```

### Manual Installation

Download `_mastors-gridder.scss` and import it:

```scss
@import "path/to/mastors-gridder";
```

---

## 🎉 What's New in v1.2

Version 1.2 brings **20 powerful new mixins** and significant enhancements to the library, expanding from 23 to **43 comprehensive grid mixins**!

### ✨ New Features

#### 🔧 Core Grid Setup
- **`grid-container`** - Simplified grid container initialization
- **`grid-auto-flow`** - Control auto-placement with dense packing
- **`grid-auto-rows`** - Set automatic row sizing
- **`grid-auto-cols`** - Set automatic column sizing

#### 📐 Advanced Sizing
- **`grid-minmax`** - Explicit minmax control with auto-fit/fill
- **`grid-fr`** - Create grids with explicit fr unit ratios
- **`grid-intrinsic`** - Use intrinsic sizing (min/max/fit-content)
- **`grid-explicit`** - Set columns and rows in one mixin
- **`grid-fit-content`** - Flexible column sizing with fit-content()
- **`grid-repeat-pattern`** - Repeat custom patterns
- **`grid-auto-track`** - Flexible auto-fit/fill with custom min/max

#### 🎯 Positioning & Layout
- **`grid-layer`** - Overlay elements across grid tracks
- **`grid-full-width`** - Span all columns instantly
- **`grid-full-height`** - Span all rows instantly
- **`grid-place`** - Concise shorthand for place-items
- **`grid-place-content`** - Shorthand for place-content

#### 📱 Responsive Enhancements
- **`grid-areas-responsive`** - Responsive grid template areas
- **`grid-container-aware`** - Container query support
- **`grid-masonry-modern`** - Improved masonry with dense packing

#### 🎨 Content Alignment
- **`grid-content`** - Align entire grid content (not items)

### 🚀 Key Improvements

- **43 Total Mixins** - Nearly doubled the mixin library
- **Better Performance** - Optimized output with modern CSS features
- **Enhanced Flexibility** - More granular control over grid behavior
- **Modern CSS Support** - Container queries, intrinsic sizing, and more
- **Improved Documentation** - Comprehensive examples for all mixins

---

## ⚡ Quick Start

```scss
// Auto-fit responsive grid
.gallery {
  @include grid-auto(300px, 2rem);
}

// NEW: Simple container setup
.wrapper {
  @include grid-container(12, 1rem);
}

// NEW: Explicit minmax control
.cards {
  @include grid-minmax(200px, 400px, auto-fit, 1rem);
}

// Fixed 4-column grid
.dashboard {
  @include grid-cols(4, 1.5rem);
}

// NEW: Full-width spanning
.hero-image {
  @include grid-full-width;
}

// Centered content
.hero {
  @include grid-center;
  min-height: 400px;
}

// NEW: Modern masonry
.masonry {
  @include grid-masonry-modern(4, 40px, 1rem);
}
```

---

## 🎯 Grid Mixins Overview

| Category           | Count | Mixins                                                                                |
| ------------------ | ----- | ------------------------------------------------------------------------------------- |
| **Core Setup**     | 4     | `grid-container`, `grid-auto-flow`, `grid-auto-rows`, `grid-auto-cols`                |
| **Responsive**     | 5     | `grid-auto`, `grid-fill`, `grid-cards`, `grid-dense`, `grid-stacked`                  |
| **Fixed**          | 4     | `grid-cols`, `grid-rows`, `grid-template`, `grid-equal-rows`                          |
| **Layouts**        | 6     | `grid-sidebar`, `grid-sidebar-responsive`, `grid-holy-grail`, `grid-full-bleed`, etc. |
| **Items**          | 3     | `grid-span`, `grid-area`, `grid-order`                                                |
| **Alignment**      | 5     | `grid-center`, `grid-align`, `grid-self`, `grid-place`, `grid-place-content`          |
| **Advanced**       | 11    | `grid-minmax`, `grid-fr`, `grid-intrinsic`, `grid-layer`, `grid-areas-responsive`     |
| **Utilities**      | 5     | `grid-gap`, `grid-subgrid`, `grid-full-width`, `grid-full-height`, etc.               |

**Total: 43 Mixins** 🎉

---

## 📊 Quick Reference Table

### NEW: Core Grid Mixins

| Mixin              | Parameters                  | Defaults          | Usage Example                               |
| ------------------ | --------------------------- | ----------------- | ------------------------------------------- |
| `grid-container`   | `$cols`, `$gap`             | `12`, `1rem`      | `@include grid-container(12, 1rem);`        |
| `grid-auto-flow`   | `$flow`, `$dense`           | `row`, `false`    | `@include grid-auto-flow(column, true);`    |
| `grid-auto-rows`   | `$size`                     | `auto`            | `@include grid-auto-rows(100px);`           |
| `grid-auto-cols`   | `$size`                     | `auto`            | `@include grid-auto-cols(200px);`           |
| `grid-content`     | `$justify`, `$align`        | `center`, `start` | `@include grid-content(center, start);`     |
| `grid-place`       | `$value`                    | `center`          | `@include grid-place(center);`              |
| `grid-place-content` | `$value`                  | `center`          | `@include grid-place-content(space-between);` |

### NEW: Advanced Sizing Mixins

| Mixin                  | Parameters                               | Defaults                        | Usage Example                                           |
| ---------------------- | ---------------------------------------- | ------------------------------- | ------------------------------------------------------- |
| `grid-minmax`          | `$min`, `$max`, `$repeat`, `$gap`        | `200px`, `1fr`, `auto-fit`, `1rem` | `@include grid-minmax(200px, 400px, auto-fit, 1rem);` |
| `grid-fr`              | `$fr-values...`                          | required                        | `@include grid-fr(2fr, 1fr, 1fr);`                      |
| `grid-intrinsic`       | `$repeat`, `$size`, `$gap`               | `auto-fit`, `max-content`, `1rem` | `@include grid-intrinsic(auto-fit, max-content, 0.5rem);` |
| `grid-explicit`        | `$cols`, `$rows`, `$gap`                 | required, `auto`, `1rem`        | `@include grid-explicit(1fr 2fr, auto 200px, 1rem);`   |
| `grid-fit-content`     | `$max-width`, `$repeat`, `$gap`          | `300px`, `auto-fit`, `1rem`     | `@include grid-fit-content(300px, auto-fit, 1rem);`    |
| `grid-repeat-pattern`  | `$pattern`, `$count`, `$gap`             | required, `3`, `1rem`           | `@include grid-repeat-pattern(100px 200px, 3, 1rem);`  |
| `grid-auto-track`      | `$repeat`, `$min`, `$max`, `$gap`        | `auto-fill`, `200px`, `1fr`, `1rem` | `@include grid-auto-track(auto-fill, 200px, 1fr, 1rem);` |

### NEW: Positioning & Layout Mixins

| Mixin                    | Parameters                               | Defaults                     | Usage Example                                                                      |
| ------------------------ | ---------------------------------------- | ---------------------------- | ---------------------------------------------------------------------------------- |
| `grid-layer`             | `$col-start`, `$col-end`, `$row-start`, `$row-end` | `1`, `-1`, `1`, `-1`  | `@include grid-layer(1, -1, 1, -1);`                                               |
| `grid-full-width`        | none                                     | -                            | `@include grid-full-width;`                                                        |
| `grid-full-height`       | none                                     | -                            | `@include grid-full-height;`                                                       |
| `grid-areas-responsive`  | `$mobile-areas`, `$desktop-areas`, `$breakpoint` | required, required, `768px` | `@include grid-areas-responsive("header" "main", "header header" "sidebar main", 768px);` |
| `grid-container-aware`   | `$min`, `$gap`                           | `250px`, `1rem`              | `@include grid-container-aware(250px, 1rem);`                                      |
| `grid-masonry-modern`    | `$cols`, `$row-gap`, `$col-gap`          | `4`, `40px`, `1rem`          | `@include grid-masonry-modern(4, 40px, 1rem);`                                     |

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

### Core Grid Mixins

#### `@mixin grid-container($cols, $gap)`

**NEW in v1.2** - Simplified grid container initialization with columns and gap.

**Parameters:**
- `$cols`: Number of columns (default: `12`)
- `$gap`: Gap between items (default: `1rem`)

**Use case:** Quick setup for standard grid containers

```scss
.container {
  @include grid-container(12, 1rem);
}

// Compiles to:
.container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1rem;
}
```

---

#### `@mixin grid-auto-flow($flow, $dense)`

**NEW in v1.2** - Controls automatic placement of grid items with optional dense packing.

**Parameters:**
- `$flow`: Flow direction - `row`, `column`, `row dense`, or `column dense` (default: `row`)
- `$dense`: Enable dense packing algorithm (default: `false`)

**Use case:** Control how items fill the grid and handle gaps

```scss
.masonry {
  @include grid-auto(250px);
  @include grid-auto-flow(row, true); // Fill gaps densely
}

// Compiles to:
.masonry {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  grid-auto-flow: row dense;
}
```

---

#### `@mixin grid-auto-rows($size)`

**NEW in v1.2** - Sets the size of implicitly created rows.

**Parameters:**
- `$size`: Row size (default: `auto`) - Can be `100px`, `minmax(100px, auto)`, `auto`, etc.

**Use case:** Control height of dynamically added rows

```scss
.dynamic-grid {
  @include grid-auto(300px);
  @include grid-auto-rows(150px); // All rows 150px tall
}
```

---

#### `@mixin grid-auto-cols($size)`

**NEW in v1.2** - Sets the size of implicitly created columns.

**Parameters:**
- `$size`: Column size (default: `auto`)

**Use case:** Control width of dynamically added columns

```scss
.horizontal-scroll {
  @include grid-auto-flow(column);
  @include grid-auto-cols(300px); // Each column 300px wide
}
```

---

#### `@mixin grid-content($justify, $align)`

**NEW in v1.2** - Aligns the entire grid content block (not individual items).

**Parameters:**
- `$justify`: Horizontal alignment (default: `center`) - `start`, `end`, `center`, `stretch`, `space-around`, `space-between`, `space-evenly`
- `$align`: Vertical alignment (default: `start`) - Same values as justify

**Use case:** Center or position the entire grid within its container

```scss
.centered-grid {
  @include grid-cols(3, 2rem);
  @include grid-content(center, center); // Center entire grid
  height: 100vh;
}
```

---

### Advanced Grid Mixins (NEW)

#### `@mixin grid-minmax($min, $max, $repeat, $gap)`

**NEW in v1.2** - Explicit control over minmax with auto-fit or auto-fill.

**Parameters:**
- `$min`: Minimum column width (default: `200px`)
- `$max`: Maximum column width (default: `1fr`)
- `$repeat`: `auto-fit` or `auto-fill` (default: `auto-fit`)
- `$gap`: Gap between items (default: `1rem`)

**Use case:** Fine-grained control over responsive column behavior

```scss
.cards {
  @include grid-minmax(200px, 400px, auto-fit, 1rem);
}

// Compiles to:
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 400px));
  gap: 1rem;
}
```

---

#### `@mixin grid-fr($fr-values...)`

**NEW in v1.2** - Create grid with explicit fr unit ratios.

**Parameters:**
- `$fr-values`: Variable number of fr values (required)

**Use case:** Precise fractional layouts

```scss
.layout {
  @include grid-fr(2fr, 1fr, 1fr); // 2:1:1 ratio
}

// Compiles to:
.layout {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
}
```

---

#### `@mixin grid-intrinsic($repeat, $size, $gap)`

**NEW in v1.2** - Uses intrinsic sizing functions.

**Parameters:**
- `$repeat`: `auto-fit` or `auto-fill` (default: `auto-fit`)
- `$size`: `min-content`, `max-content`, or `fit-content(300px)` (default: `max-content`)
- `$gap`: Gap between items (default: `1rem`)

**Use case:** Content-driven column sizes

```scss
.tags {
  @include grid-intrinsic(auto-fit, max-content, 0.5rem);
}

// Each tag takes only the space it needs
```

---

#### `@mixin grid-explicit($cols, $rows, $gap)`

**NEW in v1.2** - Set both columns and rows explicitly in one mixin.

**Parameters:**
- `$cols`: Grid template columns (required)
- `$rows`: Grid template rows (default: `auto`)
- `$gap`: Gap between items (default: `1rem`)

**Use case:** Complete grid definition in one line

```scss
.dashboard {
  @include grid-explicit(200px 1fr 300px, auto 1fr auto, 1rem);
}
```

---

#### `@mixin grid-layer($col-start, $col-end, $row-start, $row-end)`

**NEW in v1.2** - Overlay elements across the entire grid.

**Parameters:**
- `$col-start`: Starting column (default: `1`)
- `$col-end`: Ending column (default: `-1`)
- `$row-start`: Starting row (default: `1`)
- `$row-end`: Ending row (default: `-1`)

**Use case:** Hero sections, overlays, backgrounds

```scss
.hero {
  @include grid-auto(300px);
  min-height: 500px;

  .overlay {
    @include grid-layer; // Spans entire grid
    background: rgba(0, 0, 0, 0.5);
  }
}
```

---

#### `@mixin grid-fit-content($max-width, $repeat, $gap)`

**NEW in v1.2** - Flexible column sizing with fit-content().

**Parameters:**
- `$max-width`: Maximum width for fit-content (default: `300px`)
- `$repeat`: `auto-fit` or `auto-fill` (default: `auto-fit`)
- `$gap`: Gap between items (default: `1rem`)

**Use case:** Flexible content-aware columns with max width

```scss
.navigation {
  @include grid-fit-content(200px, auto-fit, 1rem);
}
```

---

#### `@mixin grid-repeat-pattern($pattern, $count, $gap)`

**NEW in v1.2** - Repeats a custom column pattern.

**Parameters:**
- `$pattern`: Pattern to repeat (required) - e.g., `100px 200px`
- `$count`: Number of times to repeat (default: `3`)
- `$gap`: Gap between items (default: `1rem`)

**Use case:** Alternating column widths

```scss
.alternating {
  @include grid-repeat-pattern(100px 200px, 3, 1rem);
  // Results in: 100px 200px 100px 200px 100px 200px
}
```

---

#### `@mixin grid-areas-responsive($mobile-areas, $desktop-areas, $breakpoint)`

**NEW in v1.2** - Responsive grid template areas for different breakpoints.

**Parameters:**
- `$mobile-areas`: Grid areas for mobile (required)
- `$desktop-areas`: Grid areas for desktop (required)
- `$breakpoint`: Breakpoint for switching layouts (default: `768px`)

**Use case:** Completely different layouts for mobile vs desktop

```scss
.page {
  @include grid-areas-responsive(
    "header"
    "main"
    "sidebar"
    "footer",
    "header header"
    "sidebar main"
    "footer footer",
    768px
  );

  .header { grid-area: header; }
  .main { grid-area: main; }
  .sidebar { grid-area: sidebar; }
  .footer { grid-area: footer; }
}
```

---

#### `@mixin grid-container-aware($min, $gap)`

**NEW in v1.2** - Enables container queries for responsive grids.

**Parameters:**
- `$min`: Minimum column width (default: `250px`)
- `$gap`: Gap between items (default: `1rem`)

**Use case:** Component that responds to container size, not viewport

```scss
.card-container {
  container-type: inline-size;

  .cards {
    @include grid-container-aware(250px, 1rem);
  }
}
```

---

#### `@mixin grid-full-width`

**NEW in v1.2** - Makes an item span all columns (shorthand for `grid-column: 1 / -1`).

```scss
.hero-image {
  @include grid-full-width;
}

// Compiles to:
.hero-image {
  grid-column: 1 / -1;
}
```

---

#### `@mixin grid-full-height`

**NEW in v1.2** - Makes an item span all rows (shorthand for `grid-row: 1 / -1`).

```scss
.sidebar {
  @include grid-full-height;
}

// Compiles to:
.sidebar {
  grid-row: 1 / -1;
}
```

---

#### `@mixin grid-place($value)`

**NEW in v1.2** - Concise shorthand for `place-items` property.

**Parameters:**
- `$value`: Alignment value (default: `center`) - `start`, `end`, `center`, `stretch`

```scss
.centered {
  @include grid-place(center);
}

// Compiles to:
.centered {
  display: grid;
  place-items: center;
}
```

---

#### `@mixin grid-place-content($value)`

**NEW in v1.2** - Shorthand for `place-content` property.

**Parameters:**
- `$value`: Alignment value (default: `center`) - `start`, `end`, `center`, `space-between`, `space-around`, `space-evenly`

```scss
.spaced-grid {
  @include grid-place-content(space-between);
}
```

---

#### `@mixin grid-masonry-modern($cols, $row-gap, $col-gap)`

**NEW in v1.2** - Improved masonry layout with dense auto-flow.

**Parameters:**
- `$cols`: Number of columns (default: `4`)
- `$row-gap`: Vertical gap (default: `40px`)
- `$col-gap`: Horizontal gap (default: `1rem`)

**Use case:** Better Pinterest-style layouts with improved gap packing

```scss
.pinterest {
  @include grid-masonry-modern(4, 40px, 1rem);

  .item {
    grid-row-end: span 10; // Base height units
  }
}
```

---

#### `@mixin grid-auto-track($repeat, $min, $max, $gap)`

**NEW in v1.2** - Flexible version combining auto-fit/fill with custom min/max.

**Parameters:**
- `$repeat`: `auto-fit` or `auto-fill` (default: `auto-fill`)
- `$min`: Minimum track size (default: `200px`)
- `$max`: Maximum track size (default: `1fr`)
- `$gap`: Gap between items (default: `1rem`)

**Use case:** Maximum flexibility for responsive grids

```scss
.flexible {
  @include grid-auto-track(auto-fill, 200px, 300px, 1rem);
}
```

---

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
```

---

## 💡 Usage Examples

### NEW: Modern Hero Section with Overlay

```scss
.hero {
  @include grid-container(1, 0);
  min-height: 600px;

  .background {
    @include grid-layer; // Spans entire grid
    background: url('hero.jpg') center/cover;
  }

  .overlay {
    @include grid-layer;
    background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6));
  }

  .content {
    @include grid-layer;
    @include grid-place(center);
    color: white;
    z-index: 2;
  }
}
```

---

### NEW: Responsive Grid Template Areas

```scss
.app-layout {
  @include grid-areas-responsive(
    "header"
    "nav"
    "main"
    "aside"
    "footer",
    "header header header"
    "nav main aside"
    "footer footer footer",
    1024px
  );
  min-height: 100vh;

  .header { grid-area: header; }
  .nav { grid-area: nav; }
  .main { grid-area: main; }
  .aside { grid-area: aside; }
  .footer { grid-area: footer; }
}
```

---

### NEW: Advanced Card Grid with Custom Sizing

```scss
.product-showcase {
  @include grid-minmax(280px, 350px, auto-fit, 2rem);
  @include grid-auto-flow(row, true); // Dense packing
  @include grid-auto-rows(minmax(200px, auto));

  .card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;

    &.featured {
      @include grid-span(2, 2);
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    &.tall {
      grid-row-end: span 2;
    }
  }
}
```

---

### NEW: Container-Aware Component

```scss
.widget-container {
  container-type: inline-size;
  padding: 2rem;

  .widgets {
    @include grid-container-aware(250px, 1rem);

    .widget {
      background: white;
      padding: 1rem;
      border-radius: 8px;
    }
  }
}
```

---

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

## ✅ Best Practices

### 1. **Use the Right Mixin for Your Needs**

```scss
// ✅ For dynamic content that should flow
.gallery {
  @include grid-auto(300px);
}

// ✅ For fixed layouts
.dashboard {
  @include grid-cols(4);
}

// ✅ NEW: For precise control
.custom {
  @include grid-minmax(200px, 400px, auto-fit);
}

// ✅ NEW: For content-driven sizing
.tags {
  @include grid-intrinsic(auto-fit, max-content);
}
```

---

### 2. **Combine New Mixins for Power**

```scss
.advanced-grid {
  @include grid-container(12, 1rem);
  @include grid-auto-flow(row, true); // Dense packing
  @include grid-auto-rows(minmax(100px, auto));

  .item {
    @include grid-self(center, start);
  }

  .full-width {
    @include grid-full-width;
  }
}
```

---

### 3. **Mobile-First with New Features**

```scss
.responsive-cards {
  // Mobile: Stack
  @include grid-container(1, 1rem);

  @media (min-width: 640px) {
    // Tablet: 2 columns
    @include grid-cols(2, 1rem);
  }

  @media (min-width: 1024px) {
    // Desktop: Auto-responsive with minmax control
    @include grid-minmax(280px, 350px, auto-fit, 2rem);
  }
}
```

---

### 4. **Use New Alignment Shortcuts**

```scss
// ✅ NEW: Concise centering
.hero {
  @include grid-place(center);
  min-height: 400px;
}

// ✅ NEW: Content alignment
.spaced {
  @include grid-cols(3);
  @include grid-place-content(space-between);
}

// ✅ NEW: Grid content positioning
.centered-grid {
  @include grid-cols(3);
  @include grid-content(center, center);
  height: 100vh;
}
```

---

## 🌐 Browser Support

- **Modern Browsers:** Chrome 57+, Firefox 52+, Safari 10.1+, Edge 16+
- **CSS Grid:** 96%+ global support
- **Subgrid:** Chrome 117+, Firefox 71+, Safari 16+
- **Container Queries:** Chrome 105+, Firefox 110+, Safari 16+
- **place-items/place-content:** Chrome 59+, Firefox 45+, Safari 11+

---

## 📋 Changelog

### Version 1.2.0

**Released:** January 2, 2026

#### 🎉 Major Features

- **20 New Mixins Added** - Expanded from 23 to 43 total mixins
- **Enhanced Core Setup** - New container and auto-flow mixins
- **Advanced Sizing Controls** - Minmax, fr units, intrinsic sizing
- **Modern CSS Support** - Container queries, place properties
- **Improved Masonry** - Better dense packing algorithm

#### ✨ New Mixins

**Core Grid Setup (4 mixins):**
- `grid-container` - Simplified grid initialization
- `grid-auto-flow` - Control auto-placement with dense packing
- `grid-auto-rows` - Set automatic row sizing
- `grid-auto-cols` - Set automatic column sizing

**Advanced Sizing (7 mixins):**
- `grid-minmax` - Explicit minmax control
- `grid-fr` - Explicit fr unit ratios
- `grid-intrinsic` - Intrinsic sizing (min/max/fit-content)
- `grid-explicit` - Set columns and rows in one mixin
- `grid-fit-content` - Flexible fit-content() sizing
- `grid-repeat-pattern` - Repeat custom patterns
- `grid-auto-track` - Flexible auto-fit/fill with custom min/max

**Layout & Positioning (6 mixins):**
- `grid-layer` - Overlay elements across grid
- `grid-full-width` - Span all columns shorthand
- `grid-full-height` - Span all rows shorthand
- `grid-areas-responsive` - Responsive grid template areas
- `grid-container-aware` - Container query support
- `grid-masonry-modern` - Improved masonry layout

**Alignment (3 mixins):**
- `grid-place` - Concise place-items shorthand
- `grid-place-content` - place-content shorthand
- `grid-content` - Align entire grid content

#### 🔧 Improvements

- Better documentation with comprehensive examples
- More intuitive parameter names and defaults
- Enhanced performance with modern CSS features
- Improved browser compatibility notes
- Extended FAQ section

#### 📚 Documentation

- Complete quick reference tables for all mixins
- Real-world usage examples for new features
- Updated best practices section
- Enhanced browser support information

---

### Version 1.0.0

**Released:** December 30, 2025 - Initial Release

#### 🎉 Features

- ⭐ 23 production-ready grid mixins
- ⭐ Responsive grid utilities (auto-fit, auto-fill)
- ⭐ Common layout patterns (sidebar, holy grail, full-bleed)
- ⭐ Grid item positioning mixins (span, area, order)
- ⭐ Alignment utilities (center, align, self)
- ⭐ Advanced features (subgrid, dense packing, masonry)
- ⭐ Comprehensive documentation with real-world examples
- ⭐ Mobile-first approach with responsive helpers
- ⭐ Zero dependencies, framework-agnostic

---

## ❓ FAQ

### What's the difference between v1.0 and v1.2?

Version 1.2 adds **20 powerful new mixins** (nearly doubling the library), introduces modern CSS features like container queries, provides more granular control over grid behavior, and includes enhanced alignment shortcuts and improved masonry layouts.

---

### Can I use the new container-aware features?

Yes! The `grid-container-aware` mixin uses CSS Container Queries, which are supported in Chrome 105+, Firefox 110+, and Safari 16+. For older browsers, use traditional media queries as a fallback.

---

### Should I use `grid-place` or `grid-center`?

- Use `grid-place(center)` when you want concise centering with flexibility
- Use `grid-center` when you want explicit centering (clearer intent)
- Both compile to the same CSS

---

### How do I migrate from v1.0 to v1.2?

Version 1.2 is **100% backward compatible**. All v1.0 mixins work identically. Simply update the library and optionally adopt new mixins where they improve your code.

---

### Which new mixins should I learn first?

Start with these high-impact additions:
1. `grid-full-width` / `grid-full-height` - Instant spanning
2. `grid-minmax` - Better responsive control
3. `grid-place` - Concise alignment
4. `grid-layer` - Overlay elements
5. `grid-auto-flow` - Control item placement

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
**Current Version:** 1.2.0  
**Last Updated:** January 2, 2026