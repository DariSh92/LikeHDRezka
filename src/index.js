import { pagination, paginationforQuery } from './JS/pagination';
import { fetchPopFilms } from './JS/main';
import { modalFooter } from './JS/modal-footer';
import { fetchQueryFilm } from './JS/main';
import { fetchGenres } from './JS/main';
import './JS/themeRender';

function moviesRender() {
  if (localStorage.getItem('genres')) {
    fetchPopFilms(1).then(pagination);
  } else {
    fetchGenres().then(res => {
      fetchPopFilms(1).then(res => pagination(res));
    });
  }
}

moviesRender();

// поиск по ключевому слову
let searchData;
export { searchData };

const formRef = document.querySelector('.header-search-form');
const searchMessage = document.querySelector('.header-info__text');

formRef.addEventListener('submit', onSearch);
function onSearch(e) {
  e.preventDefault();
  searchData = formRef.elements.searchQuery.value.trim();
  //
  if (searchData !== '') {
    fetchQueryFilm(1, searchData)
      .then(x => {
        if (!x.total_results) {
          searchMessage.innerHTML =
            'Search result not successful. Enter the correct movie name and try again.';
        } else {
          searchMessage.innerHTML = '';
        }

        return x;
      })
      .then(paginationforQuery);
  }
}

// SCROLL
const progressBar = document.querySelector('.progress-bar');
window.addEventListener('scroll', moveProgressBar);

function moveProgressBar() {
  const windowScroll =
    document.body.scrollTop || document.documentElement.scrollTop;
  const windowHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const width_progress_line = (windowScroll / windowHeight) * 100;
  progressBar.style.width = width_progress_line + '%';
}

modalFooter();
