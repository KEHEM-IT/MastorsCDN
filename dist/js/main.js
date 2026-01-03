import { ComponentLoader } from './component-loader.js';
import { Router } from './router.js';
import { Prefetcher } from './prefetch.js';
import Navbar from './navbar.js';
class App {
    constructor() {
        this.navbar = null;
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
            this.registerRoutes();
            this.initThemeToggle();
            this.initSmoothScroll();
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
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new App());
}
else {
    new App();
}
