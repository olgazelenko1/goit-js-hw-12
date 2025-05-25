import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  refreshLightbox,
} from './js/render-functions';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let page = 1;
const PAGE_SIZE = 15;
let maxPage = 0;
let currentQuery = '';

const form = document.querySelector('.form');
const btnLoadMore = document.querySelector('.btn-load-more');

function checkIfEndOfResults(currentPage, totalPages) {
  if (currentPage >= totalPages) {
    iziToast.info({
      title: 'Info',
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
    });
    hideLoadMoreButton();
  } else {
    showLoadMoreButton();
  }
}

form.addEventListener('submit', async event => {
  event.preventDefault();

  page = 1;
  currentQuery = event.target.elements['search-text'].value.trim();

  if (currentQuery === '') {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query.',
      position: 'topRight',
    });
    return;
  }

  showLoader();
  clearGallery();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(currentQuery, page);

    if (data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message: 'No images found. Try again!',
        position: 'topRight',
      });
      hideLoadMoreButton();
      hideLoader();
      return;
    }

    createGallery(data.hits);
    refreshLightbox();

    maxPage = Math.ceil(data.totalHits / PAGE_SIZE);
    checkIfEndOfResults(page, maxPage);
  } catch (error) {
    iziToast.error({
      title: 'Info',
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});

btnLoadMore.addEventListener('click', async () => {
  if (page >= maxPage) return;
  page += 1;
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, page);
    createGallery(data.hits);
    refreshLightbox();
    scrollToNewContent();
    checkIfEndOfResults(page, maxPage);
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to load more images.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});
function scrollToNewContent() {
  const gallery = document.querySelector('.gallery');
  if (!gallery || !gallery.firstElementChild) return;

  const firstCard = gallery.firstElementChild.getBoundingClientRect();
  const { height: cardHeight } = firstCard;

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
