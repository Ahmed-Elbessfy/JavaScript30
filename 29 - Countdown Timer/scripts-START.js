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
const timer = s => {
  // get current time in mille seconds
  const now = Date.now(),
    // end time in mille seconds
    then = now + s * 1000

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

