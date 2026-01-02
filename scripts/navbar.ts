// ============================================
// Navbar Functionality
// Handles navigation, mobile menu, scroll effects
// ============================================

interface NavbarElements {
    navbar: HTMLElement | null;
    navToggle: HTMLElement | null;
    navMenu: HTMLElement | null;
    navLinks: NodeListOf<HTMLElement>;
}

class Navbar {
    private elements: NavbarElements | null = null;
    private isMenuOpen: boolean = false;

    constructor() {
        // Wait for components to load before initializing
        if (document.querySelector('#navbar')) {
            this.initializeElements();
        } else {
            document.addEventListener('componentsLoaded', () => {
                this.initializeElements();
            });
        }
    }

    private initializeElements(): void {
        this.elements = {
            navbar: document.getElementById('navbar'),
            navToggle: document.getElementById('navToggle'),
            navMenu: document.getElementById('navMenu'),
            navLinks: document.querySelectorAll('.nav-link')
        };

        this.init();
    }

    private init(): void {
        if (!this.elements) return;

        this.setupScrollBehavior();
        this.setupMobileMenu();
        this.setupActiveLinks();
        this.setupSmoothScroll();
        this.setupResizeHandler();
    }

    private setupScrollBehavior(): void {
        if (!this.elements?.navbar) return;

        window.addEventListener('scroll', () => {
            if (!this.elements?.navbar) return;

            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop > 20) {
                this.elements.navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.3)';
            } else {
                this.elements.navbar.style.boxShadow = 'none';
            }
        });
    }

    private setupMobileMenu(): void {
        if (!this.elements?.navToggle || !this.elements?.navMenu) return;

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
        if (!this.elements?.navMenu || !this.elements?.navToggle) return;

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
        if (!this.elements?.navMenu || !this.elements?.navToggle) return;

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
        if (!this.elements?.navLinks) return;

        // Set active link based on current page
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';

        this.elements.navLinks.forEach((link) => {
            const href = link.getAttribute('href') || '';

            // Check if link matches current page
            if (href.includes(currentPage)) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Set active link based on scroll position (for index.html sections)
        if (currentPage === 'index.html' || currentPage === '') {
            window.addEventListener('scroll', () => {
                if (!this.elements?.navLinks) return;

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
                    if (href === `#${current}` || href === `index.html#${current}`) {
                        link.classList.add('active');
                    }
                });
            });
        }
    }

    private setupSmoothScroll(): void {
        if (!this.elements?.navLinks) return;

        this.elements.navLinks.forEach((link) => {
            link.addEventListener('click', (e: Event) => {
                const href = link.getAttribute('href');

                if (!href) return;

                // Handle hash links on current page
                if (href.startsWith('#')) {
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
                // Handle cross-page hash links (e.g., index.html#features)
                else if (href.includes('#')) {
                    const [page, hash] = href.split('#');
                    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

                    // If we're on the target page, scroll to section
                    if (page === currentPage || (page === 'index.html' && currentPage === '')) {
                        e.preventDefault();
                        const targetSection = document.getElementById(hash);

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
                    // Otherwise, let the browser navigate normally
                }
                // For regular page links, close mobile menu
                else if (this.isMenuOpen) {
                    this.closeMenu();
                }
            });
        });
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
        if (!this.elements?.navMenu) return;

        // Reset mobile menu on desktop
        if (window.innerWidth >= 1024) {
            this.elements.navMenu.style.display = '';
            this.elements.navMenu.style.position = '';
            this.elements.navMenu.style.top = '';
            this.elements.navMenu.style.left = '';
            this.elements.navMenu.style.right = '';
            this.elements.navMenu.style.background = '';
            this.elements.navMenu.style.padding = '';
            this.elements.navMenu.style.gap = '';
            this.elements.navMenu.style.borderTop = '';
            this.elements.navMenu.style.backdropFilter = '';
            this.elements.navMenu.style.gridAutoFlow = '';
        }
    }
}

// Initialize navbar
new Navbar();