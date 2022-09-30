export function addClass(elem, cls) {
  if (elem.classList.contains(cls)) {
    return;
  }
  elem.classList.add(cls);
}

export function removeClass(elem, cls) {
  if (!elem.classList.contains(cls)) {
    return;
  }
  elem.classList.remove(cls);
}

export function toggleClass(elem, cls) {
  elem.classList.toggle(cls);
}
