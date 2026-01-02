// ============================================
// Component Loader System
// Loads HTML components (header, footer) into pages
// ============================================

interface ComponentConfig {
    selector: string;
    path: string;
}

class ComponentLoader {
    private components: ComponentConfig[] = [
        { selector: '[data-component="header"]', path: 'components/header.html' },
        { selector: '[data-component="footer"]', path: 'components/footer.html' }
    ];

    constructor() {
        this.init();
    }

    private async init(): Promise<void> {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.loadComponents());
        } else {
            await this.loadComponents();
        }
    }

    private async loadComponents(): Promise<void> {
        const loadPromises = this.components.map(config =>
            this.loadComponent(config.selector, config.path)
        );

        try {
            await Promise.all(loadPromises);
            console.log('✅ Components loaded successfully');

            // Dispatch custom event when components are loaded
            document.dispatchEvent(new CustomEvent('componentsLoaded'));
        } catch (error) {
            console.error('❌ Error loading components:', error);
        }
    }

    private async loadComponent(selector: string, path: string): Promise<void> {
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
        } catch (error) {
            console.error(`Failed to load component from ${path}:`, error);
            throw error;
        }
    }
}

// Initialize component loader
new ComponentLoader();