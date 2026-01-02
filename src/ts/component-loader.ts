// src/ts/component-loader.ts

interface ComponentConfig {
    selector: string;
    path: string;
}

export class ComponentLoader {
    private cache: Map<string, string> = new Map();
    private loadingBar: HTMLElement | null = null;
    private loadedCount: number = 0;
    private totalCount: number = 0;

    constructor() {
        this.loadingBar = document.getElementById('loading-bar');
    }

    async loadComponents(configs: ComponentConfig[]): Promise<void> {
        this.totalCount = configs.length;
        this.loadedCount = 0;
        this.showLoadingBar();

        const promises = configs.map(config => this.loadComponent(config));

        try {
            await Promise.all(promises);
            await this.hideLoadingBar();
        } catch (error) {
            console.error('Error loading components:', error);
            await this.hideLoadingBar();
        }
    }

    private async loadComponent(config: ComponentConfig): Promise<void> {
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
        } catch (error) {
            console.error(`Failed to load component: ${config.path}`, error);
            this.updateProgress();
        }
    }

    private async fetchComponent(path: string): Promise<string> {
        // Check cache first
        if (this.cache.has(path)) {
            return this.cache.get(path)!;
        }

        const response = await fetch(path);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const html = await response.text();
        this.cache.set(path, html);

        return html;
    }

    private updateProgress(): void {
        this.loadedCount++;
        const progress = (this.loadedCount / this.totalCount) * 100;

        if (this.loadingBar) {
            const bar = this.loadingBar.querySelector('.loading-bar__fill') as HTMLElement;
            if (bar) {
                bar.style.width = `${progress}%`;
            }
        }
    }

    private showLoadingBar(): void {
        if (this.loadingBar) {
            this.loadingBar.classList.add('active');
            const bar = this.loadingBar.querySelector('.loading-bar__fill') as HTMLElement;
            if (bar) {
                bar.style.width = '0%';
            }
        }
    }

    private hideLoadingBar(): Promise<void> {
        return new Promise((resolve) => {
            if (this.loadingBar) {
                const bar = this.loadingBar.querySelector('.loading-bar__fill') as HTMLElement;
                if (bar) {
                    bar.style.width = '100%';
                }

                setTimeout(() => {
                    this.loadingBar?.classList.remove('active');
                    resolve();
                }, 300);
            } else {
                resolve();
            }
        });
    }

    // Prefetch component on hover
    prefetch(path: string): void {
        if (!this.cache.has(path)) {
            this.fetchComponent(path).catch(err => {
                console.warn(`Prefetch failed for ${path}:`, err);
            });
        }
    }

    clearCache(): void {
        this.cache.clear();
    }
}