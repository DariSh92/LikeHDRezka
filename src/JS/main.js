import { API_KEY } from "./const/api-key";
import onModalEvents from "./modal-film";
// import { currentPage } from './pagination';
// import { setPageTheme } from './themeRender';

import { searchData } from "../index";

const galleryRef = document.querySelector(".gallery");

function fetchGenres() {
  return Promise.resolve(
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
    )
      .then((res) => res.json())
      .then((genres) => {
        localStorage.setItem("genres", JSON.stringify(genres));
        return genres;
      })
  );
}

export { fetchGenres };

// Фетч популярных фильмов
const fetchPopFilms = async (page) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&language=en-US&page=${page}`
  );

  const films = await response.json();
  const parsedFilms = JSON.stringify(films.results);
  localStorage.setItem("films", parsedFilms);
  return films;
};
export { fetchPopFilms };

// фетч по ключевому слову
const fetchQueryFilm = async (page) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchData}&page=${page}&include_adult=false`
  );
  const films = await response.json();
  const parsedFilms = JSON.stringify(films.results);
  localStorage.setItem("films", parsedFilms);
  return films;
};
export { fetchQueryFilm };

//Парсінг жанрів
galleryRef.addEventListener("click", onModalEvents);

//Спіннер
const preloader = document.querySelector("#preloader");

preloader.classList.add("show-preloader");

window.addEventListener("load", function () {
  setTimeout(function () {
    preloader.classList.remove("show-preloader");
  }, 500);
});

//Скролл

const btnUp = {
  el: document.querySelector(".btn-up"),
  show() {
    // удалим у кнопки класс btn-up_hide
    this.el.classList.remove("btn-up_hide");
  },
  hide() {
    // добавим к кнопке класс btn-up_hide
    this.el.classList.add("btn-up_hide");
  },
  addEventListener() {
    // при прокрутке содержимого страницы
    window.addEventListener("scroll", () => {
      // определяем величину прокрутки
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      // если страница прокручена больше чем на 400px, то делаем кнопку видимой, иначе скрываем
      scrollY > 400 ? this.show() : this.hide();
    });
    // при нажатии на кнопку .btn-up
    document.querySelector(".btn-up").onclick = () => {
      // переместим в начало страницы
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    };
  },
};

btnUp.addEventListener();
