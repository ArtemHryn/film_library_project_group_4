let player;
let isPlayed = false;
export function onYouTubeIframeAPIReady(id) {
  player = new YT.Player('player', {
    height: '720',
    width: '1280',
    videoId: `${id}`,
    enablejsapi: 1,
    origin: window.location.href,
    host: 'https://www.youtube.com',
    playerVars: {
      playsinline: 1,
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
  isPlayed = true;
}

function onPlayerReady(event) {
  event.target.playVideo();
}

let done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    // setTimeout(stopVideo, 6000);
    done = true;
  }
}
function stopVideo() {
  if (!isPlayed) {
    return;
  }
  player.stopVideo();
}

export function getyt() {
  player.getIframe();
}

export function deleteYt() {
  if (!isPlayed) {
    return;
  }
  player.destroy();
  isPlayed = false;
}
