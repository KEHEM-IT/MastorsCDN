// ============================================
// Global Type Declarations for External Libraries
// ============================================

/**
 * Swiper.js - Modern mobile touch slider
 * https://swiperjs.com/
 */
declare class Swiper {
    constructor(selector: string | HTMLElement, options?: SwiperOptions);
    destroy(): void;
    update(): void;
    slideTo(index: number, speed?: number, runCallbacks?: boolean): void;
    slideNext(speed?: number, runCallbacks?: boolean): void;
    slidePrev(speed?: number, runCallbacks?: boolean): void;
}

interface SwiperOptions {
    slidesPerView?: number | 'auto';
    spaceBetween?: number;
    loop?: boolean;
    speed?: number;
    autoplay?: {
        delay: number;
        disableOnInteraction?: boolean;
    };
    pagination?: {
        el: string;
        clickable?: boolean;
        type?: 'bullets' | 'fraction' | 'progressbar';
    };
    navigation?: {
        nextEl?: string;
        prevEl?: string;
    };
    breakpoints?: {
        [key: number]: SwiperOptions;
    };
    effect?: 'slide' | 'fade' | 'cube' | 'coverflow' | 'flip';
    grabCursor?: boolean;
    centeredSlides?: boolean;
}

/**
 * Prism.js - Syntax Highlighting
 * https://prismjs.com/
 */
declare const Prism: {
    highlightAll(): void;
    highlightElement(element: Element, async?: boolean, callback?: () => void): void;
    highlightAllUnder(element: Element, async?: boolean, callback?: () => void): void;
    highlight(text: string, grammar: any, language: string): string;
    languages: {
        [key: string]: any;
    };
    plugins: {
        [key: string]: any;
    };
};

/**
 * Window interface extensions
 */
interface Window {
    Swiper: typeof Swiper;
    Prism: typeof Prism;
}

/**
 * Performance Navigation Timing
 */
interface PerformanceNavigationTiming extends PerformanceEntry {
    domContentLoadedEventEnd: number;
    domContentLoadedEventStart: number;
    loadEventEnd: number;
    loadEventStart: number;
    transferSize: number;
    type: string;
}

/**
 * Intersection Observer types (already in lib.dom.d.ts, but for clarity)
 */
interface IntersectionObserverInit {
    root?: Element | Document | null;
    rootMargin?: string;
    threshold?: number | number[];
}

/**
 * Custom Event Types
 */
interface CustomScrollEvent extends Event {
    scrollTop: number;
    scrollDirection: 'up' | 'down';
}

/**
 * Custom Element Attributes
 */
interface HTMLElement {
    dataset: DOMStringMap;
}

interface DOMStringMap {
    [key: string]: string | undefined;
    copy?: string;
    tab?: string;
    panel?: string;
    validate?: string;
}