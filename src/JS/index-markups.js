import { getFromLocalStorage } from './localStorage';
import img from '../images/index-main/index-main-mobile.jpg';

export { markupMovies };

function markupMovies(films) {
  const parseGenres = getFromLocalStorage('genres');
  const markup = films.results
    .map(
      ({
        title,
        id,
        poster_path,
        genre_ids,
        release_date,
        first_air_date,
        year = release_date || first_air_date || ' - ',
      }) => {
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
            <a class="gallery__link"  href="">
                <img class="gallery__image" data-id=${id} src="${defaultImg}" alt="${title}" loading="lazy">
            </a>
            <div class="gallery__info">
                <p class="gallery__title cut-text">${title}</p>

                <p class="gallery__genre">${genreOutput.join(', ')}</p>     
                <p class="gallery__year">${year.slice(0, 4)}</p>

            </div>
        </li>`;
      }
    )
    .join('');
  return markup;
}
