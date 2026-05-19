// src/ts/prefetch.ts

export class Prefetcher {
    private prefetched: Set<string> = new Set();
    private cache: Map<string, string> = new Map();
    private hoverDelay: number = 100;
    private hoverTimer: number | null = null;

    constructor(hoverDelay: number = 100) {
        this.hoverDelay = hoverDelay;
        this.init();
    }

    private init(): void {
        // Prefetch on hover with delay
        document.addEventListener('mouseover', (e) => {
            const target = e.target as HTMLElement;
            const link = target.closest('a[href]') as HTMLAnchorElement;

            if (link) {
                const href = link.getAttribute('href');
                if (href && this.shouldPrefetch(href)) {
                    this.schedulePrefetch(href);
                }
            }
        });

        document.addEventListener('mouseout', (e) => {
            const target = e.target as HTMLElement;
            const link = target.closest('a[href]');

            if (link && this.hoverTimer) {
                clearTimeout(this.hoverTimer);
                this.hoverTimer = null;
            }
        });

        // Prefetch visible links on idle
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => this.prefetchVisible());
        } else {
            setTimeout(() => this.prefetchVisible(), 2000);
        }
    }

    private shouldPrefetch(href: string): boolean {
        // Don't prefetch external links or already prefetched
        if (href.includes('://') ||
            href.startsWith('mailto:') ||
            href.startsWith('tel:') ||
            this.prefetched.has(href)) {
            return false;
        }
        return true;
    }

    private schedulePrefetch(href: string): void {
        if (this.hoverTimer) {
            clearTimeout(this.hoverTimer);
        }

        this.hoverTimer = window.setTimeout(() => {
            this.prefetch(href);
            this.hoverTimer = null;
        }, this.hoverDelay);
    }

    private async prefetch(href: string): Promise<void> {
        if (this.prefetched.has(href) || this.cache.has(href)) {
            return;
        }

        this.prefetched.add(href);

        try {
            // If it's a hash link, no need to fetch
            if (href.startsWith('#')) {
                return;
            }

            const response = await fetch(href, {
                method: 'GET',
                priority: 'low'
            } as RequestInit);

            if (response.ok) {
                const content = await response.text();
                this.cache.set(href, content);
                console.log(`Prefetched: ${href}`);
            }
        } catch (error) {
            console.warn(`Failed to prefetch ${href}:`, error);
            this.prefetched.delete(href);
        }
    }

    private prefetchVisible(): void {
        const links = document.querySelectorAll('a[href]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const link = entry.target as HTMLAnchorElement;
                    const href = link.getAttribute('href');

                    if (href && this.shouldPrefetch(href)) {
                        this.prefetch(href);
                    }

                    observer.unobserve(link);
                }
            });
        }, {
            rootMargin: '50px'
        });

        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href && this.shouldPrefetch(href)) {
                observer.observe(link);
            }
        });
    }

    getCache(): Map<string, string> {
        return this.cache;
    }

    clearCache(): void {
        this.cache.clear();
        this.prefetched.clear();
    }
}