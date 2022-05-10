const DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
const DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
const THUMBNAIL_SELECTOR = '[data-image-role="trigger"]';
const RANDOM_THUMBNAIL_SELECTOR = '[data-image-role="random"]';

const setDetail = (imageUrl, imageTitle, imageSubtitle) => {
  'use strict';
  const detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute('src', imageUrl);

  const detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.innerHTML = '<h2>' + imageTitle +
    '</h2>' + '<p>' + imageSubtitle + '</p>';
}

const setDetailFromThumb = (thumbnail) => {
  setDetail(thumbnail.dataset.imageUrl,
    thumbnail.dataset.imageTitle,
    thumbnail.dataset.imageSubtitle);
}

const addThumbnailClickHandler = (thumbnail) => {
  thumbnail.addEventListener('click', (event) => {
    event.preventDefault();
    if (thumbnail.dataset.imageRole === 'random') {
      setDetailFromThumb(randomThumbnail());
    } else {
      setDetailFromThumb(thumbnail);
    }
  });
}

const getThumbnailsList = () => {
  return document.querySelectorAll('[data-image-role="trigger"], [data-image-role="random"]');
}

const randomThumbnail = () => {
  const currentThumbnailUrl = document.querySelector(DETAIL_IMAGE_SELECTOR).getAttribute('src');
  const thumbnails = document.querySelectorAll(THUMBNAIL_SELECTOR);

  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * 5);
  } while (thumbnails[randomIndex].getAttribute('href') === currentThumbnailUrl);

  return thumbnails[randomIndex];
}

(function(thumbnails) {
  thumbnails.forEach(addThumbnailClickHandler);
}(getThumbnailsList()));
