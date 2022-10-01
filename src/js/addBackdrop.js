const backdrop = document.querySelector('.backdrop');

export function changeBackdrop(img) {
  if (img !== null) {
    backdrop.style.backgroundImage = `url('https://image.tmdb.org/t/p/original/${img}')`;
    backdrop.style.backgroundSize = 'cover';
    backdrop.style.backgroundPosition = 'center';
  } else {
    backdrop.style.backgroundImage =
      'https://static.vecteezy.com/system/resources/previews/003/582/701/original/coming-soon-background-illustration-template-design-free-vector.jpg';
  }
}
