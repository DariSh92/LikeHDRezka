import { getTheme, setTheme } from "./localStorage";
export { setPageTheme };

const checkBox = document.getElementById("myCheck");

function setPageTheme() {
  const themeRenderFooter = document.querySelector(".footer");
  const footerRights = document.querySelector(".footer__rights");
  const footerDevs = document.querySelector(".footer__devs");
  const titleRenderTheme = document.querySelector("body");
  const galleryTitleBlack = document.querySelectorAll(".gallery__title");
  const paginationBtns = document.querySelectorAll(".pagination__number");
  const paginationArrows = document.querySelectorAll(".pagination__arrow");
  const modalWindow = document.querySelector(".modal-footer");
  const filmModal = document.querySelector("film-card");

  if (getTheme() === "dark") {
    titleRenderTheme.classList.add("darkTheme");
    themeRenderFooter.classList.add("darkTheme");
    modalWindow.classList.add("darkTheme");
    footerRights.classList.add("darkTheme__light-text");
    footerDevs.classList.add("darkTheme__light-text");

    paginationBtns.forEach((el) => el.classList.add("darkTheme__light-text"));
    paginationArrows.forEach((el) => el.classList.add("darkTheme__light-text"));
    galleryTitleBlack.forEach((el) =>
      el.classList.add("darkTheme__light-text")
    );

    checkBox.checked = true;
  } else {
    titleRenderTheme.classList.remove("darkTheme");
    themeRenderFooter.classList.remove("darkTheme");
    modalWindow.classList.remove("darkTheme");
    footerRights.classList.remove("darkTheme__light-text");
    footerDevs.classList.remove("darkTheme__light-text");
    paginationBtns.forEach((el) =>
      el.classList.remove("darkTheme__light-text")
    );
    paginationArrows.forEach((el) =>
      el.classList.remove("darkTheme__light-text")
    );
    galleryTitleBlack.forEach((el) =>
      el.classList.remove("darkTheme__light-text")
    );
    checkBox.checked = false;
  }
}

checkBox.addEventListener("change", (evt) => {
  const theme = evt.target.checked ? "dark" : "light";
  setTheme(theme);
  setPageTheme();
});

setTimeout(setPageTheme, 100);
