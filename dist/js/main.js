import { ComponentLoader } from './component-loader.js';
import { Router } from './router.js';
import { Prefetcher } from './prefetch.js';
import Navbar from './navbar.js';
import { CarouselSlider } from './carousel-slider.js';
import { Tabs } from './tabs.js';
class App {
    constructor() {
        this.navbar = null;
        this.carousel = null;
        this.tabs = null;
        this.loader = new ComponentLoader();
        this.router = new Router();
        this.prefetcher = new Prefetcher(150);
        this.init();
    }
    async init() {
        document.body.classList.add('loading');
        try {
            await this.loader.loadComponents([
                { selector: '#header-slot', path: 'components/header.html' },
                { selector: '#nav-slot', path: 'components/nav.html' },
                { selector: '#footer-slot', path: 'components/footer.html' }
            ]);
            this.navbar = new Navbar();
            this.initCarousel();
            this.initTabs();
            this.registerRoutes();
            this.initThemeToggle();
            this.initSmoothScroll();
            this.initCopyButtons();
            document.body.classList.remove('loading');
            document.body.classList.add('loaded');
            console.log('✓ App initialized successfully');
        }
        catch (error) {
            console.error('Failed to initialize app:', error);
            document.body.classList.remove('loading');
            document.body.classList.add('error');
        }
    }
    initTabs() {
        this.tabs = new Tabs({
            containerSelector: '.code-tabs',
            tabSelector: '.code-tab',
            panelSelector: '.code-panel',
            activeClass: 'active',
            transitionDuration: 300,
        });
        this.router.on('routeChanged', () => {
            if (this.tabs) {
                setTimeout(() => {
                    this.tabs?.refresh();
                }, 100);
            }
        });
    }
    initCarousel() {
        setTimeout(() => {
            this.carousel = new CarouselSlider('.showcase-slider');
        }, 100);
        this.router.on('routeChanged', () => {
            const showcaseSection = document.getElementById('showcase');
            if (showcaseSection && !this.carousel) {
                this.carousel = new CarouselSlider('.showcase-slider');
            }
        });
    }
    registerRoutes() {
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
    initThemeToggle() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        document.addEventListener('click', (e) => {
            const target = e.target;
            if (target.closest('.theme-toggle')) {
                const current = document.documentElement.getAttribute('data-theme');
                const newTheme = current === 'dark' ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
            }
        });
    }
    initSmoothScroll() {
        document.addEventListener('click', (e) => {
            const target = e.target;
            const link = target.closest('a[href^="#"]');
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
    initCopyButtons() {
        document.addEventListener('click', (e) => {
            const target = e.target;
            const copyBtn = target.closest('.copy-btn');
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
    getCarousel() {
        return this.carousel;
    }
    getTabs() {
        return this.tabs;
    }
    destroyCarousel() {
        if (this.carousel) {
            this.carousel.destroy();
            this.carousel = null;
        }
    }
    destroyTabs() {
        if (this.tabs) {
            this.tabs.destroy();
            this.tabs = null;
        }
    }
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new App());
}
else {
    new App();
}
export default App;
