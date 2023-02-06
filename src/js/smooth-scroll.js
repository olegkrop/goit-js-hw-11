function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery__link')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 3,
    behavior: 'smooth',
  });
}
export { smoothScroll };
