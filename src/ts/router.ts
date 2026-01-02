// src/ts/router.ts

export interface Route {
    path: string;
    title: string;
    guard?: () => boolean;
}

export class Router {
    private routes: Map<string, Route> = new Map();
    private currentPath: string = '';
    private transitionElement: HTMLElement | null = null;

    constructor() {
        this.transitionElement = document.getElementById('page-transition');
        this.init();
    }

    register(path: string, route: Route): void {
        this.routes.set(path, route);
    }

    private init(): void {
        window.addEventListener('hashchange', () => this.handleRoute());
        window.addEventListener('load', () => this.handleRoute());

        // Intercept link clicks
        document.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            const link = target.closest('a[href^="#"]') as HTMLAnchorElement;

            if (link && !link.getAttribute('href')?.includes('://')) {
                e.preventDefault();
                const hash = link.getAttribute('href') || '#home';
                this.navigate(hash);
            }
        });
    }

    private async handleRoute(): Promise<void> {
        const hash = window.location.hash || '#home';
        const path = hash.slice(1);

        if (this.currentPath === path) return;

        const route = this.routes.get(path) || this.routes.get('home');

        if (!route) {
            console.error(`Route not found: ${path}`);
            return;
        }

        // Route guard
        if (route.guard && !route.guard()) {
            this.navigate('#home');
            return;
        }

        // Start transition
        await this.startTransition();

        // Update title
        document.title = route.title;

        // Update active nav
        this.updateActiveNav(path);

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });

        // End transition
        this.currentPath = path;
        await this.endTransition();
    }

    private startTransition(): Promise<void> {
        return new Promise((resolve) => {
            if (this.transitionElement) {
                this.transitionElement.classList.add('active');
                setTimeout(resolve, 150);
            } else {
                resolve();
            }
        });
    }

    private endTransition(): Promise<void> {
        return new Promise((resolve) => {
            if (this.transitionElement) {
                setTimeout(() => {
                    this.transitionElement?.classList.remove('active');
                    resolve();
                }, 150);
            } else {
                resolve();
            }
        });
    }

    private updateActiveNav(currentPath: string): void {
        document.querySelectorAll('nav a').forEach((link) => {
            const href = link.getAttribute('href');
            if (href) {
                const linkPath = href.slice(1);
                if (linkPath === currentPath) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    }

    navigate(hash: string): void {
        window.location.hash = hash;
    }

    getCurrentPath(): string {
        return this.currentPath;
    }
}