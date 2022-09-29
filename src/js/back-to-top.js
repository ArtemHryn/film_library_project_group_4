const scrollBtn = document.querySelector(".turn-to-top__btn");

const btnVisibility = () => {
  if (window.scrollY > 634) {
    scrollBtn.classList.toggle("visually-hidden", false)
  } else {
    scrollBtn.classList.toggle("visually-hidden", true)
  }
};

document.addEventListener("scroll", () => {
  btnVisibility();
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
