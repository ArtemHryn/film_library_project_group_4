const backdrop = document.querySelector('.backdrop');

export function changeBackdrop(img) {
  const backdropImage = img;
  if (backdropImage !== null) {
    backdrop.style.backgroundImage = `url('https://image.tmdb.org/t/p/original/${backdropImage}')`;
    backdrop.style.backgroundSize = 'cover';
    backdrop.style.backgroundPosition = 'center';
  }
}
