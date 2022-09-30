const bodyRef = document.querySelector('body');
const toggleRef = document.querySelector('.switch');

toggleRef.addEventListener('change', event => {
  if (bodyRef.classList.contains('dark-theme')) {
    bodyRef.classList.remove('dark-theme');
    bodyRef.classList.add('light-theme');
  } else {
    bodyRef.classList.remove('light-theme');
    bodyRef.classList.add('dark-theme');
  }
});
