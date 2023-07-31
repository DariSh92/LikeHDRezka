export const slider = root => {
  const slidesContainer = root.querySelector('#slides-container');
  const slide = root.querySelector('.slide');
  const prevButton = root.querySelector('#slide-arrow-prev');
  const nextButton = root.querySelector('#slide-arrow-next');

  nextButton.addEventListener('click', () => {
    const slideWidth = slide.clientWidth;
    slidesContainer.scrollLeft += slideWidth;
  });

  prevButton.addEventListener('click', () => {
    const slideWidth = slide.clientWidth;
    slidesContainer.scrollLeft -= slideWidth;
  });
};
