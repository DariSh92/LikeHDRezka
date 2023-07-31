import { markupMovies } from './library-markups';
import { paginationMarkup, paginationMarkupMobile } from './pagination-markups';
import { getFromLocalStorage } from './localStorage';
import onModalEvents from './modal-film';

export { pagination };

const moviesList = document.querySelector('.gallery');
const paginationNav = document.querySelector('.pagination__wrapper');
const paginationWrapper = document.querySelector('.pagination__pages');
const nextButton = document.querySelector('#next-button');
const prevButton = document.querySelector('#prev-button');

let currentPage;
let pageCount;
const paginationLimit = 9;
let movies = [];

prevButton.addEventListener('click', () => {
  renderPage(currentPage - 1);
});

nextButton.addEventListener('click', () => {
  renderPage(currentPage + 1);
});

paginationWrapper.addEventListener('click', e => {
  if (e.target.hasAttribute('page-index')) {
    renderPage(Number(e.target.getAttribute('page-index')));
  }
});

//Render and pagination
function pagination(key) {
  updateMovies(key);

  if (!movies.length) {
    paginationNav.classList.add('hidden');
    return;
  }
  currentPage = 1;
  paginationNav.classList.remove('hidden');
  pageCount = Math.ceil(movies.length / paginationLimit);

  renderPage(currentPage);
}

function updateMovies(key) {
  movies = getFromLocalStorage(key);

  if (!movies || !movies.length) {
    movies = [];
    clearContainer(moviesList);
    insertListItems('Oops...Nothing added.');
    return;
  }
}

function renderPage(pageNum) {
  currentPage = pageNum;
  const prevRange = (pageNum - 1) * paginationLimit;
  const currRange = pageNum * paginationLimit;
  const currentMovies = movies.slice(prevRange, currRange);
  clearContainer(moviesList);
  insertListItems(markupMovies(currentMovies));
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
  moviesList.insertAdjacentHTML('beforeend', items);
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

moviesList.addEventListener('click', evt => {
  onModalEvents(evt, () => {
    pagination(localStorage.getItem(`page`));
  });
});
