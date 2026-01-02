export class Router {
    constructor() {
        this.routes = new Map();
        this.currentPath = '';
        this.transitionElement = null;
        this.transitionElement = document.getElementById('page-transition');
        this.init();
    }
    register(path, route) {
        this.routes.set(path, route);
    }
    init() {
        window.addEventListener('hashchange', () => this.handleRoute());
        window.addEventListener('load', () => this.handleRoute());
        document.addEventListener('click', (e) => {
            const target = e.target;
            const link = target.closest('a[href^="#"]');
            if (link && !link.getAttribute('href')?.includes('://')) {
                e.preventDefault();
                const hash = link.getAttribute('href') || '#home';
                this.navigate(hash);
            }
        });
    }
    async handleRoute() {
        const hash = window.location.hash || '#home';
        const path = hash.slice(1);
        if (this.currentPath === path)
            return;
        const route = this.routes.get(path) || this.routes.get('home');
        if (!route) {
            console.error(`Route not found: ${path}`);
            return;
        }
        if (route.guard && !route.guard()) {
            this.navigate('#home');
            return;
        }
        await this.startTransition();
        document.title = route.title;
        this.updateActiveNav(path);
        window.scrollTo({ top: 0, behavior: 'instant' });
        this.currentPath = path;
        await this.endTransition();
    }
    startTransition() {
        return new Promise((resolve) => {
            if (this.transitionElement) {
                this.transitionElement.classList.add('active');
                setTimeout(resolve, 150);
            }
            else {
                resolve();
            }
        });
    }
    endTransition() {
        return new Promise((resolve) => {
            if (this.transitionElement) {
                setTimeout(() => {
                    this.transitionElement?.classList.remove('active');
                    resolve();
                }, 150);
            }
            else {
                resolve();
            }
        });
    }
    updateActiveNav(currentPath) {
        document.querySelectorAll('nav a').forEach((link) => {
            const href = link.getAttribute('href');
            if (href) {
                const linkPath = href.slice(1);
                if (linkPath === currentPath) {
                    link.classList.add('active');
                }
                else {
                    link.classList.remove('active');
                }
            }
        });
    }
    navigate(hash) {
        window.location.hash = hash;
    }
    getCurrentPath() {
        return this.currentPath;
    }
}
