// src/ts/carousel-slider.ts

// Swiper will be loaded from CDN, so we'll use the global Swiper object
declare global {
    interface Window {
        Swiper: any;
    }
}

export class CarouselSlider {
    private swiper: any = null;
    private container: HTMLElement | null = null;

    constructor(selector: string = '.showcase-slider') {
        this.container = document.querySelector(selector);
        if (this.container) {
            this.init();
        } else {
            console.warn(`Carousel container "${selector}" not found`);
        }
    }

    private init(): void {
        if (!this.container) return;

        // Check if Swiper is loaded
        if (typeof window.Swiper === 'undefined') {
            console.error('Swiper library not loaded. Please include Swiper from CDN.');
            return;
        }

        try {
            this.swiper = new window.Swiper(this.container as HTMLElement, {
                // Slides
                slidesPerView: 1,
                spaceBetween: 30,
                centeredSlides: true,

                // Effect
                effect: 'coverflow',
                coverflowEffect: {
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2,
                    slideShadows: false,
                },

                // Autoplay
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                },

                // Pagination
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                    dynamicBullets: true,
                },

                // Navigation (optional - add buttons if needed)
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },

                // Responsive breakpoints
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

                // Accessibility
                a11y: {
                    prevSlideMessage: 'Previous slide',
                    nextSlideMessage: 'Next slide',
                    paginationBulletMessage: 'Go to slide {{index}}',
                },

                // Performance
                speed: 600,
                loop: true,
                loopAdditionalSlides: 1,
                watchSlidesProgress: true,

                // Events
                on: {
                    init: () => {
                        console.log('✓ Carousel initialized');
                    },
                    slideChange: () => {
                        this.onSlideChange();
                    },
                },
            });

            // Add keyboard navigation
            this.initKeyboardNavigation();

            // Add touch/hover effects
            this.initInteractions();

        } catch (error) {
            console.error('Failed to initialize carousel:', error);
        }
    }

    private onSlideChange(): void {
        if (!this.swiper) return;

        // Add animation class to active slide
        const activeSlide = this.swiper.slides[this.swiper.activeIndex];
        if (activeSlide) {
            activeSlide.classList.add('slide-active');
            setTimeout(() => {
                activeSlide.classList.remove('slide-active');
            }, 600);
        }
    }

    private initKeyboardNavigation(): void {
        document.addEventListener('keydown', (e) => {
            if (!this.swiper) return;

            if (e.key === 'ArrowLeft') {
                this.swiper.slidePrev();
            } else if (e.key === 'ArrowRight') {
                this.swiper.slideNext();
            }
        });
    }

    private initInteractions(): void {
        if (!this.container) return;

        const slides = this.container.querySelectorAll('.swiper-slide');

        slides.forEach(slide => {
            slide.addEventListener('mouseenter', () => {
                if (this.swiper?.autoplay) {
                    this.swiper.autoplay.stop();
                }
            });

            slide.addEventListener('mouseleave', () => {
                if (this.swiper?.autoplay) {
                    this.swiper.autoplay.start();
                }
            });
        });
    }

    // Public methods
    public next(): void {
        this.swiper?.slideNext();
    }

    public prev(): void {
        this.swiper?.slidePrev();
    }

    public goToSlide(index: number): void {
        this.swiper?.slideTo(index);
    }

    public play(): void {
        this.swiper?.autoplay?.start();
    }

    public pause(): void {
        this.swiper?.autoplay?.stop();
    }

    public destroy(): void {
        if (this.swiper) {
            this.swiper.destroy(true, true);
            this.swiper = null;
            console.log('✓ Carousel destroyed');
        }
    }

    public update(): void {
        this.swiper?.update();
    }
}