import { onCloseModal } from './addingFilmToWeb';

document.addEventListener('keydown', onEscBtnPress);
document.addEventListener('click', onBackdropClick);

export function onEscBtnPress(e) {
  if (e.code === 'Escape') {
    onCloseModal();
  }
}

export function onBackdropClick(e) {
  if (e.target === backdrop) {
    onCloseModal();
  }
}
