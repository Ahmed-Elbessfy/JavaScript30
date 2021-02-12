// variables
const video = document.querySelector('video'),
    playBtn = document.querySelector('.toggle'),
    ranges = document.querySelectorAll('.player__slider'),
    skipBtns = document.querySelectorAll('[data-skip]'),
    progress = document.querySelector('.progress'),
    progressBar = document.querySelector('.progress__filled')

// to check if mouse is clicked while moving through progress bar
let barClicked = false

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
// Manually adjust progress bar
const manuallyAdjustProgressBar = (e) => {
    // get approximate time depending where mouse position relative to progress bar width multiplying to total video duration
    let clickedTime = (e.offsetX / progress.offsetWidth) * video.duration
    video.currentTime = Math.floor(clickedTime)
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
// Manually adjust progress bar
// if mouse clicked and get hold inside progress bar, edit barClicked to be true
progress.addEventListener('mousedown', () => barClicked = true)
// if mouse not clicked inside progress bar, edit barClicked to be true
progress.addEventListener('mouseup', () => barClicked = false)
// fire manuallyAdjustProgressBar only if barClicked is true & mouse is moving inside both video or the progress bar
video.addEventListener('mousemove',(e) => barClicked && manuallyAdjustProgressBar(e))
progress.addEventListener('mousemove',(e) => barClicked && manuallyAdjustProgressBar(e))
// adjust sound & speed
ranges.forEach(range => range.addEventListener('change',modifyRanges))