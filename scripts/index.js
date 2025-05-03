document.addEventListener("DOMContentLoaded", function () {
  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach((dropdown) => {
    const dropdownBtn = dropdown.querySelector(".dropdown__btn");
    const dropdownList = dropdown.querySelector(".dropdown__list");
    const dropdownItems = dropdown.querySelectorAll(".dropdown__item");
    const dropdownSelected = dropdown.querySelector(".dropdown__selected");
    const dropdownArrow = dropdown.querySelector(".dropdown__arrow");

    dropdownBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      const isOpen = dropdownList.style.display === "flex";
      dropdownList.style.display = isOpen ? "none" : "flex";
      dropdownArrow.style.transform = isOpen
        ? "rotate(0deg)"
        : "rotate(180deg)";
    });

    dropdownItems.forEach((item) => {
      item.addEventListener("click", function () {
        const lang = this.getAttribute("data-lang");
        dropdownSelected.textContent = lang;
        dropdownList.style.display = "none";
        dropdownArrow.style.transform = "rotate(0deg)";
      });
    });

    document.addEventListener("click", function (e) {
      if (!dropdown.contains(e.target)) {
        dropdownList.style.display = "none";
        dropdownArrow.style.transform = "rotate(0deg)";
      }
    });
  });

  const burgerBtn = document.getElementById("burger-btn");
  const burgerImg = document.getElementById("burger-img");
  const headerNavMobile = document.getElementById("header__nav-mobile");
  const body = document.querySelector("body");

  burgerBtn.addEventListener("click", function () {
    headerNavMobile.classList.toggle("visible");
    body.classList.toggle("stop-scrolling");

    burgerImg.src = burgerImg.src.endsWith("burger.png")
      ? "./assets/icons/header/cross.png"
      : "./assets/icons/header/burger.png";
  });
});
