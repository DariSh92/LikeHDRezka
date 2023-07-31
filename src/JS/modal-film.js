import Modal from './modal';
import {
  setWatchedFilms,
  getWatchedFilms,
  setQueuedFilms,
  getQueuedFilms,
} from './localStorage';
import img from '../images/index-main/index-main-mobile.jpg';

const BTN_LABELS = {
  ADD_TO_WATCH: 'ADD TO WATCHED',
  REMOVE_FROM_WATCH: 'REMOVE FROM WATCHED',
  ADD_TO_QUEUE: 'ADD TO QUEUE',
  REMOVE_FROM_QUEUE: 'REMOVE FROM QUEUE',
};

function getMarkup({
  image,
  title,
  votes,
  originalTitle,
  averageVotes,
  popularity,
  genre,
  about,
  isWatched,
  isQueued,
}) {
  return `
    <div class="film-card">
      <div class = "film-image-wrapper">
      <img class="film-image" width="290" height="370" src = "${image}" />
      </div>

      <div class = "film-info-wrapper">
      <p class="title film-modal-info"><span class = "title">${title.toUpperCase()}</p> 
      <div class="film-info__inner-wrapper">
    <div class = "wrapper">
      <p class="film-votes film-modal-info"><span class = "votes film-info">Vote / Votes</span><span class = "accent-vote">${averageVotes}</span> /${votes} </p>
      <p class="film-original-title film-modal-info"><span class = "original-title film-info">Original Title</span>${originalTitle}</p>
      <p class="film-popularity film-modal-info"><span class = "popularity film-info">Popularity</span>${popularity}<span></p>
      <p class="genre film-modal-info"><span class = "genre film-info">Genre</span>${genre}</p>
    </div>
    <p class="film-about film-modal-info"><span class = "about-film">ABOUT</span> <br/>   ${about}</p></div>
      <div class = "buttons-wrapper">
      <button class="watched-films-btn">${
        isWatched ? BTN_LABELS.REMOVE_FROM_WATCH : BTN_LABELS.ADD_TO_WATCH
      }</button>
      <button class="queued-films-btn">${
        isQueued ? BTN_LABELS.REMOVE_FROM_QUEUE : BTN_LABELS.ADD_TO_QUEUE
      }</button>
      </div>
      </div>
    </div>
  `;
}

function handleWatchBtnClick(evt, element, onModalChange) {
  const watchedFilms = getWatchedFilms();
  const watchedFilm = watchedFilms.find(x => x.id === element.id);

  if (!watchedFilm) {
    watchedFilms.push(element);
    evt.target.innerText = BTN_LABELS.REMOVE_FROM_WATCH;
  } else {
    const filmIndex = watchedFilms.indexOf(watchedFilm);
    watchedFilms.splice(filmIndex, 1);
    evt.target.innerText = BTN_LABELS.ADD_TO_WATCH;
  }

  setWatchedFilms(watchedFilms);
  if (onModalChange) {
    onModalChange();
  }
}

function handleQueueBtnClick(evt, element, onModalChange) {
  const queuedFilms = getQueuedFilms();
  const queuedFilm = queuedFilms.find(x => x.id === element.id);

  if (!queuedFilm) {
    queuedFilms.push(element);
    evt.target.innerText = BTN_LABELS.REMOVE_FROM_QUEUE;
  } else {
    const filmIndex = queuedFilms.indexOf(queuedFilm);
    queuedFilms.splice(filmIndex, 1);
    evt.target.innerText = BTN_LABELS.ADD_TO_QUEUE;
  }

  setQueuedFilms(queuedFilms);

  if (onModalChange) {
    onModalChange();
  }
}

function handleModalOpen(modal, element, onModalChange) {
  const addToWatch = modal.querySelector('.watched-films-btn');
  const addToQueue = modal.querySelector('.queued-films-btn');

  addToWatch.addEventListener('click', evt =>
    handleWatchBtnClick(evt, element, onModalChange)
  );
  addToQueue.addEventListener('click', evt =>
    handleQueueBtnClick(evt, element, onModalChange)
  );
}

export default function onModalEvents(evt, onModalChange) {
  evt.preventDefault();
  const films = JSON.parse(localStorage.getItem('films'));
  const genres = JSON.parse(localStorage.getItem('genres'));
  const id = Number(evt.target.dataset.id);
  const element = films.find(el => id === el.id);

  if (!element) return;

  const watchedFilms = getWatchedFilms();
  const isWatched = watchedFilms.some(el => el.id === id);
  const queuedFilms = getQueuedFilms();
  const isQueued = queuedFilms.some(el => el.id === id);

  const genreName = element.genre_ids
    .map(element => genres.genres.find(genre => genre.id === element))
    .map(element => element.name)
    .join(', ');
  const filmData = {
    image: element.poster_path
      ? `https://image.tmdb.org/t/p/w500${element.poster_path}`
      : img,
    title: element.title,
    votes: element.vote_count,
    originalTitle: element.original_title,
    averageVotes: element.vote_average.toFixed(2),
    popularity: element.popularity.toFixed(2),
    genre: genreName,
    about: element.overview,
    isWatched: isWatched,
    isQueued: isQueued,
  };
  const markup = getMarkup(filmData);
  const filmCard = document.createElement('div');

  filmCard.innerHTML = markup;
  new Modal(filmCard, modal => handleModalOpen(modal, element, onModalChange));
}
