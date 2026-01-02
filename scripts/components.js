"use strict";
// ============================================
// Component Loader System
// Loads HTML components (header, footer) into pages
// ============================================
class ComponentLoader {
    constructor() {
        this.components = [
            { selector: '[data-component="header"]', path: 'components/header.html' },
            { selector: '[data-component="footer"]', path: 'components/footer.html' }
        ];
        this.init();
    }
    async init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.loadComponents());
        }
        else {
            await this.loadComponents();
        }
    }
    async loadComponents() {
        const loadPromises = this.components.map(config => this.loadComponent(config.selector, config.path));
        try {
            await Promise.all(loadPromises);
            console.log('✅ Components loaded successfully');
            // Dispatch custom event when components are loaded
            document.dispatchEvent(new CustomEvent('componentsLoaded'));
        }
        catch (error) {
            console.error('❌ Error loading components:', error);
        }
    }
    async loadComponent(selector, path) {
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) {
            return;
        }
        try {
            const response = await fetch(path);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const html = await response.text();
            elements.forEach(element => {
                element.innerHTML = html;
            });
        }
        catch (error) {
            console.error(`Failed to load component from ${path}:`, error);
            throw error;
        }
    }
}
// Initialize component loader
new ComponentLoader();
//# sourceMappingURL=components.js.map