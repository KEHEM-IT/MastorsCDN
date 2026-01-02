// ============================================
// MastorsCDN - Main Scripts
// ============================================

// ============================================
// TYPE DEFINITIONS
// ============================================

interface NavbarElements {
    navbar: HTMLElement | null;
    navToggle: HTMLElement | null;
    navMenu: HTMLElement | null;
    navLinks: NodeListOf<HTMLElement>;
}

interface CodeTab {
    tab: HTMLElement;
    panel: HTMLElement;
}

// ============================================
// NAVBAR FUNCTIONALITY
// ============================================

class Navbar {
    private elements: NavbarElements;
    private isMenuOpen: boolean = false;

    constructor() {
        this.elements = {
            navbar: document.getElementById('navbar'),
            navToggle: document.getElementById('navToggle'),
            navMenu: document.getElementById('navMenu'),
            navLinks: document.querySelectorAll('.nav-link')
        };

        this.init();
    }

    private init(): void {
        this.setupScrollBehavior();
        this.setupMobileMenu();
        this.setupActiveLinks();
        this.setupSmoothScroll();
    }

    private setupScrollBehavior(): void {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Add shadow on scroll
            if (this.elements.navbar) {
                if (scrollTop > 20) {
                    this.elements.navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.3)';
                } else {
                    this.elements.navbar.style.boxShadow = 'none';
                }
            }
        });
    }

    private setupMobileMenu(): void {
        if (!this.elements.navToggle || !this.elements.navMenu) return;

        this.elements.navToggle.addEventListener('click', () => {
            this.toggleMenu();
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                this.isMenuOpen &&
                !target.closest('#navMenu') &&
                !target.closest('#navToggle')
            ) {
                this.closeMenu();
            }
        });
    }

    private toggleMenu(): void {
        if (this.isMenuOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    private openMenu(): void {
        if (!this.elements.navMenu || !this.elements.navToggle) return;

        this.isMenuOpen = true;
        this.elements.navMenu.style.display = 'grid';
        this.elements.navMenu.style.position = 'absolute';
        this.elements.navMenu.style.top = '100%';
        this.elements.navMenu.style.left = '0';
        this.elements.navMenu.style.right = '0';
        this.elements.navMenu.style.background = 'rgba(15, 23, 42, 0.95)';
        this.elements.navMenu.style.padding = '2rem';
        this.elements.navMenu.style.gap = '1.5rem';
        this.elements.navMenu.style.borderTop = '1px solid rgba(51, 65, 85, 1)';
        this.elements.navMenu.style.backdropFilter = 'blur(12px)';
        this.elements.navMenu.style.gridAutoFlow = 'row';

        // Animate toggle button
        const spans = this.elements.navToggle.querySelectorAll<HTMLSpanElement>('span');
        if (spans.length >= 3) {
            spans[0]!.style.transform = 'rotate(45deg) translateY(8px)';
            spans[1]!.style.opacity = '0';
            spans[2]!.style.transform = 'rotate(-45deg) translateY(-8px)';
        }
    }

    private closeMenu(): void {
        if (!this.elements.navMenu || !this.elements.navToggle) return;

        this.isMenuOpen = false;

        // Check if we're on mobile
        if (window.innerWidth < 1024) {
            this.elements.navMenu.style.display = 'none';
        }

        // Reset toggle button
        const spans = this.elements.navToggle.querySelectorAll<HTMLSpanElement>('span');
        if (spans.length >= 3) {
            spans[0]!.style.transform = 'none';
            spans[1]!.style.opacity = '1';
            spans[2]!.style.transform = 'none';
        }
    }

    private setupActiveLinks(): void {
        // Set active link based on scroll position
        window.addEventListener('scroll', () => {
            let current = '';
            const sections = document.querySelectorAll('section[id]');

            sections.forEach((section) => {
                const sectionTop = (section as HTMLElement).offsetTop;

                if (window.pageYOffset >= sectionTop - 100) {
                    current = section.getAttribute('id') || '';
                }
            });

            this.elements.navLinks.forEach((link) => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (href === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    private setupSmoothScroll(): void {
        this.elements.navLinks.forEach((link) => {
            link.addEventListener('click', (e: Event) => {
                const href = link.getAttribute('href');

                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetSection = document.getElementById(targetId);

                    if (targetSection) {
                        const offsetTop = targetSection.offsetTop - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });

                        // Close mobile menu after clicking
                        if (this.isMenuOpen) {
                            this.closeMenu();
                        }
                    }
                }
            });
        });
    }
}

// ============================================
// CODE TABS FUNCTIONALITY
// ============================================

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
// MAIN INITIALIZATION
// ============================================

class App {
    private showcaseSlider: ShowcaseSlider | null = null;
    private scrollAnimations: ScrollAnimations | null = null;

    constructor() {
        this.init();
    }

    private init(): void {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.initializeComponents();
            });
        } else {
            this.initializeComponents();
        }
    }

    private initializeComponents(): void {
        // Initialize all components
        new Navbar();
        new CodeTabs();
        new CopyButtons();
        this.showcaseSlider = new ShowcaseSlider();
        this.scrollAnimations = new ScrollAnimations();
        new PrismHighlighter();

        // Setup window resize handler
        this.setupResizeHandler();

        // Log initialization
        console.log('✅ MastorsCDN initialized successfully');
    }

    private setupResizeHandler(): void {
        let resizeTimer: number;

        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = window.setTimeout(() => {
                this.handleResize();
            }, 250);
        });
    }

    private handleResize(): void {
        const navMenu = document.getElementById('navMenu');

        // Reset mobile menu on desktop
        if (window.innerWidth >= 1024 && navMenu) {
            navMenu.style.display = '';
            navMenu.style.position = '';
            navMenu.style.top = '';
            navMenu.style.left = '';
            navMenu.style.right = '';
            navMenu.style.background = '';
            navMenu.style.padding = '';
            navMenu.style.gap = '';
            navMenu.style.borderTop = '';
            navMenu.style.backdropFilter = '';
            navMenu.style.gridAutoFlow = '';
        }
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

// ============================================
// START APPLICATION
// ============================================

const app = new App();