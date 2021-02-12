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

// adjust progress bar 
const playProgress = () => {
    // modify progressBar width to be equal to how much played form the video
    progressBar.style.flexBasis = ((video.currentTime / video.duration) * 100) + '%'
}

// adjust sound & speed
const modifyRanges = (e) => {
    /* select which video property to modify depending 
    on range name attribute set in html, then set  
    property value to range value
    */
    video[e.target.name] = e.target.value
}

// event listeners 
// play and pause video
playBtn.addEventListener('click', togglePlay)
video.addEventListener('click', togglePlay)
// skip video
skipBtns.forEach(btn => btn.addEventListener('click',skip))
// progress bar auto adjustment
video.addEventListener('timeupdate', playProgress)
// adjust sound & speed
ranges.forEach(range => range.addEventListener('change',modifyRanges))