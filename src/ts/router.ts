// src/ts/router.ts

export interface Route {
    path: string;
    title: string;
    guard?: () => boolean;
}

type EventCallback = (data?: any) => void;

export class Router {
    private routes: Map<string, Route> = new Map();
    private currentPath: string = '';
    private transitionElement: HTMLElement | null = null;
    private events: Map<string, EventCallback[]> = new Map();

    constructor() {
        this.transitionElement = document.getElementById('page-transition');
        this.init();
    }

    register(path: string, route: Route): void {
        this.routes.set(path, route);
    }

    // Event emitter methods
    on(event: string, callback: EventCallback): void {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event)?.push(callback);
    }

    off(event: string, callback: EventCallback): void {
        const callbacks = this.events.get(event);
        if (callbacks) {
            const index = callbacks.indexOf(callback);
            if (index > -1) {
                callbacks.splice(index, 1);
            }
        }
    }

    private emit(event: string, data?: any): void {
        const callbacks = this.events.get(event);
        if (callbacks) {
            callbacks.forEach(callback => callback(data));
        }
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

        // Emit before route change
        this.emit('beforeRouteChange', { from: this.currentPath, to: path });

        // Start transition
        await this.startTransition();

        // Update title
        document.title = route.title;

        // Update active nav
        this.updateActiveNav(path);

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });

        // Update current path
        const previousPath = this.currentPath;
        this.currentPath = path;

        // End transition
        await this.endTransition();

        // Emit after route change
        this.emit('routeChanged', { from: previousPath, to: path });
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

    // Cleanup method
    destroy(): void {
        this.events.clear();
        this.routes.clear();
    }
}