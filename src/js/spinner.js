
const spinner = document.querySelector('.loader');



export function showSpinner() {
    if (spinner.classList.contains('loader')) {
      return;
    }
  spinner.classList.add('loader') 
  spinner.classList.remove('visually-hidden');
}

export function hideSpinner() {
    if (!spinner.classList.contains('loader')) {
      return;
    }
  spinner.classList.add('loader');
  spinner.classList.add('visually-hidden');
}
