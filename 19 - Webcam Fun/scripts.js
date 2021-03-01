const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

// functions
// get user camera stream
const getVideo = () => {
  // console.log(navigator)
  // get camera stream
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
      // console.log(localMediaStream)
      // set video src to camera stream
      video.srcObject = localMediaStream
      //play video
      video.play()
    })
    .catch(
      // if something went wrong or user denied camera access
      err => console.log('Sorry! Something went wrong! ', err)
    )
}
// test
getVideo()