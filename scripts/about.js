"use strict";
// scripts/about.ts
// Interactive features for About page
// ============================================
// ANIMATED COUNTER
// ============================================
class AnimatedCounter {
    constructor() {
        this.counters = [];
        this.observer = null;
        this.hasAnimated = false;
        this.init();
    }
    init() {
        const statElements = document.querySelectorAll('.stat-number');
        statElements.forEach((element) => {
            const target = this.parseNumber(element.textContent || '0');
            this.counters.push({
                element: element,
                target,
                current: 0,
                increment: target / 60 // 60 frames for smooth animation
            });
        });
        this.setupObserver();
    }
    parseNumber(text) {
        // Remove any non-numeric characters except decimal point
        const cleaned = text.replace(/[^\d.]/g, '');
        return parseFloat(cleaned) || 0;
    }
    setupObserver() {
        const options = {
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
    animateCounters() {
        const duration = 2000; // 2 seconds
        const startTime = performance.now();
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Easing function (easeOutExpo)
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            this.counters.forEach(counter => {
                counter.current = counter.target * easeProgress;
                // Format the number
                let displayValue;
                if (counter.target >= 1000) {
                    displayValue = Math.floor(counter.current).toLocaleString() + '+';
                }
                else if (counter.target % 1 !== 0) {
                    displayValue = counter.current.toFixed(1);
                }
                else {
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
    constructor(containerSelector) {
        this.particleCount = 30;
        this.container = document.querySelector(containerSelector);
        this.init();
    }
    init() {
        if (!this.container)
            return;
        for (let i = 0; i < this.particleCount; i++) {
            this.createParticle();
        }
    }
    createParticle() {
        if (!this.container)
            return;
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
    constructor() {
        this.observer = null;
        this.init();
    }
    init() {
        const options = {
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
    observeElements() {
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
    init() {
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
    highlightTimelineItem(index) {
        const items = document.querySelectorAll('.timeline-item');
        if (items[index]) {
            items[index].classList.add('highlighted');
        }
    }
    removeHighlight(index) {
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
    init() {
        // Wait for components to be loaded first
        if (document.querySelector('[data-component="header"]')?.innerHTML) {
            this.initializeComponents();
        }
        else {
            document.addEventListener('componentsLoaded', () => {
                this.initializeComponents();
            });
        }
    }
    initializeComponents() {
        // Initialize about page specific components
        // Note: Navigation is handled by navbar.js which is loaded globally
        new AnimatedCounter();
        new ParticleEffect('.about-hero');
        new ScrollReveal();
        new TimelineInteraction();
        // Add reveal animation styles
        this.addRevealStyles();
        // Log initialization
        console.log('🎨 MastorsCDN About Page initialized');
    }
    addRevealStyles() {
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
                animation: float 20s infinite ease-in-out;
            }

            @keyframes float {
                0%, 100% {
                    transform: translate(0, 0);
                }
                25% {
                    transform: translate(10px, -10px);
                }
                50% {
                    transform: translate(-5px, 10px);
                }
                75% {
                    transform: translate(5px, 5px);
                }
            }
        `;
        document.head.appendChild(style);
    }
}
// Initialize the about page
new AboutPageController();
//# sourceMappingURL=about.js.map