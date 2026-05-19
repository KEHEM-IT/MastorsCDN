// src/ts/navbar.ts

class Navbar {
    private navbar: HTMLElement | null;
    private navToggle: HTMLElement | null;
    private navMenu: HTMLElement | null;
    private navLinks: NodeListOf<HTMLAnchorElement>;
    private isMenuOpen: boolean = false;
    private lastScroll: number = 0;

    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navToggle = document.getElementById('navToggle');
        this.navMenu = document.getElementById('navMenu');
        this.navLinks = document.querySelectorAll('.nav-link');

        this.init();
    }

    private init(): void {
        this.setupEventListeners();
        this.setupScrollBehavior();
        this.setActiveLink();
    }

    private setupEventListeners(): void {
        // Toggle menu on hamburger click
        this.navToggle?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleMenu();
        });

        // Close menu when clicking nav links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (this.isMenuOpen) {
                    this.closeMenu();
                }
                // Update active state
                this.updateActiveLink(link);
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            if (this.isMenuOpen &&
                !this.navMenu?.contains(target) &&
                !this.navToggle?.contains(target)) {
                this.closeMenu();
            }
        });

        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMenu();
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 1024 && this.isMenuOpen) {
                this.closeMenu();
            }
        });
    }

    private setupScrollBehavior(): void {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            // Add/remove scrolled class for styling
            if (currentScroll > 50) {
                this.navbar?.classList.add('scrolled');
            } else {
                this.navbar?.classList.remove('scrolled');
            }

            // Hide navbar on scroll down, show on scroll up
            if (currentScroll > this.lastScroll && currentScroll > 100) {
                this.navbar?.classList.add('hidden');
                if (this.isMenuOpen) {
                    this.closeMenu();
                }
            } else {
                this.navbar?.classList.remove('hidden');
            }

            this.lastScroll = currentScroll;
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
        this.navMenu?.classList.add('active');
        this.navToggle?.classList.add('active');
        document.body.classList.add('menu-open');
        this.isMenuOpen = true;

        // Add aria attributes for accessibility
        this.navToggle?.setAttribute('aria-expanded', 'true');
        this.navMenu?.setAttribute('aria-hidden', 'false');
    }

    private closeMenu(): void {
        this.navMenu?.classList.remove('active');
        this.navToggle?.classList.remove('active');
        document.body.classList.remove('menu-open');
        this.isMenuOpen = false;

        // Update aria attributes
        this.navToggle?.setAttribute('aria-expanded', 'false');
        this.navMenu?.setAttribute('aria-hidden', 'true');
    }

    private setActiveLink(): void {
        const currentPath = window.location.pathname;
        const currentHash = window.location.hash;

        this.navLinks.forEach(link => {
            const linkPath = new URL(link.href).pathname;
            const linkHash = new URL(link.href).hash;

            // Check if the link matches current page and hash
            if (linkPath === currentPath &&
                (linkHash === currentHash || (!currentHash && !linkHash))) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    private updateActiveLink(activeLink: HTMLAnchorElement): void {
        this.navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }
}

// Initialize navbar when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new Navbar());
} else {
    new Navbar();
}

export default Navbar;