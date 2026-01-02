interface StatCounter {
    element: HTMLElement;
    target: number;
    current: number;
    increment: number;
}
declare class AnimatedCounter {
    private counters;
    private observer;
    private hasAnimated;
    constructor();
    private init;
    private parseNumber;
    private setupObserver;
    private animateCounters;
}
declare class ParticleEffect {
    private container;
    private particleCount;
    constructor(containerSelector: string);
    private init;
    private createParticle;
}
declare class ScrollReveal {
    private observer;
    constructor();
    private init;
    private observeElements;
}
declare class TimelineInteraction {
    constructor();
    private init;
    private highlightTimelineItem;
    private removeHighlight;
}
declare class AboutPageController {
    constructor();
    private init;
    private initializeComponents;
    private addRevealStyles;
}
//# sourceMappingURL=about.d.ts.map