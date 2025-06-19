document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("popup");
  const openPopup = document.getElementById("openPopup");
  const closePopup = document.getElementById("closePopup");

  if (openPopup && closePopup && popup) {
    openPopup.addEventListener("click", () => popup.classList.remove("hidden"));
    closePopup.addEventListener("click", () => popup.classList.add("hidden"));
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") popup.classList.add("hidden");
    });
  }

  const imagePicker = document.getElementById("imagePicker");
  const gallery = document.getElementById("gallery");

  const images = {
    nature: ["img/nature1.png", "img/nature2.png"],
    cities: ["img/city1.jpg", "img/city2.jpg"],
    people: ["img/people1.jpg", "img/people2.jpg"]
  };

  if (imagePicker && gallery) {
    imagePicker.addEventListener("change", e => {
      const value = e.target.value;
      gallery.innerHTML = images[value]
        .map(src => `<img src="${src}" alt="">`)
        .join("");
    });
    imagePicker.dispatchEvent(new Event("change"));
  }

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxClose = document.getElementById("lightboxClose");

  if (lightbox && lightboxImg && lightboxClose) {
    document.addEventListener("click", e => {
      if (e.target.matches(".gallery img")) {
        lightboxImg.src = e.target.src;
        lightbox.classList.remove("hidden");
        lightbox.classList.add("fade-in");
      }
    });

    lightboxClose.addEventListener("click", () => {
      lightbox.classList.add("hidden");
      lightbox.classList.remove("fade-in");
    });

    document.addEventListener("keydown", e => {
      if (e.key === "Escape") {
        lightbox.classList.add("hidden");
        lightbox.classList.remove("fade-in");
      }
    });
  }

  const accordionHeaders = document.querySelectorAll(".accordion-header");

  accordionHeaders.forEach(header => {
    header.addEventListener("click", () => {
      const content = header.nextElementSibling;
      const isOpen = content.style.display === "block";
      document.querySelectorAll(".accordion-content").forEach(c => c.style.display = "none");
      content.style.display = isOpen ? "none" : "block";
    });
  });

  const track = document.getElementById("carouselTrack");
  const prev = document.getElementById("prev");
  const next = document.getElementById("next");

  let index = 0;
  if (track && prev && next) {
    const total = track.children.length;

    function updateCarousel() {
      track.style.transform = `translateX(-${index * 320}px)`;
    }

    next.addEventListener("click", () => {
      index = (index + 1) % total;
      updateCarousel();
    });

    prev.addEventListener("click", () => {
      index = (index - 1 + total) % total;
      updateCarousel();
    });

    document.addEventListener("keydown", e => {
      if (e.key === "ArrowRight") next.click();
      if (e.key === "ArrowLeft") prev.click();
    });

    updateCarousel();
  }
});
