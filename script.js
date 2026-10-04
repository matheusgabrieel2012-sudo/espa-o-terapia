/* ============================================================
   ESPAÇO TOQUE TERAPÊUTICO
   JAVASCRIPT PRINCIPAL
============================================================ */


/* ============================================================
   DOM READY
============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    initLoader();

    initHeader();

    initMobileMenu();

    initScrollReveal();

    initBackToTop();

    initTestimonialSlider();

    initSmoothLinks();

    initImageFallback();

    updateCurrentYear();

});


/* ============================================================
   LOADER
============================================================ */

function initLoader() {

    const loader = document.getElementById("pageLoader");

    if (!loader) {
        return;
    }

    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.classList.add("loaded");

        }, 450);

    });

}


/* ============================================================
   HEADER
============================================================ */

function initHeader() {

    const header = document.getElementById("siteHeader");

    if (!header) {
        return;
    }

    function updateHeader() {

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

}


/* ============================================================
   MOBILE MENU
============================================================ */

function initMobileMenu() {

    const button =
        document.getElementById("mobileMenuButton");

    const menu =
        document.getElementById("mobileMenu");

    if (!button || !menu) {
        return;
    }


    function toggleMenu() {

        const isOpen =
            menu.classList.toggle("open");

        button.classList.toggle(
            "active",
            isOpen
        );

        button.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        document.body.classList.toggle(
            "menu-open",
            isOpen
        );

    }


    button.addEventListener(
        "click",
        toggleMenu
    );


    const menuLinks =
        menu.querySelectorAll("a");

    menuLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                menu.classList.remove("open");

                button.classList.remove("active");

                button.setAttribute(
                    "aria-expanded",
                    "false"
                );

                document.body.classList.remove(
                    "menu-open"
                );

            }
        );

    });


    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 900) {

                menu.classList.remove("open");

                button.classList.remove("active");

                button.setAttribute(
                    "aria-expanded",
                    "false"
                );

                document.body.classList.remove(
                    "menu-open"
                );

            }

        }
    );

}


/* ============================================================
   SCROLL REVEAL
============================================================ */

function initScrollReveal() {

    const elements =
        document.querySelectorAll(".reveal");

    if (!elements.length) {
        return;
    }


    if (
        !("IntersectionObserver" in window)
    ) {

        elements.forEach(element => {

            element.classList.add("visible");

        });

        return;
    }


    const observer =
        new IntersectionObserver(
            (entries, observerInstance) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add(
                        "visible"
                    );

                    observerInstance.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );


    elements.forEach(element => {

        observer.observe(element);

    });

}


/* ============================================================
   BACK TO TOP
============================================================ */

function initBackToTop() {

    const button =
        document.getElementById("backToTop");

    if (!button) {
        return;
    }


    function updateButton() {

        if (window.scrollY > 700) {

            button.classList.add("show");

        } else {

            button.classList.remove("show");

        }

    }


    window.addEventListener(
        "scroll",
        updateButton,
        { passive: true }
    );


    button.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* ============================================================
   TESTIMONIAL SLIDER
============================================================ */

function initTestimonialSlider() {

    const track =
        document.getElementById(
            "testimonialTrack"
        );

    const previous =
        document.getElementById(
            "prevTestimonial"
        );

    const next =
        document.getElementById(
            "nextTestimonial"
        );

    if (
        !track ||
        !previous ||
        !next
    ) {
        return;
    }


    const cards =
        Array.from(
            track.querySelectorAll(
                ".testimonial-card"
            )
        );


    if (!cards.length) {
        return;
    }


    let currentIndex = 0;


    function getVisibleCards() {

        if (window.innerWidth <= 700) {
            return 1;
        }

        return 2;

    }


    function getMaxIndex() {

        const visible =
            getVisibleCards();

        return Math.max(
            0,
            cards.length - visible
        );

    }


    function updateSlider() {

        const visible =
            getVisibleCards();

        const gap = 22;

        const cardWidth =
            cards[0].getBoundingClientRect().width;

        const offset =
            currentIndex *
            (cardWidth + gap);

        track.style.transform =
            `translateX(-${offset}px)`;


        previous.disabled =
            currentIndex <= 0;

        next.disabled =
            currentIndex >= getMaxIndex();

    }


    previous.addEventListener(
        "click",
        () => {

            currentIndex--;

            if (currentIndex < 0) {
                currentIndex = 0;
            }

            updateSlider();

        }
    );


    next.addEventListener(
        "click",
        () => {

            currentIndex++;

            const max =
                getMaxIndex();

            if (currentIndex > max) {
                currentIndex = max;
            }

            updateSlider();

        }
    );


    window.addEventListener(
        "resize",
        () => {

            const max =
                getMaxIndex();

            if (currentIndex > max) {
                currentIndex = max;
            }

            updateSlider();

        }
    );


    updateSlider();

}


/* ============================================================
   SMOOTH ANCHOR LINKS
============================================================ */

function initSmoothLinks() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    links.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const href =
                    link.getAttribute("href");


                if (
                    !href ||
                    href === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(href);


                if (!target) {
                    return;
                }


                event.preventDefault();


                const header =
                    document.getElementById(
                        "siteHeader"
                    );


                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;


                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight;


                window.scrollTo({

                    top: Math.max(
                        0,
                        targetPosition
                    ),

                    behavior: "smooth"

                });

            }
        );

    });

}


/* ============================================================
   IMAGE FALLBACK
============================================================ */

function initImageFallback() {

    const images =
        document.querySelectorAll("img");


    images.forEach(image => {

        image.addEventListener(
            "error",
            () => {

                /*
                 * Caso uma imagem externa não carregue,
                 * evitamos quebrar o layout.
                 */

                image.classList.add(
                    "image-error"
                );

            }
        );

    });

}


/* ============================================================
   CURRENT YEAR
============================================================ */

function updateCurrentYear() {

    const element =
        document.getElementById(
            "currentYear"
        );


    if (!element) {
        return;
    }


    element.textContent =
        new Date().getFullYear();

}


/* ============================================================
   PARALLAX SUAVE DO HERO
============================================================ */

function initHeroParallax() {

    const heroImage =
        document.querySelector(
            ".hero-image"
        );


    if (!heroImage) {
        return;
    }


    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {
        return;
    }


    let ticking = false;


    function updateParallax() {

        const scroll =
            window.scrollY;

        if (scroll < 900) {

            heroImage.style.transform =
                `scale(1.03) translateY(${scroll * 0.08}px)`;

        }

        ticking = false;

    }


    window.addEventListener(
        "scroll",
        () => {

            if (!ticking) {

                window.requestAnimationFrame(
                    updateParallax
                );

                ticking = true;

            }

        },
        { passive: true }
    );

}


initHeroParallax();


/* ============================================================
   PREVENT DOUBLE CLICK ON WHATSAPP LINKS
============================================================ */

document.addEventListener(
    "click",
    event => {

        const link =
            event.target.closest(
                'a[href*="wa.me"]'
            );


        if (!link) {
            return;
        }


        link.classList.add(
            "whatsapp-clicked"
        );

        setTimeout(() => {

            link.classList.remove(
                "whatsapp-clicked"
            );

        }, 500);

    }
);


/* ============================================================
   CONSOLE BRAND
============================================================ */

console.log(
    "%cEspaço Toque Terapêutico",
    "font-size: 20px; font-weight: bold;"
);

console.log(
    "%cWebsite carregado com sucesso.",
    "font-size: 12px;"
);