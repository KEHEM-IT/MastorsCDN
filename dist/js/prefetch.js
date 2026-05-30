export class Prefetcher {
    constructor(hoverDelay = 100) {
        this.prefetched = new Set();
        this.cache = new Map();
        this.hoverDelay = 100;
        this.hoverTimer = null;
        this.hoverDelay = hoverDelay;
        this.init();
    }
    init() {
        document.addEventListener('mouseover', (e) => {
            const target = e.target;
            const link = target.closest('a[href]');
            if (link) {
                const href = link.getAttribute('href');
                if (href && this.shouldPrefetch(href)) {
                    this.schedulePrefetch(href);
                }
            }
        });
        document.addEventListener('mouseout', (e) => {
            const target = e.target;
            const link = target.closest('a[href]');
            if (link && this.hoverTimer) {
                clearTimeout(this.hoverTimer);
                this.hoverTimer = null;
            }
        });
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => this.prefetchVisible());
        }
        else {
            setTimeout(() => this.prefetchVisible(), 2000);
        }
    }
    shouldPrefetch(href) {
        if (href.includes('://') ||
            href.startsWith('mailto:') ||
            href.startsWith('tel:') ||
            this.prefetched.has(href)) {
            return false;
        }
        return true;
    }
    schedulePrefetch(href) {
        if (this.hoverTimer) {
            clearTimeout(this.hoverTimer);
        }
        this.hoverTimer = window.setTimeout(() => {
            this.prefetch(href);
            this.hoverTimer = null;
        }, this.hoverDelay);
    }
    async prefetch(href) {
        if (this.prefetched.has(href) || this.cache.has(href)) {
            return;
        }
        this.prefetched.add(href);
        try {
            if (href.startsWith('#')) {
                return;
            }
            const response = await fetch(href, {
                method: 'GET',
                priority: 'low'
            });
            if (response.ok) {
                const content = await response.text();
                this.cache.set(href, content);
                console.log(`Prefetched: ${href}`);
            }
        }
        catch (error) {
            console.warn(`Failed to prefetch ${href}:`, error);
            this.prefetched.delete(href);
        }
    }
    prefetchVisible() {
        const links = document.querySelectorAll('a[href]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const link = entry.target;
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
    getCache() {
        return this.cache;
    }
    clearCache() {
        this.cache.clear();
        this.prefetched.clear();
    }
}
