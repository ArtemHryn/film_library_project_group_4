export default function preLoader() {
  window.setTimeout(function () {
    document.body.classList.add('loaded_hiding');
    document.body.classList.add('loaded');
  }, 1650);
}
preLoader();
