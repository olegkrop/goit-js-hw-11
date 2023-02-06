import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchPixabay } from './js/fetch-pixabay';
import { renderMarkup } from './js/render-markup';
import { smoothScroll } from './js/smooth-scroll';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery .container');
const loadMoreButton = document.querySelector('.load-more');

loadMoreButton.classList.add('visually-hidden');

let input = '';
let page = 1;

form.addEventListener('submit', onSubmit);
loadMoreButton.addEventListener('click', onLoadMoreClick);

async function onSubmit(event) {
  event.preventDefault();
  gallery.innerHTML = '';
  input = event.currentTarget.elements.searchQuery.value;

  if (input) {
    try {
      const response = await fetchPixabay(input, (page = 1));
      if (response.data.hits.length === 0) {
        gallery.innerHTML = '';
        Notify.warning(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        gallery.insertAdjacentHTML(
          'beforeend',
          renderMarkup(response.data.hits)
        );
        Notify.success(`"Hooray! We found ${response.data.totalHits} images."`);
        lightbox.refresh();

        if (response.data.totalHits > 40) {
          loadMoreButton.classList.remove('visually-hidden');
        } else {
          loadMoreButton.classList.add('visually-hidden');
        }
      }
    } catch (error) {
      Notify.failure(error);
      gallery.innerHTML = '';
    }
  } else {
    Notify.warning('Please start typing.');
  }
}

async function onLoadMoreClick() {
  page += 1;
  try {
    const response = await fetchPixabay(input, page);
    const totalPages = response.data.totalHits / 40;

    if (totalPages < page) {
      loadMoreButton.classList.add('visually-hidden');
      Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
    } else {
      gallery.insertAdjacentHTML('beforeend', renderMarkup(response.data.hits));
      smoothScroll();
      lightbox.refresh();
    }
  } catch (error) {
    Notify.failure(error);
    gallery.innerHTML = '';
  }
}

const lightbox = new SimpleLightbox('.gallery a', { captions: false });
