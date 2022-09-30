const linkTeamModalRef = document.querySelector('.footer__modal-open');
const backdropTeamModalRef = document.querySelector('.backdrop-team');
const closeBtnTeamModalRef = document.querySelector('.modal-team__close-btn');

linkTeamModalRef.addEventListener('click', onGoItLinkClick);

function onGoItLinkClick(e) {
  e.preventDefault();
  toggleTeam();

  document.addEventListener('keydown', onCloseEscClick);
  document.body.style.overflow = 'hidden';
  closeBtnTeamModalRef.addEventListener('click', onCloseBtnClick);
  backdropTeamModalRef.addEventListener('click', onCloseBackdropClick);
}

function toggleTeam() {
  backdropTeamModalRef.classList.toggle('backdrop-team--is-hidden');
}

function onCloseBtnClick() {
  toggleTeam();

  closeBtnTeamModalRef.removeEventListener('click', onCloseBtnClick);
  document.body.removeAttribute('style');
}

function onCloseBackdropClick(e) {
  if (e.currentTarget === e.target) {
    document.body.removeAttribute('style');
    toggleTeam();

    document.removeEventListener('keydown', onCloseEscClick);
    backdropTeamModalRef.removeEventListener('click', onCloseBackdropClick);
  }
}

function onCloseEscClick(e) {
  if (e.code == 'Escape') {
    toggleTeam();

    document.removeEventListener('keydown', onCloseEscClick);

    closeBtnTeamModalRef.removeEventListener('click', onCloseBtnClick);
    backdropTeamModalRef.removeEventListener('click', onCloseBackdropClick);
  }
}