const buttons = document.querySelectorAll(".filter-btn");

const photos = document.querySelectorAll(".gallery-item");

buttons.forEach(button => {

    button.addEventListener("click", () => {

        buttons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        const filter = button.dataset.filter;

        photos.forEach(photo => {

    const categories = photo.dataset.category.split(" ");

const show =
    filter === "all" ||
    categories.includes(filter);

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

// ===== Viewer Camera =====

let scale = 1;

let offsetX = 0;
let offsetY = 0;

let dragging = false;

let startMouseX = 0;
let startMouseY = 0;

let startOffsetX = 0;
let startOffsetY = 0;

let imageWidth = 0;
let imageHeight = 0;

const photoCounter = document.getElementById("photo-counter");

const prevBtn = document.querySelector(".lightbox-prev");

const nextBtn = document.querySelector(".lightbox-next");

const featuredImages = document.querySelectorAll(".featured-image");
const galleryImages = document.querySelectorAll(".gallery-item img");

console.log(galleryImages);
console.log(galleryImages.length);

let currentImage = 0;
let currentCollection = galleryImages;

galleryImages.forEach((image) => {

    image.addEventListener("click", () => {

        currentCollection = Array.from(galleryImages).filter(img =>
            img.closest(".gallery-item").style.display !== "none"
        );

        currentImage = currentCollection.indexOf(image);

        lightbox.classList.add("active");

        updateImage();

    });

});

featuredImages.forEach((image, index) => {

    image.addEventListener("click", () => {

        currentCollection = featuredImages;
        currentImage = index;

        lightbox.classList.add("active");

        updateImage();

    });

});

function updateImage(){

    lightboxImage.src =
        currentCollection[currentImage].dataset.full;

        lightboxImage.onload = function(){

    imageWidth = lightboxImage.clientWidth;

    imageHeight = lightboxImage.clientHeight;

};

    photoCounter.textContent =
        `${currentImage + 1} / ${currentCollection.length}`;

    scale = 1;

    offsetX = 0;
    offsetY = 0;

    lightboxImage.style.cursor = "zoom-in";

    applyTransform();

requestAnimationFrame(() => {

    imageWidth = lightboxImage.clientWidth;

    imageHeight = lightboxImage.clientHeight;

});

}

nextBtn.addEventListener("click", (e) => {

    e.stopPropagation();

    currentImage = (currentImage + 1) % currentCollection.length;

    updateImage();

});

prevBtn.addEventListener("click", (e) => {

    e.stopPropagation();

    currentImage = (currentImage - 1 + currentCollection.length) % currentCollection.length;

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

function applyTransform(){

    const viewerWidth = window.innerWidth * 0.9;

    const viewerHeight = window.innerHeight * 0.9;

    const scaledWidth = imageWidth * scale;

    const scaledHeight = imageHeight * scale;

    if(scaledWidth <= viewerWidth){

        offsetX = 0;

    }else{

        const limitX = (scaledWidth - viewerWidth) / 2;

        offsetX = Math.max(
            -limitX,
            Math.min(limitX, offsetX)
        );

    }

    if(scaledHeight <= viewerHeight){

    offsetY = 0;

}else{

    const limitY = (scaledHeight - viewerHeight) / 2;

    offsetY = Math.max(
        -limitY,
        Math.min(limitY, offsetY)
    );

}

    lightboxImage.style.transform =
        `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;

}

lightboxImage.addEventListener("wheel", function(e){

    e.preventDefault();

    const direction = e.deltaY < 0 ? 1 : -1;

    const zoomSpeed = 0.15;

const newScale = scale + direction * zoomSpeed;

scale = Math.min(5, Math.max(1, newScale));

    if(scale < 1){

        scale = 1;

    }

    if(scale > 5){

        scale = 5;

    }

    if(scale === 1){

    offsetX = 0;
    offsetY = 0;

    lightboxImage.style.cursor = "zoom-in";

}else{

    lightboxImage.style.cursor = "grab";

}

    applyTransform();

},{passive:false});

lightboxImage.addEventListener("mousedown", function(e){

    if(e.button !== 0) return; // Left mouse button only

    if(scale <= 1) return;

    e.preventDefault();

    dragging = true;

    startMouseX = e.clientX;
    startMouseY = e.clientY;

    startOffsetX = offsetX;
    startOffsetY = offsetY;

    lightboxImage.style.cursor = "grabbing";

});

document.addEventListener("mousemove", function(e){

    if(!dragging) return;

    offsetX = startOffsetX + (e.clientX - startMouseX);
    offsetY = startOffsetY + (e.clientY - startMouseY);

    applyTransform();

});

window.addEventListener("mouseup", function(){

    dragging = false;

    if(scale > 1){

        lightboxImage.style.cursor = "grab";

    }else{

        lightboxImage.style.cursor = "zoom-in";

    }

});