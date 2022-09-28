function lazyLoad() {
  const lazyImages = document.querySelectorAll('[loading="lazy"]');
  lazyImages.forEach(image => {
    image.addEventListener('load', onImageLoaded, { once: true });
  });
}

function onImageLoaded(e) {
  e.target.classList.add('appear');
}

export { lazyLoad };
lazyLoad();
