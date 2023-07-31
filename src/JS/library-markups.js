import { getFromLocalStorage } from './localStorage';
export { markupMovies };
import img from '../images/index-main/index-main-mobile.jpg';

function markupMovies(films) {
  return films
    .map(
      ({
        id,
        title,
        name,
        poster_path,
        genre_ids,
        release_date,
        first_air_date,
        vote_average,
        vote = vote_average.toFixed(1) || ' - ',
        year = release_date || first_air_date || ' - ',
      }) => {
        const parseGenres = getFromLocalStorage('genres');

        const genreName = genre_ids.map(element =>
          parseGenres.genres.find(genre => genre.id === element)
        );
        let genreOutput;
        if (genre_ids.length > 3) {
          genreOutput = genreName.map(element => element.name).slice(0, 2);
          genreOutput.push('Other');
        } else {
          genreOutput = genreName.map(element => element.name);
        }

        const defaultImg = !poster_path
          ? img
          : `https://image.tmdb.org/t/p/w500${poster_path}`;

        return `<li class="gallery__item">
                <a class="gallery__link" href="">
                    <img class="gallery__image" data-id=${id} src=${defaultImg} alt="${title}" loading="lazy">
                </a>
                <div class="gallery__info">
                    <p class="gallery__title">${title || name}</p>
                    <p class="gallery__genre">${genreOutput.join(', ')}</p>
                    <p class="gallery__year">${year.slice(0, 4)}</p>
                    <p class="gallery__vote">${vote}</p>
                </div>
            </li>`;
      }
    )
    .join('');
}
