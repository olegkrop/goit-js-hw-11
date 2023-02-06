function renderMarkup(array) {
  const markup = array
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<a class="gallery__link" href="${largeImageURL}">
                <div class="photo-card">
                  <img class="photo__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
                  <div class="info">
                    <p class="info__item">
                <span class="info__title">Likes</span>
                <span class="info__data">${likes}</span>
                    </p>
                    <p class="info__item">
                <span class="info__title">Views</span>
                <span class="info__data">${views}</span>
                    </p>
                    <p class="info__item">
                <span class="info__title">Comments</span>
                <span class="info__data">${comments}</span>
                    </p>
                    <p class="info__item">
                <span class="info__title">Downloads</span>
                <span class="info__data">${downloads}</span>
                    </p>
                  </div>
                </div>
              </a>`
    )
    .join('');

  return markup;
}

export { renderMarkup };
