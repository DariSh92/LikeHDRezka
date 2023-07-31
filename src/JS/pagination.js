import { markupMovies } from './index-markups';

import { paginationMarkup, paginationMarkupMobile } from './pagination-markups';

import { fetchPopFilms, fetchQueryFilm } from './main';
import { setPageTheme } from './themeRender';

export { pagination };
export { currentPage };

const galleryRef = document.querySelector('.gallery');
const paginationNav = document.querySelector('.pagination__wrapper');
const paginationWrapper = document.querySelector('.pagination__pages');
const nextButton = document.querySelector('#next-button');
const prevButton = document.querySelector('#prev-button');

let currentPage;
let pageCount;
const paginationLimit = 20;
let movies;

prevButton.addEventListener('click', () => {
  fetchPopFilms(currentPage - 1).then(renderPage);
});

nextButton.addEventListener('click', () => {
  fetchPopFilms(currentPage + 1).then(renderPage);
});

paginationWrapper.addEventListener('click', e => {
  if (e.target.hasAttribute('page-index')) {
    fetchPopFilms(Number(e.target.getAttribute('page-index'))).then(renderPage);
  }
});

//Render and pagination
function pagination(films) {
  movies = films;

  if (!movies.results.length) {
    paginationNav.classList.add('hidden');
    return;
  }

  // paginationNav.classList.remove('hidden');
  pageCount = Math.ceil(movies.total_results / paginationLimit);
  renderPage(films);
  setPageTheme();
}

function renderPage(films) {
  currentPage = films.page;
  const currentMovies = films.results;
  clearContainer(galleryRef);
  insertListItems(markupMovies(films));
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });

  const width = document.documentElement.clientWidth;
  width >= 768
    ? getPaginationNumbers(paginationMarkup(currentPage, pageCount))
    : getPaginationNumbers(paginationMarkupMobile(currentPage, pageCount));
  handleActivePageNumber();
  handlePageButtonsStatus();
  setPageTheme();
}

function getPaginationNumbers(items) {
  clearContainer(paginationWrapper);

  const pages = items.map(item => {
    if (typeof item === 'number') {
      const pageNumber = document.createElement('button');
      pageNumber.className = 'pagination__number';
      pageNumber.innerHTML = item;
      pageNumber.setAttribute('page-index', item);
      pageNumber.setAttribute('aria-label', 'Page ' + item);
      return pageNumber;
    }

    if (typeof item === 'string') {
      const dots = document.createElement('span');
      dots.innerHTML = item;
      return dots;
    }
  });
  paginationWrapper.append(...pages);
}

function insertListItems(items) {
  galleryRef.insertAdjacentHTML('beforeend', items);
}

function clearContainer(container) {
  container.innerHTML = '';
}

// Handle pagination buttons

function handleActivePageNumber() {
  document.querySelectorAll('.pagination__number').forEach(button => {
    button.classList.remove('activePage');

    const pageIndex = Number(button.getAttribute('page-index'));

    if (pageIndex === currentPage) {
      button.classList.add('activePage');
    }
  });
}

function disableButton(button) {
  button.classList.add('hidden');
}

function enableButton(button) {
  button.classList.remove('hidden');
}

function handlePageButtonsStatus() {
  if (currentPage === 1) {
    disableButton(prevButton);
  } else {
    enableButton(prevButton);
  }

  if (pageCount === currentPage) {
    disableButton(nextButton);
  } else {
    enableButton(nextButton);
  }
}

function paginationforQuery(films) {
  movies = films;

  if (!movies.results.length) {
    paginationNav.classList.add('hidden');
    return;
  }

  // paginationNav.classList.remove('hidden');
  pageCount = Math.ceil(movies.total_results / paginationLimit);
  renderPage(films);
  setPageTheme();

  prevButton.addEventListener('click', () => {
    fetchQueryFilm(currentPage - 1).then(renderPage);
  });

  nextButton.addEventListener('click', () => {
    fetchQueryFilm(currentPage + 1).then(renderPage);
  });

  paginationWrapper.addEventListener('click', e => {
    if (e.target.hasAttribute('page-index')) {
      fetchQueryFilm(Number(e.target.getAttribute('page-index'))).then(
        renderPage
      );
    }
  });
}
export { paginationforQuery };
