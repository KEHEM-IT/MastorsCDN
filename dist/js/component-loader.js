export class ComponentLoader {
    constructor() {
        this.cache = new Map();
        this.loadingBar = null;
        this.loadedCount = 0;
        this.totalCount = 0;
        this.loadingBar = document.getElementById('loading-bar');
    }
    async loadComponents(configs) {
        this.totalCount = configs.length;
        this.loadedCount = 0;
        this.showLoadingBar();
        const promises = configs.map(config => this.loadComponent(config));
        try {
            await Promise.all(promises);
            await this.hideLoadingBar();
        }
        catch (error) {
            console.error('Error loading components:', error);
            await this.hideLoadingBar();
        }
    }
    async loadComponent(config) {
        const target = document.querySelector(config.selector);
        if (!target) {
            console.warn(`Selector not found: ${config.selector}`);
            this.updateProgress();
            return;
        }
        try {
            const html = await this.fetchComponent(config.path);
            target.innerHTML = html;
            this.updateProgress();
        }
        catch (error) {
            console.error(`Failed to load component: ${config.path}`, error);
            this.updateProgress();
        }
    }
    async fetchComponent(path) {
        if (this.cache.has(path)) {
            return this.cache.get(path);
        }
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        this.cache.set(path, html);
        return html;
    }
    updateProgress() {
        this.loadedCount++;
        const progress = (this.loadedCount / this.totalCount) * 100;
        if (this.loadingBar) {
            const bar = this.loadingBar.querySelector('.loading-bar__fill');
            if (bar) {
                bar.style.width = `${progress}%`;
            }
        }
    }
    showLoadingBar() {
        if (this.loadingBar) {
            this.loadingBar.classList.add('active');
            const bar = this.loadingBar.querySelector('.loading-bar__fill');
            if (bar) {
                bar.style.width = '0%';
            }
        }
    }
    hideLoadingBar() {
        return new Promise((resolve) => {
            if (this.loadingBar) {
                const bar = this.loadingBar.querySelector('.loading-bar__fill');
                if (bar) {
                    bar.style.width = '100%';
                }
                setTimeout(() => {
                    this.loadingBar?.classList.remove('active');
                    resolve();
                }, 300);
            }
            else {
                resolve();
            }
        });
    }
    prefetch(path) {
        if (!this.cache.has(path)) {
            this.fetchComponent(path).catch(err => {
                console.warn(`Prefetch failed for ${path}:`, err);
            });
        }
    }
    clearCache() {
        this.cache.clear();
    }
}
