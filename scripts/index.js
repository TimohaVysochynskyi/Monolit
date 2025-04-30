document.addEventListener("DOMContentLoaded", function () {
  const dropdownBtn = document.querySelector(".dropdown__btn");
  const dropdownList = document.querySelector(".dropdown__list");
  const dropdownItems = document.querySelectorAll(".dropdown__item");
  const dropdownSelected = document.getElementById("dropdown-selected");
  const dropdownArrow = document.getElementById("dropdown-arrow-1");

  dropdownBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    dropdownList.style.display =
      dropdownList.style.display === "flex" ? "none" : "flex";

    dropdownArrow.style.transform =
      dropdownArrow.style.transform === "rotate(180deg)"
        ? "rotate(0deg)"
        : "rotate(180deg)";
  });

  dropdownItems.forEach((item) => {
    item.addEventListener("click", function () {
      const lang = this.getAttribute("data-lang");
      dropdownSelected.textContent = lang;
      dropdownList.style.display = "none";
    });
  });

  document.addEventListener("click", function (e) {
    if (!dropdownList.contains(e.target) && !dropdownBtn.contains(e.target)) {
      dropdownList.style.display = "none";
    }
  });
});
