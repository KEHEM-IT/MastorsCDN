// src/ts/tabs.ts

export interface TabOptions {
    containerSelector?: string;
    tabSelector?: string;
    panelSelector?: string;
    activeClass?: string;
    transitionDuration?: number;
    onTabChange?: (tabId: string, panel: HTMLElement) => void;
}

export class Tabs {
    private containers: NodeListOf<Element>;
    private options: Required<TabOptions>;
    private activeTransitions: Map<Element, boolean> = new Map();

    constructor(options: TabOptions = {}) {
        this.options = {
            containerSelector: options.containerSelector || '.code-tabs',
            tabSelector: options.tabSelector || '.code-tab',
            panelSelector: options.panelSelector || '.code-panel',
            activeClass: options.activeClass || 'active',
            transitionDuration: options.transitionDuration || 300,
            onTabChange: options.onTabChange || (() => { })
        };

        this.containers = document.querySelectorAll(this.options.containerSelector);
        this.init();
    }

    private init(): void {
        if (this.containers.length === 0) {
            console.warn('No tab containers found');
            return;
        }

        this.containers.forEach(container => {
            this.setupTabContainer(container);
        });

        console.log(`✓ Tabs initialized (${this.containers.length} container(s))`);
    }

    private setupTabContainer(container: Element): void {
        const tabs = container.querySelectorAll(this.options.tabSelector);

        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => this.handleTabClick(e, container));
        });

        // Initialize first tab if none is active
        const activeTab = container.querySelector(`.${this.options.tabSelector.replace('.', '')}.${this.options.activeClass}`);
        if (!activeTab && tabs.length > 0) {
            this.activateTab(tabs[0] as HTMLElement, container, false);
        }
    }

    private handleTabClick(e: Event, container: Element): void {
        e.preventDefault();
        const tab = e.currentTarget as HTMLElement;

        // Prevent multiple rapid clicks during transition
        if (this.activeTransitions.get(container)) {
            return;
        }

        this.activateTab(tab, container, true);
    }

    private activateTab(tab: HTMLElement, container: Element, animate: boolean = true): void {
        const tabId = tab.dataset.tab;
        if (!tabId) return;

        // Find the content container (usually next sibling or defined parent)
        const contentContainer = this.findContentContainer(container);
        if (!contentContainer) return;

        const targetPanel = contentContainer.querySelector(`[data-panel="${tabId}"]`) as HTMLElement;
        if (!targetPanel) return;

        // Get all tabs and panels
        const allTabs = container.querySelectorAll(this.options.tabSelector);
        const allPanels = contentContainer.querySelectorAll(this.options.panelSelector);

        // Check if tab is already active
        if (tab.classList.contains(this.options.activeClass) && animate) {
            return;
        }

        // Set transition flag
        this.activeTransitions.set(container, true);

        // Deactivate all tabs
        allTabs.forEach(t => t.classList.remove(this.options.activeClass));

        // Activate clicked tab
        tab.classList.add(this.options.activeClass);

        if (animate) {
            // Animate panel transition
            this.animatePanelSwitch(allPanels, targetPanel, () => {
                this.activeTransitions.set(container, false);
                this.options.onTabChange(tabId, targetPanel);
            });
        } else {
            // Instant switch (no animation)
            allPanels.forEach(p => p.classList.remove(this.options.activeClass));
            targetPanel.classList.add(this.options.activeClass);
            this.activeTransitions.set(container, false);
            this.options.onTabChange(tabId, targetPanel);
        }
    }

    private animatePanelSwitch(
        allPanels: NodeListOf<Element>,
        targetPanel: HTMLElement,
        onComplete: () => void
    ): void {
        const currentPanel = Array.from(allPanels).find(p =>
            p.classList.contains(this.options.activeClass)
        ) as HTMLElement;

        if (!currentPanel) {
            // No current panel, just show target
            targetPanel.classList.add(this.options.activeClass);
            onComplete();
            return;
        }

        if (currentPanel === targetPanel) {
            onComplete();
            return;
        }

        // Add transitioning class
        currentPanel.classList.add('transitioning-out');
        targetPanel.classList.add('transitioning-in');

        // Fade out current panel
        currentPanel.style.opacity = '0';
        currentPanel.style.transform = 'translateY(-10px)';

        setTimeout(() => {
            // Switch active class
            currentPanel.classList.remove(this.options.activeClass, 'transitioning-out');
            currentPanel.style.opacity = '';
            currentPanel.style.transform = '';

            targetPanel.classList.add(this.options.activeClass);

            // Prepare target panel for fade in
            targetPanel.style.opacity = '0';
            targetPanel.style.transform = 'translateY(10px)';

            // Trigger reflow
            targetPanel.offsetHeight;

            // Fade in target panel
            requestAnimationFrame(() => {
                targetPanel.style.opacity = '1';
                targetPanel.style.transform = 'translateY(0)';
            });

            setTimeout(() => {
                targetPanel.classList.remove('transitioning-in');
                targetPanel.style.opacity = '';
                targetPanel.style.transform = '';
                onComplete();
            }, this.options.transitionDuration);

        }, this.options.transitionDuration);
    }

    private findContentContainer(tabContainer: Element): Element | null {
        // Try to find content container as next sibling
        let contentContainer = tabContainer.nextElementSibling;

        if (contentContainer && contentContainer.classList.contains('code-content')) {
            return contentContainer;
        }

        // Try to find within parent
        const parent = tabContainer.parentElement;
        if (parent) {
            contentContainer = parent.querySelector('.code-content');
            if (contentContainer) return contentContainer;
        }

        // Use the same parent as tab container
        return tabContainer.parentElement;
    }

    // Public API methods
    public switchToTab(containerId: string, tabId: string): void {
        const container = document.querySelector(`#${containerId} ${this.options.containerSelector}`)
            || document.querySelector(this.options.containerSelector);

        if (!container) return;

        const tab = container.querySelector(`${this.options.tabSelector}[data-tab="${tabId}"]`) as HTMLElement;
        if (tab) {
            this.activateTab(tab, container, true);
        }
    }

    public getActiveTab(containerIndex: number = 0): string | null {
        if (containerIndex >= this.containers.length) return null;

        const container = this.containers[containerIndex];
        const activeTab = container.querySelector(`${this.options.tabSelector}.${this.options.activeClass}`) as HTMLElement;

        return activeTab?.dataset.tab || null;
    }

    public destroy(): void {
        this.containers.forEach(container => {
            const tabs = container.querySelectorAll(this.options.tabSelector);
            tabs.forEach(tab => {
                const newTab = tab.cloneNode(true);
                tab.parentNode?.replaceChild(newTab, tab);
            });
        });

        this.activeTransitions.clear();
        console.log('✓ Tabs destroyed');
    }

    public refresh(): void {
        this.destroy();
        this.containers = document.querySelectorAll(this.options.containerSelector);
        this.init();
    }
}