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
// effects
const redEffect = (pi) => {
  for (let i = 0;i < pi.data.length;i += 4) {
    pi.data[i + 0] = pi.data[i + 0] + 200; // RED
    pi.data[i + 1] = pi.data[i + 1] - 50; // GREEN
    pi.data[i + 2] = pi.data[i + 2] * 0.5; // Blue
  }
  return pi
}
const rgbSplit = (pi) => {
  for (let i = 0;i < pi.data.length;i += 4) {
    pi.data[i - 150] = pi.data[i + 0]; // RED
    pi.data[i + 500] = pi.data[i + 1]; // GREEN
    pi.data[i - 550] = pi.data[i + 2]; // Blue

  }
  return pi
}
const greenEffect = pixels => {
  const levels = {};

  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
  });

  for (i = 0;i < pixels.data.length;i = i + 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax) {
      // take it out!
      pixels.data[i + 3] = 0;
    }
  }

  return pixels;

}
// play video into canvas
const paintToCanvas = () => {
  // get video element width and height
  const { videoWidth: w, videoHeight: h } = video
  // set canvas width and height to be as same as video
  canvas.width = w, canvas.height = h
  // console.log(w, h)
  // display video shoot in canvas every 10 ms
  // return is to control the interval 
  return setInterval(() => {
    ctx.drawImage(video, 0, 0, w, h)
    // get pixels
    let pixels = ctx.getImageData(0, 0, w, h)
    // apply effects
    // pixels = redEffect(pixels)
    // pixels = rgbSplit(pixels)
    // ctx.globalAlpha = 0.1
    pixels = greenEffect(pixels)
    // set pixels back
    ctx.putImageData(pixels, 0, 0)
  }, 10)
}

// take photo
const takePhoto = () => {
  // get image data as text
  const imgData = canvas.toDataURL('image/png')
  // add image as link to download it
  const link = document.createElement('a')
  link.href = imgData
  link.setAttribute('download', 'screen_shot_of_video')
  link.innerHTML = `<img src='${imgData}' attr='screen_shot_of_video' />`
  strip.insertBefore(link, strip.firstChild)
}

// Event Listeners
document.addEventListener('DOMContentLoaded', getVideo)
video.addEventListener('canplay', paintToCanvas)