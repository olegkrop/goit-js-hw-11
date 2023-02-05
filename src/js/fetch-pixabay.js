import axios from 'axios';

function fetchPixabay(searchQuery, page) {
  const KEY = '33348757-d3bd4442be84b253a20cc414a';
  const BASE_URL = 'https://pixabay.com/api/';
  const options = 'image_type=photo&orientation=horizontal&safesearch=true';
  return axios.get(
    `${BASE_URL}?key=${KEY}&q=${searchQuery}&${options}&per_page=40&page=${page}`
  );
}

export { fetchPixabay };
