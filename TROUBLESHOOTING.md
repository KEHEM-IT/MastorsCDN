# Troubleshooting Guide

Common issues and their solutions for MastorsCDN development.

---

## 🔴 SCSS/Sass Issues

### Error: "Can't find stylesheet to import"

```
Error: Can't find stylesheet to import.
  @use 'mastors-fluider/mastors-fluider' as *;
```

**Cause:** Sass can't locate the npm packages in `node_modules`.

**Solutions:**

1. **✅ Recommended:** Use the updated npm scripts (already fixed in `package.json`):
   ```bash
   npm run scss:build
   # or
   npm run scss:watch
   ```

2. **Alternative 1:** Use relative paths in `mastorscdn.scss`:
   ```scss
   @use '../node_modules/mastors-fluider/mastors-fluider' as *;
   @use '../node_modules/mastors-gridder/mastors-gridder' as *;
   ```

3. **Alternative 2:** Use legacy `@import`:
   ```scss
   @import '../node_modules/mastors-fluider/mastors-fluider';
   @import '../node_modules/mastors-gridder/mastors-gridder';
   ```

4. **Alternative 3:** Manually specify load path:
   ```bash
   sass --load-path=node_modules styles/mastorscdn.scss styles/mastorscdn.css
   ```

### Error: "@use rules must be written before any other rules"

**Cause:** You're mixing `@use` with `@import`, or have CSS rules before `@use` statements.

**Solution:** 
- Put all `@use` statements at the very top of the file
- Convert all `@import` to `@use` or keep them all as `@import`
- Don't mix both syntaxes

```scss
// ✅ CORRECT
@use 'mastors-fluider/mastors-fluider' as *;
@use 'mastors-gridder/mastors-gridder' as *;

// Then your styles...
.container { ... }

// ❌ INCORRECT
.container { ... }
@use 'mastors-fluider/mastors-fluider' as *;  // Too late!
```

### Error: "Module not found: 'sass'"

**Cause:** Sass dependency not installed.

**Solution:**
```bash
npm install sass --save-dev
```

---

## 🔴 TypeScript Issues

### Error: "';' expected.ts(1005)"

**Cause:** Syntax error or missing type declarations for external libraries.

**Solutions:**

1. **✅ Add `globals.d.ts`** (already provided):
   ```typescript
   // scripts/globals.d.ts
   declare class Swiper { ... }
   declare const Prism: { ... };
   ```

2. **Check for actual syntax errors:**
   - Missing semicolons
   - Unclosed brackets `{`, `(`, `[`
   - Incorrect interface syntax

3. **Verify tsconfig.json includes the declaration file:**
   ```json
   {
     "include": [
       "scripts/**/*.ts",
       "scripts/**/*.d.ts"
     ]
   }
   ```

### Error: "Cannot find name 'Swiper'" or "Cannot find name 'Prism'"

**Cause:** Missing type declarations for CDN libraries.

**Solution:** Ensure `scripts/globals.d.ts` exists with proper declarations (already provided).

### Error: "Property does not exist on type"

**Cause:** TypeScript strict mode catching potential runtime errors.

**Solutions:**

1. **Use type assertion:**
   ```typescript
   const element = document.querySelector('.my-class') as HTMLElement;
   ```

2. **Use optional chaining:**
   ```typescript
   const value = element?.dataset?.copy;
   ```

3. **Add proper null checks:**
   ```typescript
   if (element && element.dataset) {
     const value = element.dataset.copy;
   }
   ```

### Error: "Module not found: 'typescript'"

**Cause:** TypeScript dependency not installed.

**Solution:**
```bash
npm install typescript --save-dev
```

---

## 🔴 Build Issues

### Error: "npm run build fails"

**Diagnostics:**
```bash
# Test SCSS compilation separately
npm run scss:build

# Test TypeScript compilation separately
npm run ts:build
```

**Common fixes:**
1. Delete `node_modules` and reinstall:
   ```bash
   rm -rf node_modules
   npm install
   ```

2. Clear npm cache:
   ```bash
   npm cache clean --force
   npm install
   ```

3. Check Node.js version (needs v16+):
   ```bash
   node --version
   ```

### Watch Mode Not Working

**Issue:** Files not recompiling on save.

**Solutions:**

1. **Kill and restart watch:**
   ```bash
   # Press Ctrl+C to stop
   npm run watch
   ```

2. **Check file paths:**
   - Ensure you're editing files in `styles/` for SCSS
   - Ensure you're editing files in `scripts/` for TypeScript

3. **Use separate watch processes:**
   ```bash
   # Terminal 1
   npm run scss:watch
   
   # Terminal 2
   npm run ts:watch
   ```

---

## 🔴 Runtime Issues

### Swiper Slider Not Working

**Diagnostics:**
1. Check browser console for errors
2. Verify Swiper CDN is loaded
3. Check element exists with class `.showcase-slider`

**Solution:**
```html
<!-- Ensure CDN is loaded BEFORE script.js -->
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
<script src="scripts/script.js"></script>
```

### Prism Syntax Highlighting Not Working

**Diagnostics:**
1. Check Prism CDN is loaded
2. Verify code blocks have proper classes: `language-scss`, `language-javascript`, etc.

**Solution:**
```html
<!-- Load Prism CSS and JS -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-scss.min.js"></script>
```

### Mobile Menu Not Working

**Check:**
1. JavaScript is loaded and running
2. Event listeners are attached
3. Classes are toggling in DevTools

**Debug:**
```javascript
// Add to script.js temporarily
console.log('Navigation initialized');
navToggle.addEventListener('click', () => {
  console.log('Menu toggle clicked');
});
```

---

## 🔴 Style Issues

### Styles Not Applying

**Diagnostics:**
1. Check if CSS file is compiled: `styles/mastorscdn.css` should exist
2. Verify CSS is linked in HTML:
   ```html
   <link rel="stylesheet" href="styles/mastorscdn.css">
   ```
3. Check browser DevTools for 404 errors

**Solution:**
```bash
# Recompile CSS
npm run scss:build

# Check output file
ls -lh styles/mastorscdn.css
```

### Fluid Typography Not Scaling

**Cause:** Mastors Fluider mixins not being applied.

**Check:**
1. Verify imports are working in `mastorscdn.scss`
2. Check compiled CSS includes `clamp()` functions:
   ```css
   font-size: clamp(2rem, 2vw + 1rem, 4rem);
   ```

**Solution:** Rebuild SCSS:
```bash
npm run scss:build
```

---

## 🔴 npm/Node Issues

### "Cannot find module" errors

**Solution:**
```bash
# Reinstall all dependencies
rm -rf node_modules package-lock.json
npm install
```

### Permission errors (EACCES)

**Solution (Linux/Mac):**
```bash
sudo npm install
# or fix npm permissions:
# https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally
```

**Solution (Windows):**
- Run terminal as Administrator
- Or use `npm install --no-optional`

---

## 📞 Still Having Issues?

1. **Check the documentation:**
   - [Mastors Fluider Docs](https://kehem-it.github.io/Mastors-Fluider/)
   - [Mastors Gridder Docs](https://kehem-it.github.io/Mastors-Gridder/)

2. **GitHub Issues:**
   - [Report a bug](https://github.com/KEHEM-IT/MastorsCDN/issues)

3. **Clean slate approach:**
   ```bash
   # Start fresh
   rm -rf node_modules package-lock.json
   rm -f styles/mastorscdn.css scripts/script.js
   npm install
   npm run build
   ```

---

## ✅ Verification Checklist

After fixing issues, verify everything works:

- [ ] `npm install` completes without errors
- [ ] `npm run scss:build` generates `styles/mastorscdn.css`
- [ ] `npm run ts:build` generates `scripts/script.js`
- [ ] Opening `index.html` in browser shows styled page
- [ ] No console errors in browser DevTools
- [ ] Mobile menu works (test by resizing browser)
- [ ] Code snippets have syntax highlighting
- [ ] Showcase slider works
- [ ] Copy buttons work on code examples

---

**Last Updated:** January 2026  
**MastorsCDN Version:** 1.0.0