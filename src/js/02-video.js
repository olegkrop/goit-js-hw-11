const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);
var throttle = require('lodash.throttle');
const currentTime = "videoplayer-current-time";

console.log(currentTime);

player.on('timeupdate',
    throttle((data) => {
        localStorage.setItem(currentTime, data.seconds);
    }, 1000)
);
console.log(localStorage.getItem(currentTime));

player.setCurrentTime(localStorage.getItem(currentTime));