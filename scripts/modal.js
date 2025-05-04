document.addEventListener("DOMContentLoaded", () => {
  const images = Array.from(document.querySelectorAll(".production__img"));
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-image");
  const modalClose = document.getElementById("modal-close");
  const modalOverlay = document.getElementById("modal-overlay");
  const modalPrev = document.getElementById("modal-prev");
  const modalNext = document.getElementById("modal-next");

  let currentIndex = 0;

  const openModal = (index) => {
    currentIndex = index;
    const smallSrc = images[index].getAttribute("src");
    const largeSrc = smallSrc.replace("/small/", "/large/");
    modalImg.src = largeSrc;
    modal.classList.add("active");
  };

  const closeModal = () => {
    modal.classList.remove("active");
    modalImg.src = "";
  };

  const showPrev = () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    openModal(currentIndex);
  };

  const showNext = () => {
    currentIndex = (currentIndex + 1) % images.length;
    openModal(currentIndex);
  };

  images.forEach((img, index) => {
    img.addEventListener("click", () => openModal(index));
  });

  modalClose.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", closeModal);
  modalPrev.addEventListener("click", showPrev);
  modalNext.addEventListener("click", showNext);

  let touchStartX = 0;
  let touchEndX = 0;

  modalImg.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  modalImg.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    if (touchEndX < touchStartX - 50) showNext();
    if (touchEndX > touchStartX + 50) showPrev();
  }

  document.addEventListener("keydown", (e) => {
    const modal = document.getElementById("image-modal");
    if (!modal.classList.contains("active")) return;

    switch (e.key) {
      case "Escape":
        closeModal();
        break;
      case "ArrowLeft":
        showPrev();
        break;
      case "ArrowRight":
        showNext();
        break;
    }
  });
});
