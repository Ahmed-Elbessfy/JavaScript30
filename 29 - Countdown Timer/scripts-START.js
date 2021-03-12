// variables
// variable to store interval
let countDown;
// functions
//display timer
const displayTimer = s => {
  // convert seconds to minutes:seconds format
  const min = Math.floor(s / 60),
    sec = s % 60
  // display timer in display timer element
  document.querySelector('.display__time-left').textContent = `${min}:${sec < 10 ? '0' + sec : sec}`
  // display timer in page title
  document.title = `${min}:${sec < 10 ? '0' + sec : sec}`
}
// displayEndTime
const endTime = s => {
  // get back time
  const end = new Date(s),
    hr = end.getHours(), mins = end.getMinutes()
  // display end time
  // display time in 12 hours format with 'am', 'pm'
  document.querySelector('.display__end-time').textContent = `Be Back at ${hr > 12 ? hr - 12 : hr}:${mins > 10 ? mins : '0' + mins} ${hr > 12 ? 'pm' : 'am'}`
}
const timer = s => {
  // get current time in mille seconds
  const now = Date.now(),
    // end time in mille seconds
    then = now + s * 1000

  // display end time
  endTime(then)
  // display timer once  timer function called since setInterval must wait for first second
  displayTimer(s)
  countDown = setInterval(() => {
    // remaining seconds
    const secondsLeft = Math.round((then - Date.now()) / 1000)

    // stop when time is up
    if (secondsLeft < 0) {
      // stope interval
      clearInterval(countDown)
      // stop executing function -> this will prevent -0 , -1
      return
    }
    // display timer to user
    displayTimer(secondsLeft)
  }, 1000)
}

// events

