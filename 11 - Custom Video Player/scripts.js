// variables
const video = document.querySelector('video'),
playBtn = document.querySelector('.toggle'),
ranges = document.querySelectorAll('.player__slider'),
skipBtns = document.querySelectorAll('[data-skip]'),
progress = document.querySelector('.progress'),
progressBar = document.querySelector('.progress__filled') 

// Functions
// play and pause the video & change play btn content
const togglePlay = () => {
    video.paused ? video.play() : video.pause()
    playBtn.textContent = video.paused ?  '►' : '❚ ❚';
} 

// skip forward/backward
const skip = (e) => {
    // modify video current time depending on data-set attribute value
    video.currentTime += parseInt(e.target.dataset.skip)
}

// event listeners 
// play and pause video
playBtn.addEventListener('click', togglePlay)
video.addEventListener('click', togglePlay)
// skip video
skipBtns.forEach(btn => btn.addEventListener('click',skip))