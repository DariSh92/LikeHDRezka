function getFromLocalStorage(key) {
  const savedMovies = localStorage.getItem(key);
  return JSON.parse(savedMovies);
}

function setWatchedFilms(films) {
  localStorage.setItem('watchedFilms', JSON.stringify(films));
}

function getWatchedFilms() {
  return getFromLocalStorage('watchedFilms') || [];
}

function setQueuedFilms(films) {
  localStorage.setItem('queuedFilms', JSON.stringify(films));
}

function getQueuedFilms() {
  return getFromLocalStorage('queuedFilms') || [];
}

function setTheme(theme) {
  return localStorage.setItem('theme', theme);
}

function getTheme() {
  return localStorage.getItem('theme');
}

export {
  getFromLocalStorage,
  setWatchedFilms,
  getWatchedFilms,
  setQueuedFilms,
  getQueuedFilms,
  setTheme,
  getTheme,
};
