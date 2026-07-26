const buttons = document.querySelectorAll(".filter-btn");

const photos = document.querySelectorAll(".gallery-item");

buttons.forEach(button => {

    button.addEventListener("click", () => {

        buttons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        const filter = button.dataset.filter;

        photos.forEach(photo => {

    const show =
        filter === "all" ||
        photo.dataset.category === filter;

    if(show){

        photo.style.display = "block";

        requestAnimationFrame(() => {

            photo.classList.remove("hidden");

        });

    }else{

        photo.classList.add("hidden");

        setTimeout(() => {

            photo.style.display = "none";

        }, 350);

    }

});

    });

});

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightbox-image");

const photoCounter = document.getElementById("photo-counter");

const prevBtn = document.querySelector(".lightbox-prev");

const nextBtn = document.querySelector(".lightbox-next");

const galleryImages = document.querySelectorAll(
    ".gallery-item img, .featured-image"
);

console.log(galleryImages);
console.log(galleryImages.length);

let currentImage = 0;

galleryImages.forEach((image, index) => {

    image.addEventListener("click", () => {

        currentImage = index;

        lightbox.classList.add("active");

        updateImage();

    });

});

function updateImage(){

    lightboxImage.src = galleryImages[currentImage].src;

    photoCounter.textContent =
        `${currentImage + 1} / ${galleryImages.length}`;

}

nextBtn.addEventListener("click", (e) => {

    e.stopPropagation();

    currentImage = (currentImage + 1) % galleryImages.length;

    updateImage();

});

prevBtn.addEventListener("click", (e) => {

    e.stopPropagation();

    currentImage = (currentImage - 1 + galleryImages.length) % galleryImages.length;

    updateImage();

});

lightbox.addEventListener("click", (e) => {

    if(

        e.target === lightbox ||

        e.target.classList.contains("close-lightbox")

    ){

        lightbox.classList.remove("active");

    }

});

document.addEventListener("keydown", (e) => {

    if(!lightbox.classList.contains("active")) return;

    if(e.key === "ArrowRight"){

        nextBtn.click();

    }

    else if(e.key === "ArrowLeft"){

        prevBtn.click();

    }

    else if(e.key === "Escape"){

        lightbox.classList.remove("active");

    }

});