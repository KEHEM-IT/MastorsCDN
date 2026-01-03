class Navbar {
    constructor() {
        this.isMenuOpen = false;
        this.lastScroll = 0;
        this.navbar = document.getElementById('navbar');
        this.navToggle = document.getElementById('navToggle');
        this.navMenu = document.getElementById('navMenu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }
    init() {
        this.setupEventListeners();
        this.setupScrollBehavior();
        this.setActiveLink();
    }
    setupEventListeners() {
        this.navToggle?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleMenu();
        });
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (this.isMenuOpen) {
                    this.closeMenu();
                }
                this.updateActiveLink(link);
            });
        });
        document.addEventListener('click', (e) => {
            const target = e.target;
            if (this.isMenuOpen &&
                !this.navMenu?.contains(target) &&
                !this.navToggle?.contains(target)) {
                this.closeMenu();
            }
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMenu();
            }
        });
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 1024 && this.isMenuOpen) {
                this.closeMenu();
            }
        });
    }
    setupScrollBehavior() {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            if (currentScroll > 50) {
                this.navbar?.classList.add('scrolled');
            }
            else {
                this.navbar?.classList.remove('scrolled');
            }
            if (currentScroll > this.lastScroll && currentScroll > 100) {
                this.navbar?.classList.add('hidden');
                if (this.isMenuOpen) {
                    this.closeMenu();
                }
            }
            else {
                this.navbar?.classList.remove('hidden');
            }
            this.lastScroll = currentScroll;
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
        this.navMenu?.classList.add('active');
        this.navToggle?.classList.add('active');
        document.body.classList.add('menu-open');
        this.isMenuOpen = true;
        this.navToggle?.setAttribute('aria-expanded', 'true');
        this.navMenu?.setAttribute('aria-hidden', 'false');
    }
    closeMenu() {
        this.navMenu?.classList.remove('active');
        this.navToggle?.classList.remove('active');
        document.body.classList.remove('menu-open');
        this.isMenuOpen = false;
        this.navToggle?.setAttribute('aria-expanded', 'false');
        this.navMenu?.setAttribute('aria-hidden', 'true');
    }
    setActiveLink() {
        const currentPath = window.location.pathname;
        const currentHash = window.location.hash;
        this.navLinks.forEach(link => {
            const linkPath = new URL(link.href).pathname;
            const linkHash = new URL(link.href).hash;
            if (linkPath === currentPath &&
                (linkHash === currentHash || (!currentHash && !linkHash))) {
                link.classList.add('active');
            }
            else {
                link.classList.remove('active');
            }
        });
    }
    updateActiveLink(activeLink) {
        this.navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new Navbar());
}
else {
    new Navbar();
}
export default Navbar;
