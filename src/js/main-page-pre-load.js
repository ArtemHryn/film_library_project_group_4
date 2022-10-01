export default function preLoader() {
  window.setTimeout(function () {
    document.body.classList.add('loadedhiding');
    document.body.classList.add('loaded');
    document.body.classList.remove('loadedhiding');
  }, 1500);
}
preLoader();
