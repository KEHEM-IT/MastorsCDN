export class CarouselSlider {
    constructor(selector = '.showcase-slider') {
        this.swiper = null;
        this.container = null;
        this.container = document.querySelector(selector);
        if (this.container) {
            this.init();
        }
        else {
            console.warn(`Carousel container "${selector}" not found`);
        }
    }
    init() {
        if (!this.container)
            return;
        if (typeof window.Swiper === 'undefined') {
            console.error('Swiper library not loaded. Please include Swiper from CDN.');
            return;
        }
        try {
            this.swiper = new window.Swiper(this.container, {
                slidesPerView: 1,
                spaceBetween: 30,
                centeredSlides: true,
                effect: 'coverflow',
                coverflowEffect: {
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2,
                    slideShadows: false,
                },
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                    dynamicBullets: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
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
                a11y: {
                    prevSlideMessage: 'Previous slide',
                    nextSlideMessage: 'Next slide',
                    paginationBulletMessage: 'Go to slide {{index}}',
                },
                speed: 600,
                loop: true,
                loopAdditionalSlides: 1,
                watchSlidesProgress: true,
                on: {
                    init: () => {
                        console.log('✓ Carousel initialized');
                    },
                    slideChange: () => {
                        this.onSlideChange();
                    },
                },
            });
            this.initKeyboardNavigation();
            this.initInteractions();
        }
        catch (error) {
            console.error('Failed to initialize carousel:', error);
        }
    }
    onSlideChange() {
        if (!this.swiper)
            return;
        const activeSlide = this.swiper.slides[this.swiper.activeIndex];
        if (activeSlide) {
            activeSlide.classList.add('slide-active');
            setTimeout(() => {
                activeSlide.classList.remove('slide-active');
            }, 600);
        }
    }
    initKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (!this.swiper)
                return;
            if (e.key === 'ArrowLeft') {
                this.swiper.slidePrev();
            }
            else if (e.key === 'ArrowRight') {
                this.swiper.slideNext();
            }
        });
    }
    initInteractions() {
        if (!this.container)
            return;
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
    next() {
        this.swiper?.slideNext();
    }
    prev() {
        this.swiper?.slidePrev();
    }
    goToSlide(index) {
        this.swiper?.slideTo(index);
    }
    play() {
        this.swiper?.autoplay?.start();
    }
    pause() {
        this.swiper?.autoplay?.stop();
    }
    destroy() {
        if (this.swiper) {
            this.swiper.destroy(true, true);
            this.swiper = null;
            console.log('✓ Carousel destroyed');
        }
    }
    update() {
        this.swiper?.update();
    }
}
