interface NavbarElements {
    navbar: HTMLElement | null;
    navToggle: HTMLElement | null;
    navMenu: HTMLElement | null;
    navLinks: NodeListOf<HTMLElement>;
}
declare class Navbar {
    private elements;
    private isMenuOpen;
    constructor();
    private initializeElements;
    private init;
    private setupScrollBehavior;
    private setupMobileMenu;
    private toggleMenu;
    private openMenu;
    private closeMenu;
    private setupActiveLinks;
    private setupSmoothScroll;
    private setupResizeHandler;
    private handleResize;
}
//# sourceMappingURL=navbar.d.ts.map