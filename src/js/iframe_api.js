
const tag = document.createElement('script');

tag.src = 'https://www.youtube.com/iframe_api';

const firstScriptTag = document.getElementsByTagName('script')[0];
console.log("~ firstScriptTag", firstScriptTag)
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
