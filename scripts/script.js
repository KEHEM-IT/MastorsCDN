"use strict";
class Navbar {
    constructor() {
        this.isMenuOpen = false;
        this.elements = {
            navbar: document.getElementById('navbar'),
            navToggle: document.getElementById('navToggle'),
            navMenu: document.getElementById('navMenu'),
            navLinks: document.querySelectorAll('.nav-link')
        };
        this.init();
    }
    init() {
        this.setupScrollBehavior();
        this.setupMobileMenu();
        this.setupActiveLinks();
        this.setupSmoothScroll();
    }
    setupScrollBehavior() {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (this.elements.navbar) {
                if (scrollTop > 20) {
                    this.elements.navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.3)';
                }
                else {
                    this.elements.navbar.style.boxShadow = 'none';
                }
            }
        });
    }
    setupMobileMenu() {
        if (!this.elements.navToggle || !this.elements.navMenu)
            return;
        this.elements.navToggle.addEventListener('click', () => {
            this.toggleMenu();
        });
        document.addEventListener('click', (e) => {
            const target = e.target;
            if (this.isMenuOpen &&
                !target.closest('#navMenu') &&
                !target.closest('#navToggle')) {
                this.closeMenu();
            }
        });
    }
    toggleMenu() {
        if (this.isMenuOpen) {
            this.closeMenu();
        }
        else {
            this.openMenu();
        }
    }
    openMenu() {
        if (!this.elements.navMenu || !this.elements.navToggle)
            return;
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
        const spans = this.elements.navToggle.querySelectorAll('span');
        if (spans.length >= 3) {
            spans[0].style.transform = 'rotate(45deg) translateY(8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
        }
    }
    closeMenu() {
        if (!this.elements.navMenu || !this.elements.navToggle)
            return;
        this.isMenuOpen = false;
        if (window.innerWidth < 1024) {
            this.elements.navMenu.style.display = 'none';
        }
        const spans = this.elements.navToggle.querySelectorAll('span');
        if (spans.length >= 3) {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
    setupActiveLinks() {
        window.addEventListener('scroll', () => {
            let current = '';
            const sections = document.querySelectorAll('section[id]');
            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
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
    setupSmoothScroll() {
        this.elements.navLinks.forEach((link) => {
            link.addEventListener('click', (e) => {
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
                        if (this.isMenuOpen) {
                            this.closeMenu();
                        }
                    }
                }
            });
        });
    }
}
class CodeTabs {
    constructor() {
        this.tabs = [];
        this.init();
    }
    init() {
        const tabButtons = document.querySelectorAll('.code-tab');
        const panels = document.querySelectorAll('.code-panel');
        tabButtons.forEach((tab, index) => {
            const tabElement = tab;
            const panelElement = panels[index];
            if (tabElement && panelElement) {
                this.tabs.push({ tab: tabElement, panel: panelElement });
            }
        });
        this.setupEventListeners();
    }
    setupEventListeners() {
        this.tabs.forEach(({ tab, panel }) => {
            tab.addEventListener('click', () => {
                this.switchTab(tab, panel);
            });
        });
    }
    switchTab(activeTab, activePanel) {
        this.tabs.forEach(({ tab, panel }) => {
            tab.classList.remove('active');
            panel.classList.remove('active');
        });
        activeTab.classList.add('active');
        activePanel.classList.add('active');
        if (typeof Prism !== 'undefined') {
            Prism.highlightAllUnder(activePanel);
        }
    }
}
class CopyButtons {
    constructor() {
        this.buttons = document.querySelectorAll('.copy-btn');
        this.init();
    }
    init() {
        this.buttons.forEach((button) => {
            button.addEventListener('click', () => {
                this.copyToClipboard(button);
            });
        });
    }
    async copyToClipboard(button) {
        const textToCopy = button.getAttribute('data-copy');
        if (!textToCopy)
            return;
        try {
            await navigator.clipboard.writeText(textToCopy);
            this.showCopyFeedback(button);
        }
        catch (err) {
            console.error('Failed to copy text: ', err);
            this.fallbackCopy(textToCopy);
        }
    }
    fallbackCopy(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
        }
        catch (err) {
            console.error('Fallback copy failed: ', err);
        }
        document.body.removeChild(textArea);
    }
    showCopyFeedback(button) {
        const icon = button.querySelector('i');
        if (!icon)
            return;
        const originalClass = icon.className;
        icon.className = 'fas fa-check';
        button.style.borderColor = '#10b981';
        setTimeout(() => {
            icon.className = originalClass;
            button.style.borderColor = '';
        }, 2000);
    }
}
class ShowcaseSlider {
    constructor() {
        this.init();
    }
    init() {
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
    destroy() {
        if (this.swiper) {
            this.swiper.destroy();
        }
    }
}
class ScrollAnimations {
    constructor() {
        this.observer = null;
        this.elements = document.querySelectorAll('.feature-card, .library-card, .showcase-card, .install-card');
        this.init();
    }
    init() {
        if ('IntersectionObserver' in window) {
            this.setupIntersectionObserver();
        }
        else {
            this.elements.forEach((el) => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            });
        }
    }
    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1,
        };
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    target.style.opacity = '0';
                    target.style.transform = 'translateY(30px)';
                    target.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                    setTimeout(() => {
                        target.style.opacity = '1';
                        target.style.transform = 'translateY(0)';
                    }, 100);
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
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}
class PrismHighlighter {
    constructor() {
        this.init();
    }
    init() {
        if (typeof Prism !== 'undefined') {
            Prism.highlightAll();
        }
    }
}
class App {
    constructor() {
        this.showcaseSlider = null;
        this.scrollAnimations = null;
        this.init();
    }
    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.initializeComponents();
            });
        }
        else {
            this.initializeComponents();
        }
    }
    initializeComponents() {
        new Navbar();
        new CodeTabs();
        new CopyButtons();
        this.showcaseSlider = new ShowcaseSlider();
        this.scrollAnimations = new ScrollAnimations();
        new PrismHighlighter();
        this.setupResizeHandler();
        console.log('✅ MastorsCDN initialized successfully');
    }
    setupResizeHandler() {
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = window.setTimeout(() => {
                this.handleResize();
            }, 250);
        });
    }
    handleResize() {
        const navMenu = document.getElementById('navMenu');
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
    destroy() {
        if (this.showcaseSlider) {
            this.showcaseSlider.destroy();
        }
        if (this.scrollAnimations) {
            this.scrollAnimations.destroy();
        }
    }
}
const app = new App();
//# sourceMappingURL=script.js.map