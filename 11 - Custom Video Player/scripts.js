// Elements
const player = document.querySelector(".player");
const video = player.querySelector("video");
const playButton = player.querySelector('[title="Toggle Play"]');
const skipButtons = player.querySelectorAll("[data-skip]");
const volumeSlider = player.querySelector('[name="volume"]');
const playbackSlider = player.querySelector('[name="playbackRate"]');
const progress = player.querySelector(".progress");
const progressFilled = player.querySelector(".progress__filled");

// Toggle Play/Pause
video.addEventListener("click", togglePlay);
playButton.addEventListener("click", togglePlay);

function togglePlay() {
  video.paused ? video.play() : video.pause();
}

video.addEventListener("play", toggleButton);
video.addEventListener("pause", toggleButton);

function toggleButton() {
  const icon = video.paused ? "⏵" : "⏸";
  playButton.textContent = icon;
}

// Skip Forward/Back
for (const button of skipButtons) {
  button.addEventListener("click", skipVideo);
}

function skipVideo() {
  const timeDelta = Number(this.dataset.skip);
  video.currentTime += timeDelta;
}

// Volume Up/Down
volumeSlider.addEventListener("change", adjustVolume);

function adjustVolume() {
  const volume = Number(this.value);
  video.volume = volume;
}

// Playback Rate Up/Down
playbackSlider.addEventListener("change", adjustPlaybackRate);

function adjustPlaybackRate() {
  const playbackRate = Number(this.value);
  video.playbackRate = playbackRate;
}

// Progress Bar
video.addEventListener("timeupdate", updateProgressFilled);

function updateProgressFilled() {
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.flexBasis = `${percent}%`;
}

progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", scrub);

let mouseDown = false;
progress.addEventListener("mousedown", () => (mouseDown = true));
window.addEventListener("mouseup", () => (mouseDown = false));

function scrub(event) {
  if (event.type == "mousemove" && !mouseDown) return;

  const scrubTime = (event.offsetX / this.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}
