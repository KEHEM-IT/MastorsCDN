export class Tabs {
    constructor(options = {}) {
        this.activeTransitions = new Map();
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
    init() {
        if (this.containers.length === 0) {
            console.warn('No tab containers found');
            return;
        }
        this.containers.forEach(container => {
            this.setupTabContainer(container);
        });
        console.log(`✓ Tabs initialized (${this.containers.length} container(s))`);
    }
    setupTabContainer(container) {
        const tabs = container.querySelectorAll(this.options.tabSelector);
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => this.handleTabClick(e, container));
        });
        const activeTab = container.querySelector(`.${this.options.tabSelector.replace('.', '')}.${this.options.activeClass}`);
        if (!activeTab && tabs.length > 0) {
            this.activateTab(tabs[0], container, false);
        }
    }
    handleTabClick(e, container) {
        e.preventDefault();
        const tab = e.currentTarget;
        if (this.activeTransitions.get(container)) {
            return;
        }
        this.activateTab(tab, container, true);
    }
    activateTab(tab, container, animate = true) {
        const tabId = tab.dataset.tab;
        if (!tabId)
            return;
        const contentContainer = this.findContentContainer(container);
        if (!contentContainer)
            return;
        const targetPanel = contentContainer.querySelector(`[data-panel="${tabId}"]`);
        if (!targetPanel)
            return;
        const allTabs = container.querySelectorAll(this.options.tabSelector);
        const allPanels = contentContainer.querySelectorAll(this.options.panelSelector);
        if (tab.classList.contains(this.options.activeClass) && animate) {
            return;
        }
        this.activeTransitions.set(container, true);
        allTabs.forEach(t => t.classList.remove(this.options.activeClass));
        tab.classList.add(this.options.activeClass);
        if (animate) {
            this.animatePanelSwitch(allPanels, targetPanel, () => {
                this.activeTransitions.set(container, false);
                this.options.onTabChange(tabId, targetPanel);
            });
        }
        else {
            allPanels.forEach(p => p.classList.remove(this.options.activeClass));
            targetPanel.classList.add(this.options.activeClass);
            this.activeTransitions.set(container, false);
            this.options.onTabChange(tabId, targetPanel);
        }
    }
    animatePanelSwitch(allPanels, targetPanel, onComplete) {
        const currentPanel = Array.from(allPanels).find(p => p.classList.contains(this.options.activeClass));
        if (!currentPanel) {
            targetPanel.classList.add(this.options.activeClass);
            onComplete();
            return;
        }
        if (currentPanel === targetPanel) {
            onComplete();
            return;
        }
        currentPanel.classList.add('transitioning-out');
        targetPanel.classList.add('transitioning-in');
        currentPanel.style.opacity = '0';
        currentPanel.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            currentPanel.classList.remove(this.options.activeClass, 'transitioning-out');
            currentPanel.style.opacity = '';
            currentPanel.style.transform = '';
            targetPanel.classList.add(this.options.activeClass);
            targetPanel.style.opacity = '0';
            targetPanel.style.transform = 'translateY(10px)';
            targetPanel.offsetHeight;
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
    findContentContainer(tabContainer) {
        let contentContainer = tabContainer.nextElementSibling;
        if (contentContainer && contentContainer.classList.contains('code-content')) {
            return contentContainer;
        }
        const parent = tabContainer.parentElement;
        if (parent) {
            contentContainer = parent.querySelector('.code-content');
            if (contentContainer)
                return contentContainer;
        }
        return tabContainer.parentElement;
    }
    switchToTab(containerId, tabId) {
        const container = document.querySelector(`#${containerId} ${this.options.containerSelector}`)
            || document.querySelector(this.options.containerSelector);
        if (!container)
            return;
        const tab = container.querySelector(`${this.options.tabSelector}[data-tab="${tabId}"]`);
        if (tab) {
            this.activateTab(tab, container, true);
        }
    }
    getActiveTab(containerIndex = 0) {
        if (containerIndex >= this.containers.length)
            return null;
        const container = this.containers[containerIndex];
        const activeTab = container.querySelector(`${this.options.tabSelector}.${this.options.activeClass}`);
        return activeTab?.dataset.tab || null;
    }
    destroy() {
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
    refresh() {
        this.destroy();
        this.containers = document.querySelectorAll(this.options.containerSelector);
        this.init();
    }
}
