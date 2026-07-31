// Scroll Animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});

document
    .querySelectorAll(".hidden, .reveal")
    .forEach((el) => observer.observe(el));


// Before / After Slider
document.querySelectorAll(".comparison").forEach((comparison) => {

    const after = comparison.querySelector(".after-img");
    const line = comparison.querySelector(".slider-line");
    const handle = comparison.querySelector(".slider-handle");

    let dragging = false;

    function updateSlider(x){

        const rect = comparison.getBoundingClientRect();

        let position = x - rect.left;

        position = Math.max(0, Math.min(position, rect.width));

        const percent = (position / rect.width) * 100;

        after.style.clipPath = `inset(0 ${100-percent}% 0 0)`;

        line.style.left = percent + "%";

        handle.style.left = percent + "%";

    }

    function startDrag(e){

        if(e.button !== 0) return;

        e.preventDefault();

        dragging = true;

        updateSlider(e.clientX);

    }

    function startTouch(e){

    e.preventDefault();

    dragging = true;

    updateSlider(e.touches[0].clientX);

}

    handle.addEventListener("mousedown", startDrag);
    line.addEventListener("mousedown", startDrag);

    handle.addEventListener("touchstart", startTouch, { passive: false });
line.addEventListener("touchstart", startTouch, { passive: false });

    window.addEventListener("mouseup", () => dragging = false);
    window.addEventListener("touchend", () => dragging = false);

    window.addEventListener("mousemove", (e) => {

        if(!dragging) return;

        updateSlider(e.clientX);

    });

    window.addEventListener("touchmove", (e) => {

        if(!dragging) return;

        updateSlider(e.touches[0].clientX);

    });

});

const nav = document.querySelector("nav");

window.addEventListener("scroll", () => {

    if(window.scrollY>50){

        nav.classList.add("scrolled");

    }else{

        nav.classList.remove("scrolled");

    }

    }, { passive: true });

// Mobile Navigation

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    hamburger.classList.toggle("active");

});

// Close menu after clicking a link

document.querySelectorAll("#nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");
hamburger.classList.remove("active");

    });

});

const slides = document.querySelectorAll(".portfolio-slideshow .slide");

let currentSlide = 0;

if (slides.length > 0) {

    setInterval(() => {

        slides[currentSlide].classList.remove("active");

        currentSlide = (currentSlide + 1) % slides.length;

        slides[currentSlide].classList.add("active");

    }, 6000);

}

const cards = document.querySelectorAll(".portfolio-card");

cards.forEach(card => {

    card.addEventListener("mousemove", e => {

        const rect = card.getBoundingClientRect();

        card.style.setProperty(
            "--x",
            `${e.clientX - rect.left}px`
        );

        card.style.setProperty(
            "--y",
            `${e.clientY - rect.top}px`
        );

    });

});

// Cinematic Intro

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if (!loader) return;

    document.body.style.overflow = "hidden";

    setTimeout(() => {

        loader.classList.add("hide");

        document.body.style.overflow = "";

    }, 1800);

});

// Cinematic Hero Parallax (Optimized)

const hero = document.querySelector(".hero");
const heroContent = document.querySelector(".hero-content");

let heroTicking = false;

window.addEventListener("scroll", () => {

    if (heroTicking) return;

    heroTicking = true;

    requestAnimationFrame(() => {

        const scroll = window.scrollY;

        if (scroll <= window.innerHeight) {

            hero.style.setProperty(
                "--hero-offset",
                `${scroll * 0.22}px`
            );

            heroContent.style.transform =
                `translateY(${scroll * 0.35}px)`;

            heroContent.style.opacity =
                Math.max(0, 1 - scroll / 700);

        }

        heroTicking = false;

    });

}, { passive: true });