// ============================================
// MastorsCDN - Index Page Scripts
// Page-specific functionality for index.html
// ============================================

// ============================================
// CODE TABS FUNCTIONALITY
// ============================================

interface CodeTab {
    tab: HTMLElement;
    panel: HTMLElement;
}

class CodeTabs {
    private tabs: CodeTab[] = [];

    constructor() {
        this.init();
    }

    private init(): void {
        const tabButtons = document.querySelectorAll('.code-tab');
        const panels = document.querySelectorAll('.code-panel');

        tabButtons.forEach((tab, index) => {
            const tabElement = tab as HTMLElement;
            const panelElement = panels[index] as HTMLElement;

            if (tabElement && panelElement) {
                this.tabs.push({ tab: tabElement, panel: panelElement });
            }
        });

        this.setupEventListeners();
    }

    private setupEventListeners(): void {
        this.tabs.forEach(({ tab, panel }) => {
            tab.addEventListener('click', () => {
                this.switchTab(tab, panel);
            });
        });
    }

    private switchTab(activeTab: HTMLElement, activePanel: HTMLElement): void {
        // Remove active class from all tabs and panels
        this.tabs.forEach(({ tab, panel }) => {
            tab.classList.remove('active');
            panel.classList.remove('active');
        });

        // Add active class to clicked tab and corresponding panel
        activeTab.classList.add('active');
        activePanel.classList.add('active');

        // Re-run Prism highlighting if available
        if (typeof Prism !== 'undefined') {
            Prism.highlightAllUnder(activePanel);
        }
    }
}

// ============================================
// COPY TO CLIPBOARD FUNCTIONALITY
// ============================================

class CopyButtons {
    private buttons: NodeListOf<HTMLElement>;

    constructor() {
        this.buttons = document.querySelectorAll('.copy-btn');
        this.init();
    }

    private init(): void {
        this.buttons.forEach((button) => {
            button.addEventListener('click', () => {
                this.copyToClipboard(button);
            });
        });
    }

    private async copyToClipboard(button: HTMLElement): Promise<void> {
        const textToCopy = button.getAttribute('data-copy');

        if (!textToCopy) return;

        try {
            await navigator.clipboard.writeText(textToCopy);
            this.showCopyFeedback(button);
        } catch (err) {
            console.error('Failed to copy text: ', err);
            this.fallbackCopy(textToCopy);
        }
    }

    private fallbackCopy(text: string): void {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();

        try {
            document.execCommand('copy');
        } catch (err) {
            console.error('Fallback copy failed: ', err);
        }

        document.body.removeChild(textArea);
    }

    private showCopyFeedback(button: HTMLElement): void {
        const icon = button.querySelector('i');
        if (!icon) return;

        const originalClass = icon.className;
        icon.className = 'fas fa-check';
        button.style.borderColor = '#10b981';

        setTimeout(() => {
            icon.className = originalClass;
            button.style.borderColor = '';
        }, 2000);
    }
}

// ============================================
// SWIPER INITIALIZATION
// ============================================

class ShowcaseSlider {
    private swiper: any;

    constructor() {
        this.init();
    }

    private init(): void {
        // Check if Swiper is loaded
        if (typeof Swiper === 'undefined') {
            console.warn('Swiper library not loaded');
            return;
        }

        this.swiper = new Swiper('.showcase-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                640: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            },
        });
    }

    public destroy(): void {
        if (this.swiper) {
            this.swiper.destroy();
        }
    }
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

class ScrollAnimations {
    private elements: NodeListOf<HTMLElement>;
    private observer: IntersectionObserver | null = null;

    constructor() {
        this.elements = document.querySelectorAll('.feature-card, .library-card, .showcase-card, .install-card');
        this.init();
    }

    private init(): void {
        if ('IntersectionObserver' in window) {
            this.setupIntersectionObserver();
        } else {
            // Fallback: show all elements immediately
            this.elements.forEach((el) => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            });
        }
    }

    private setupIntersectionObserver(): void {
        const options: IntersectionObserverInit = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1,
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const target = entry.target as HTMLElement;
                    target.style.opacity = '0';
                    target.style.transform = 'translateY(30px)';
                    target.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';

                    // Trigger animation
                    setTimeout(() => {
                        target.style.opacity = '1';
                        target.style.transform = 'translateY(0)';
                    }, 100);

                    // Unobserve after animation
                    if (this.observer) {
                        this.observer.unobserve(target);
                    }
                }
            });
        }, options);

        this.elements.forEach((el) => {
            if (this.observer) {
                this.observer.observe(el);
            }
        });
    }

    public destroy(): void {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}

// ============================================
// PRISM INITIALIZATION
// ============================================

class PrismHighlighter {
    constructor() {
        this.init();
    }

    private init(): void {
        // Wait for DOM to be fully loaded
        if (typeof Prism !== 'undefined') {
            Prism.highlightAll();
        }
    }
}

// ============================================
// MAIN INITIALIZATION FOR INDEX PAGE
// ============================================

class IndexPage {
    private showcaseSlider: ShowcaseSlider | null = null;
    private scrollAnimations: ScrollAnimations | null = null;

    constructor() {
        this.init();
    }

    private init(): void {
        // Wait for components to be loaded
        if (document.querySelector('[data-component="header"]')?.innerHTML) {
            this.initializeComponents();
        } else {
            document.addEventListener('componentsLoaded', () => {
                this.initializeComponents();
            });
        }
    }

    private initializeComponents(): void {
        // Initialize index page specific components
        new CodeTabs();
        new CopyButtons();
        this.showcaseSlider = new ShowcaseSlider();
        this.scrollAnimations = new ScrollAnimations();
        new PrismHighlighter();

        // Log initialization
        console.log('✅ MastorsCDN Index Page initialized');
    }

    public destroy(): void {
        if (this.showcaseSlider) {
            this.showcaseSlider.destroy();
        }
        if (this.scrollAnimations) {
            this.scrollAnimations.destroy();
        }
    }
}

// Initialize index page
new IndexPage();