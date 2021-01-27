class Slider {
    wrapper = document.createElement("div");
    inner = document.createElement("div");
    options = {
        buttons: {
            prev: {
                size: "50",
                img: "",
                alt: "previous"
            },
            next: {
                size: "50",
                img: "",
                alt: "next"
            }
        },
        transitionDuration: 0.5,
        autoSlide: false,
        autoSlideDuration: 3000,
    };
    offset = 0;
    slideIndex = 1;

    constructor(parent, img, width, height, auto) {
        this.parent = document.querySelector(parent);
        this.imgs = document.querySelectorAll(img);
        this.width = width;
        this.height = height;
        this.options.autoSlide = auto;
    }

    setButtons(prev, next) {
        this.options.buttons.prev.img = prev;
        this.options.buttons.next.img = next;
    }

    setButtonsSize(prev, next) {
        this.options.buttons.prev.size = prev;
        this.options.buttons.next.size = next;
    }

    setAutoSlideDuration(sec) {
        this.options.autoSlideDuration = sec * 1000;
    }

    createButtons() {
        // create elements
        let prevButton = document.createElement('img');
        let nextButton = document.createElement('img');
        let prevDiv = document.createElement('div');
        let nextDiv = document.createElement('div');

        // get inner
        let inner = document.querySelector('.slider__inner');
        let wrapper = document.querySelector('.slider__wrapper');
        // add src to buttons
        prevButton.src = this.options.buttons.prev.img;
        prevButton.alt = this.options.buttons.prev.alt;
        nextButton.src = this.options.buttons.next.img;
        nextButton.alt = this.options.buttons.next.alt;
        // z-index
        prevDiv.style.zIndex = "15";
        nextDiv.style.zIndex = "15";

        // set buttons size
        prevButton.style.width = `${this.options.buttons.prev.size}px`;
        nextButton.style.width = `${this.options.buttons.next.size}px`;

        // set pointer
        prevDiv.style.cursor = "pointer";
        nextDiv.style.cursor = "pointer";

        // set special classes
        prevDiv.classList.add("slider__previous");
        nextDiv.classList.add("slider__next");

        // set absolute
        prevDiv.style.position = "absolute";
        nextDiv.style.position = "absolute";

        // append buttons to their parents
        prevDiv.append(prevButton);
        nextDiv.append(nextButton);
        // set event listeners

        prevDiv.addEventListener("click", () => {
            this.prevSlide();
        })
        nextDiv.addEventListener("click", () => {
            this.nextSlide();
        });

        // append div's to inner
        wrapper.append(prevDiv);
        wrapper.append(nextDiv);

    }

    nextSlide() {
        // get inner
        let inner = document.querySelector('.slider__inner');
        let wrapper = document.querySelector('.slider__wrapper');
        if (this.offset === +window.getComputedStyle(wrapper).width.slice(0, +window.getComputedStyle(wrapper).width.length - 2) * (this.imgs.length - 1) || this.offset > +window.getComputedStyle(wrapper).width.slice(0, +window.getComputedStyle(wrapper).width.length - 2) * (this.imgs.length - 1)) {
            this.offset = 0;
            this.slideIndex = 1;
            inner.style.transform = `translateX(-${this.offset})`;
        } else {
            this.slideIndex++;
            this.offset += +window.getComputedStyle(wrapper).width.slice(0, +window.getComputedStyle(wrapper).width.length - 2);
            inner.style.transform = `translateX(-${this.offset}px)`;
        }
        this.refreshButtons();
    }

    prevSlide() {
        let inner = document.querySelector('.slider__inner');
        let wrapper = document.querySelector('.slider__wrapper');
        if (this.slideIndex === 1) {
            this.slideIndex = this.imgs.length;
            this.offset = +window.getComputedStyle(wrapper).width.slice(0, +window.getComputedStyle(wrapper).width.length - 2) * (this.imgs.length - 1);
            inner.style.transform = `translateX(-${this.offset}px)`;
        } else {
            this.slideIndex--;
            this.offset -= +window.getComputedStyle(wrapper).width.slice(0, +window.getComputedStyle(wrapper).width.length - 2);
            inner.style.transform = `translateX(-${this.offset}px)`;
        }

        this.refreshButtons();
    }

    slideRefresh() {
        let inner = document.querySelector('.slider__inner');
        let wrapper = document.querySelector('.slider__wrapper');
        if (this.slideIndex === 1) {
            this.offset = 0;
        } else if (this.slideIndex >= this.imgs.length) {
            this.offset = +window.getComputedStyle(wrapper).width.slice(0, +window.getComputedStyle(wrapper).width.length - 2) * (this.imgs.length - 1);
            inner.style.transform = `translateX(-${this.offset}px)`;
        } else if (this.slideIndex !== 1 && this.slideIndex < this.imgs.length) {
            this.offset = +window.getComputedStyle(wrapper).width.slice(0, +window.getComputedStyle(wrapper).width.length - 2) * (this.slideIndex - 1);
            inner.style.transform = `translateX(-${this.offset}px)`;
        }
    }

    refreshButtons() {
        let wrapper = document.querySelector(".slider__wrapper");
        let prevDiv = document.querySelector('.slider__previous');
        let nextDiv = document.querySelector('.slider__next');
        nextDiv.style.left = `${window.getComputedStyle(wrapper).width.slice(0, window.getComputedStyle(wrapper).width.length - 2) - 55}px`;
        prevDiv.style.left = "5px";
        prevDiv.style.top = "40%";
        nextDiv.style.top = "40%";
    }

    refresh() {
        let imgs = document.querySelectorAll(".slider__img");
        let wrapper = document.querySelector(".slider__wrapper");
        imgs.forEach(img => {
            img.style.width = window.getComputedStyle(wrapper).width;
        });
        this.refreshButtons();
        this.slideRefresh();
    }

    render() {
        // set special classes
        this.wrapper.classList.add("slider__wrapper");
        this.inner.classList.add("slider__inner");
        this.imgs.forEach(img => {
            img.classList.add("slider__img");
        })
        // append wrapper to parent
        this.parent.append(this.wrapper);
        // append inner to wrapper
        this.wrapper.append(this.inner);
        // move images to inner
        this.imgs.forEach(img => {
            this.inner.append(img);
        });
        // set styles
        this.inner.style.display = "flex";
        this.inner.style.transition = `all ${this.options.transitionDuration}s`;
        this.wrapper.style.overflow = "hidden";
        this.wrapper.style.maxWidth = `${this.width}px`;
        this.wrapper.style.maxHeight = `${this.height}px`;
        this.inner.style.width = 100 * this.imgs.length + "%";
        this.parent.style.position = "relative";

        this.imgs.forEach(img => {
            img.style.width = window.getComputedStyle(this.inner).width.slice(0, window.getComputedStyle(this.inner).width.length - 2) / this.imgs.length + "px";
        });
        this.createButtons();
        this.refresh();
        if (this.options.autoSlide) {
            let autoSlide = setInterval(() => {
                this.nextSlide();
            }, this.options.autoSlideDuration);
        }
        window.addEventListener("resize", () => {
            this.refresh()
        });
    }
}