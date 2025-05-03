document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".swiper__slides-wrapper");
  const slides = Array.from(wrapper.children);
  const prevBtn = document.querySelector(".swiper__btn-prev");
  const nextBtn = document.querySelector(".swiper__btn-next");
  const pagination = document.querySelector(".swiper__pagination");
  const sliderContainer = document.querySelector(".swiper");

  let index = 0;
  let isDragging = false;
  let startX = 0;
  let deltaX = 0;

  function updateSlider() {
    const slideWidth = slides[0].offsetWidth;
    const offset = (wrapper.offsetWidth - slideWidth) / 2 - slideWidth * index;
    wrapper.style.transform = `translateX(${offset}px)`;

    slides.forEach((slide, i) => {
      slide.classList.remove("active", "inactive");
      if (i === index) {
        slide.classList.add("active");
      } else {
        slide.classList.add("inactive");
      }
    });

    document.querySelectorAll(".swiper__pagination-bullet").forEach((b, i) => {
      b.classList.toggle("active", i === index);
    });
  }

  function goTo(newIndex) {
    if (newIndex < 0) {
      index = slides.length - 1;
    } else if (newIndex >= slides.length) {
      index = 0;
    } else {
      index = newIndex;
    }
    updateSlider();
  }

  function createPagination() {
    slides.forEach((_, i) => {
      const bullet = document.createElement("div");
      bullet.className = "swiper__pagination-bullet";
      bullet.addEventListener("click", () => {
        index = i;
        updateSlider();
      });
      pagination.appendChild(bullet);
    });
  }

  prevBtn.addEventListener("click", () => {
    goTo(index - 1);
  });
  nextBtn.addEventListener("click", () => {
    goTo(index + 1);
  });

  sliderContainer.addEventListener(
    "touchstart",
    (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    },
    { passive: true }
  );
  sliderContainer.addEventListener(
    "touchmove",
    (e) => {
      if (!isDragging) return;
      deltaX = e.touches[0].clientX - startX;
    },
    { passive: true }
  );
  sliderContainer.addEventListener(
    "touchend",
    () => {
      if (!isDragging) return;
      if (Math.abs(deltaX) > 50) {
        if (deltaX > 0) goTo(index - 1);
        else goTo(index + 1);
      }
      isDragging = false;
      deltaX = 0;
    },
    { passive: false }
  );

  createPagination();
  updateSlider();

  window.addEventListener("resize", () => {
    updateSlider();
  });
});
