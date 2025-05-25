import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const btnLoadMore = document.querySelector('.btn-load-more');

let lightbox;
initLightbox();

export function initLightbox() {
  lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
}

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <div class="photo-card">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
              <p class="info-item"><b>Likes</b> ${likes}</p>
              <p class="info-item"><b>Views</b> ${views}</p>
              <p class="info-item"><b>Comments</b> ${comments}</p>
              <p class="info-item"><b>Downloads</b> ${downloads}</p>
            </div>
          </div>
        </a>
      </li>`
    )
    .join('');

  galleryContainer.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}
export function refreshLightbox() {
  lightbox.refresh();
}
export function clearGallery() {
  galleryContainer.innerHTML = '';
  lightbox.refresh();
}

export function showLoader() {
  loader.classList.remove('hidden');
}

export function hideLoader() {
  loader.classList.add('hidden');
}

export function showLoadMoreButton() {
  btnLoadMore.classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
  btnLoadMore.classList.add('is-hidden');
}
