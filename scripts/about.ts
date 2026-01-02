// scripts/about.ts
// Interactive features for About page

interface StatCounter {
    element: HTMLElement;
    target: number;
    current: number;
    increment: number;
}

// ============================================
// SMOOTH SCROLL & NAVBAR
// ============================================
class NavigationManager {
    private navbar: HTMLElement | null;
    private navToggle: HTMLElement | null;
    private navMenu: HTMLElement | null;
    private scrollThreshold: number = 100;

    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navToggle = document.getElementById('navToggle');
        this.navMenu = document.getElementById('navMenu');
        this.init();
    }

    private init(): void {
        this.handleScroll();
        this.setupMobileMenu();
        this.setupSmoothScroll();

        window.addEventListener('scroll', () => this.handleScroll());
    }

    private handleScroll(): void {
        if (!this.navbar) return;

        if (window.scrollY > this.scrollThreshold) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }

    private setupMobileMenu(): void {
        if (!this.navToggle || !this.navMenu) return;

        this.navToggle.addEventListener('click', () => {
            this.navMenu?.classList.toggle('active');
            this.navToggle?.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest('.navbar-content')) {
                this.navMenu?.classList.remove('active');
                this.navToggle?.classList.remove('active');
            }
        });
    }

    private setupSmoothScroll(): void {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e: Event) => {
                e.preventDefault();
                const href = (anchor as HTMLAnchorElement).getAttribute('href');
                if (!href || href === '#') return;

                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = (target as HTMLElement).offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// ============================================
// ANIMATED COUNTER
// ============================================
class AnimatedCounter {
    private counters: StatCounter[] = [];
    private observer: IntersectionObserver | null = null;
    private hasAnimated: boolean = false;

    constructor() {
        this.init();
    }

    private init(): void {
        const statElements = document.querySelectorAll('.stat-number');

        statElements.forEach((element) => {
            const target = this.parseNumber((element as HTMLElement).textContent || '0');
            this.counters.push({
                element: element as HTMLElement,
                target,
                current: 0,
                increment: target / 60 // 60 frames for smooth animation
            });
        });

        this.setupObserver();
    }

    private parseNumber(text: string): number {
        // Remove any non-numeric characters except decimal point
        const cleaned = text.replace(/[^\d.]/g, '');
        return parseFloat(cleaned) || 0;
    }

    private setupObserver(): void {
        const options: IntersectionObserverInit = {
            threshold: 0.5,
            rootMargin: '0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasAnimated) {
                    this.hasAnimated = true;
                    this.animateCounters();
                }
            });
        }, options);

        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            this.observer.observe(statsSection);
        }
    }

    private animateCounters(): void {
        const duration = 2000; // 2 seconds
        const startTime = performance.now();

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (easeOutExpo)
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

            this.counters.forEach(counter => {
                counter.current = counter.target * easeProgress;

                // Format the number
                let displayValue: string;
                if (counter.target >= 1000) {
                    displayValue = Math.floor(counter.current).toLocaleString() + '+';
                } else if (counter.target % 1 !== 0) {
                    displayValue = counter.current.toFixed(1);
                } else {
                    displayValue = Math.floor(counter.current).toString();
                }

                counter.element.textContent = displayValue;
            });

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }
}

// ============================================
// FLOATING PARTICLES
// ============================================
class ParticleEffect {
    private container: HTMLElement | null;
    private particleCount: number = 30;

    constructor(containerSelector: string) {
        this.container = document.querySelector(containerSelector);
        this.init();
    }

    private init(): void {
        if (!this.container) return;

        for (let i = 0; i < this.particleCount; i++) {
            this.createParticle();
        }
    }

    private createParticle(): void {
        if (!this.container) return;

        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;

        // Random animation delay
        particle.style.animationDelay = `${Math.random() * 20}s`;

        // Random size
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Random opacity
        particle.style.opacity = `${Math.random() * 0.5 + 0.3}`;

        this.container.appendChild(particle);
    }
}

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================
class ScrollReveal {
    private observer: IntersectionObserver | null = null;

    constructor() {
        this.init();
    }

    private init(): void {
        const options: IntersectionObserverInit = {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    this.observer?.unobserve(entry.target);
                }
            });
        }, options);

        this.observeElements();
    }

    private observeElements(): void {
        const selectors = [
            '.about-section',
            '.value-card',
            '.team-member',
            '.timeline-item'
        ];

        selectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                element.classList.add('reveal-element');
                this.observer?.observe(element);
            });
        });
    }
}

// ============================================
// TIMELINE DOT INTERACTIONS
// ============================================
class TimelineInteraction {
    constructor() {
        this.init();
    }

    private init(): void {
        const timelineDots = document.querySelectorAll('.timeline-dot');

        timelineDots.forEach((dot, index) => {
            dot.addEventListener('mouseenter', () => {
                this.highlightTimelineItem(index);
            });

            dot.addEventListener('mouseleave', () => {
                this.removeHighlight(index);
            });
        });
    }

    private highlightTimelineItem(index: number): void {
        const items = document.querySelectorAll('.timeline-item');
        if (items[index]) {
            items[index].classList.add('highlighted');
        }
    }

    private removeHighlight(index: number): void {
        const items = document.querySelectorAll('.timeline-item');
        if (items[index]) {
            items[index].classList.remove('highlighted');
        }
    }
}

// ============================================
// INITIALIZE EVERYTHING
// ============================================
class AboutPageController {
    constructor() {
        this.init();
    }

    private init(): void {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        } else {
            this.initializeComponents();
        }
    }

    private initializeComponents(): void {
        // Initialize all components
        new NavigationManager();
        new AnimatedCounter();
        new ParticleEffect('.about-hero');
        new ScrollReveal();
        new TimelineInteraction();

        // Add reveal animation styles
        this.addRevealStyles();

        // Log initialization
        console.log('🎨 MastorsCDN About Page initialized');
    }

    private addRevealStyles(): void {
        const style = document.createElement('style');
        style.textContent = `
            .reveal-element {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s ease-out, transform 0.6s ease-out;
            }

            .reveal-element.revealed {
                opacity: 1;
                transform: translateY(0);
            }

            .timeline-item.highlighted .timeline-content {
                border-color: rgba(99, 102, 241, 0.6);
                box-shadow: 0 20px 50px rgba(99, 102, 241, 0.3);
            }

            .timeline-item.highlighted .timeline-dot {
                transform: translate(-50%, -50%) scale(1.4);
            }

            .particle {
                position: absolute;
                border-radius: 50%;
                background: #818cf8;
                pointer-events: none;
                z-index: 0;
            }

            @media (max-width: 768px) {
                .navbar-menu {
                    position: fixed;
                    top: 70px;
                    right: -100%;
                    width: 100%;
                    max-width: 300px;
                    background: rgba(15, 23, 42, 0.98);
                    backdrop-filter: blur(20px);
                    border-left: 1px solid #334155;
                    padding: 2rem;
                    transition: right 0.3s ease;
                    height: calc(100vh - 70px);
                    flex-direction: column;
                }

                .navbar-menu.active {
                    right: 0;
                }

                .navbar-toggle {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                    width: 30px;
                    height: 24px;
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 0;
                }

                .navbar-toggle span {
                    width: 100%;
                    height: 3px;
                    background: #f8fafc;
                    border-radius: 2px;
                    transition: all 0.3s;
                }

                .navbar-toggle.active span:nth-child(1) {
                    transform: rotate(45deg) translate(8px, 8px);
                }

                .navbar-toggle.active span:nth-child(2) {
                    opacity: 0;
                }

                .navbar-toggle.active span:nth-child(3) {
                    transform: rotate(-45deg) translate(8px, -8px);
                }
            }

            @media (min-width: 769px) {
                .navbar-toggle {
                    display: none;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize the about page
new AboutPageController();