// variables
// variable to store interval
let countDown;
// functions
const timer = s => {
  // get current time in mille seconds
  const now = Date.now(),
    // end time in mille seconds
    then = now + s * 1000

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
    console.log(secondsLeft)
  }, 1000)
}

// events

