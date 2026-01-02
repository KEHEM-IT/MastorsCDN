interface CodeTab {
    tab: HTMLElement;
    panel: HTMLElement;
}
declare class CodeTabs {
    private tabs;
    constructor();
    private init;
    private setupEventListeners;
    private switchTab;
}
declare class CopyButtons {
    private buttons;
    constructor();
    private init;
    private copyToClipboard;
    private fallbackCopy;
    private showCopyFeedback;
}
declare class ShowcaseSlider {
    private swiper;
    constructor();
    private init;
    destroy(): void;
}
declare class ScrollAnimations {
    private elements;
    private observer;
    constructor();
    private init;
    private setupIntersectionObserver;
    destroy(): void;
}
declare class PrismHighlighter {
    constructor();
    private init;
}
declare class IndexPage {
    private showcaseSlider;
    private scrollAnimations;
    constructor();
    private init;
    private initializeComponents;
    destroy(): void;
}
//# sourceMappingURL=script.d.ts.map