
const spinner = document.querySelector('.loader');

showSpinner()

export function showSpinner() {
    if (spinner.classList.contains('loader')) {
      return;
    }
   spinner.classList.add('loader') 
}

export function hideSpinner() {
    if (!spinner.classList.contains('loader')) {
      return;
    }
  spinner.classList.add('loader');
}
