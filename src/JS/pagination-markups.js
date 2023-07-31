export { paginationMarkup, paginationMarkupMobile };

function paginationMarkup(currentPage, pageCount) {
  if (pageCount <= 1) return [1];
  const center = [
    currentPage - 2,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    currentPage + 2,
  ];

  const filteredCenter = center.filter(p => p > 1 && p < pageCount);
  const includeThreeLeft = currentPage === 5;
  const includeThreeRight = currentPage === pageCount - 4;
  const includeLeftDots = currentPage > 5;
  const includeRightDots = currentPage < pageCount - 4;

  if (includeThreeLeft) filteredCenter.unshift(2);
  if (includeThreeRight) filteredCenter.push(pageCount - 1);

  if (includeLeftDots) filteredCenter.unshift('...');
  if (includeRightDots) filteredCenter.push('...');

  return [1, ...filteredCenter, pageCount];
}

function paginationMarkupMobile(currentPage, pageCount) {
  if (pageCount <= 1) return [1];
  const center = [
    currentPage - 2,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    currentPage + 2,
  ];

  const filteredCenter = center.filter(p => p >= 1 && p <= pageCount);
  const includeTwoRight = currentPage === 1;
  const includeOneRight = currentPage === 2;

  if (includeTwoRight) filteredCenter.push(currentPage + 3, currentPage + 4);
  if (includeOneRight) filteredCenter.push(currentPage + 3);

  return [...filteredCenter];
}
