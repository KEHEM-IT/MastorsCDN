// src/ts/main.ts

import { ComponentLoader } from './component-loader.js';
import { Router } from './router.js';
import { Prefetcher } from './prefetch.js';
import Navbar from './navbar.js';
import { CarouselSlider } from './carousel-slider.js';
import { Tabs } from './tabs.js';

class App {
    private loader: ComponentLoader;
    private router: Router;
    private prefetcher: Prefetcher;
    private navbar: Navbar | null = null;
    private carousel: CarouselSlider | null = null;
    private tabs: Tabs | null = null;

    constructor() {
        this.loader = new ComponentLoader();
        this.router = new Router();
        this.prefetcher = new Prefetcher(150);
        this.init();
    }

    private async init(): Promise<void> {
        // Show initial loading state
        document.body.classList.add('loading');

        try {
            // Load components
            await this.loader.loadComponents([
                { selector: '#header-slot', path: 'components/header.html' },
                { selector: '#nav-slot', path: 'components/nav.html' },
                { selector: '#footer-slot', path: 'components/footer.html' }
            ]);

            // Initialize navbar after nav component is loaded
            this.navbar = new Navbar();

            // Initialize carousel slider
            this.initCarousel();

            // Initialize tabs
            this.initTabs();

            // Register routes
            this.registerRoutes();

            // Initialize features
            this.initThemeToggle();
            this.initSmoothScroll();
            this.initCopyButtons();

            // Remove loading state
            document.body.classList.remove('loading');
            document.body.classList.add('loaded');

            console.log('✓ App initialized successfully');
        } catch (error) {
            console.error('Failed to initialize app:', error);
            document.body.classList.remove('loading');
            document.body.classList.add('error');
        }
    }

    private initTabs(): void {
        // Initialize tabs with custom options
        this.tabs = new Tabs({
            containerSelector: '.code-tabs',
            tabSelector: '.code-tab',
            panelSelector: '.code-panel',
            activeClass: 'active',
            transitionDuration: 300,
            
        });

        // Reinitialize tabs on route change if needed
        this.router.on('routeChanged', () => {
            if (this.tabs) {
                setTimeout(() => {
                    this.tabs?.refresh();
                }, 100);
            }
        });
    }

    private initCarousel(): void {
        // Initialize carousel with a slight delay to ensure DOM is ready
        setTimeout(() => {
            this.carousel = new CarouselSlider('.showcase-slider');
        }, 100);

        // Reinitialize carousel on route change if needed
        this.router.on('routeChanged', () => {
            const showcaseSection = document.getElementById('showcase');
            if (showcaseSection && !this.carousel) {
                this.carousel = new CarouselSlider('.showcase-slider');
            }
        });
    }

    private registerRoutes(): void {
        this.router.register('home', {
            path: 'home',
            title: 'MastorsCDN - Modern CSS Utility Library'
        });

        this.router.register('features', {
            path: 'features',
            title: 'Features - MastorsCDN'
        });

        this.router.register('libraries', {
            path: 'libraries',
            title: 'Libraries - MastorsCDN'
        });

        this.router.register('documentation', {
            path: 'documentation',
            title: 'Documentation - MastorsCDN'
        });

        this.router.register('showcase', {
            path: 'showcase',
            title: 'Showcase - MastorsCDN'
        });

        this.router.register('about', {
            path: 'about',
            title: 'About - MastorsCDN'
        });

        this.router.register('get-started', {
            path: 'get-started',
            title: 'Get Started - MastorsCDN'
        });
    }

    private initThemeToggle(): void {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);

        document.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            if (target.closest('.theme-toggle')) {
                const current = document.documentElement.getAttribute('data-theme');
                const newTheme = current === 'dark' ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
            }
        });
    }

    private initSmoothScroll(): void {
        document.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            const link = target.closest('a[href^="#"]') as HTMLAnchorElement;

            if (link) {
                const href = link.getAttribute('href');
                if (href && href.includes('#') && !href.startsWith('#')) {
                    e.preventDefault();
                    const id = href.split('#')[1];
                    const element = document.getElementById(id);

                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }
        });
    }

    private initCopyButtons(): void {
        document.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            const copyBtn = target.closest('.copy-btn') as HTMLButtonElement;

            if (copyBtn) {
                const textToCopy = copyBtn.dataset.copy || '';

                navigator.clipboard.writeText(textToCopy).then(() => {
                    const icon = copyBtn.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-copy');
                        icon.classList.add('fa-check');

                        setTimeout(() => {
                            icon.classList.remove('fa-check');
                            icon.classList.add('fa-copy');
                        }, 2000);
                    }
                }).catch(err => {
                    console.error('Failed to copy:', err);
                });
            }
        });
    }

    // Public methods to control components from outside if needed
    public getCarousel(): CarouselSlider | null {
        return this.carousel;
    }

    public getTabs(): Tabs | null {
        return this.tabs;
    }

    public destroyCarousel(): void {
        if (this.carousel) {
            this.carousel.destroy();
            this.carousel = null;
        }
    }

    public destroyTabs(): void {
        if (this.tabs) {
            this.tabs.destroy();
            this.tabs = null;
        }
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new App());
} else {
    new App();
}

// Export for potential external use
export default App;