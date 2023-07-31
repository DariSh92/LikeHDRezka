import { pagination } from './JS/library-main';
import { modalFooter } from './JS/modal-footer';
import './JS/themeRender';

const watchedButton = document.querySelector('.button_watched');
const queueButton = document.querySelector('.button_queue');

const watchedKey = 'watchedFilms';
const queuedKey = 'queuedFilms';

const watchedMovies = () => {
  pagination(watchedKey);
  queueButton.classList.remove('button_queue');
  watchedButton.classList.add('button_queue');
  watchedButton.classList.remove('button_watched');
  queueButton.classList.add('button_watched');
  localStorage.setItem('page', watchedKey);
};

const queuedMovies = () => {
  pagination(queuedKey);
  watchedButton.classList.remove('button_queue');
  queueButton.classList.add('button_queue');
  queueButton.classList.remove('button_watched');
  watchedButton.classList.add('button_watched');
  localStorage.setItem('page', queuedKey);
};

window.addEventListener('load', () => {
  const data = localStorage.getItem('page');
  data === watchedKey ? watchedMovies() : queuedMovies();
});

watchedButton.addEventListener('click', watchedMovies);

queueButton.addEventListener('click', queuedMovies);

modalFooter();
