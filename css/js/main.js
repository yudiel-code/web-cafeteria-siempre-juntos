const footerText = document.querySelector(".site-footer p");

if (footerText) {
  const year = new Date().getFullYear();
  footerText.textContent = `© ${year} Siempre Juntos. Todos los derechos reservados. | JS OK`;
}

const galleryFoodTrigger = document.getElementById("galleryFoodTrigger");
const galleryModal = document.getElementById("galleryModal");
const galleryModalBackdrop = document.getElementById("galleryModalBackdrop");
const galleryModalClose = document.getElementById("galleryModalClose");
const galleryModalImage = document.getElementById("galleryModalImage");
const galleryModalPrev = document.getElementById("galleryModalPrev");
const galleryModalNext = document.getElementById("galleryModalNext");

const galleryImages = [
  "img/galeria-4.jpg",
  "img/galeria-comida-2.jpg",
  "img/galeria-comida-3.jpg"
];

let currentGalleryIndex = 0;

function updateGalleryImage() {
  if (!galleryModalImage || !galleryImages.length) return;

  galleryModalImage.src = galleryImages[currentGalleryIndex];
  galleryModalImage.alt = `Foto ${currentGalleryIndex + 1} de hamburguesas y comida`;
}

function openGalleryModal(startIndex = 0) {
  if (!galleryModal || !galleryModalImage) return;

  currentGalleryIndex = startIndex;
  updateGalleryImage();
  galleryModal.classList.add("is-open");
  galleryModal.style.display = "flex";
  galleryModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeGalleryModal() {
  if (!galleryModal) return;

  galleryModal.classList.remove("is-open");
  galleryModal.style.display = "";
  galleryModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function showPreviousImage() {
  if (!galleryImages.length) return;

  currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
  updateGalleryImage();
}

function showNextImage() {
  if (!galleryImages.length) return;

  currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
  updateGalleryImage();
}

if (galleryFoodTrigger && galleryModal && galleryModalImage) {
  galleryFoodTrigger.onclick = () => {
    openGalleryModal(0);
  };

  galleryFoodTrigger.onkeydown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openGalleryModal(0);
    }
  };
}

if (galleryModalClose) {
  galleryModalClose.onclick = closeGalleryModal;
}

if (galleryModalBackdrop) {
  galleryModalBackdrop.onclick = closeGalleryModal;
}

if (galleryModalPrev) {
  galleryModalPrev.onclick = showPreviousImage;
}

if (galleryModalNext) {
  galleryModalNext.onclick = showNextImage;
}

document.addEventListener("keydown", (event) => {
  if (!galleryModal || !galleryModal.classList.contains("is-open")) return;

  if (event.key === "Escape") closeGalleryModal();
  if (event.key === "ArrowLeft") showPreviousImage();
  if (event.key === "ArrowRight") showNextImage();
});