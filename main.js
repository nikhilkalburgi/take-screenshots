  const videoElement = document.getElementById("video");
  const myImg = document.getElementById("my_img");
  const canvas = document.getElementById("cv1");
  const ctx = canvas.getContext("2d");
	const showAreaCheckbox = document.querySelector("input[name=showArea]")

  var displayMediaOptions = {
    video: {
      cursor: 'always'
    },
   audio: false
  }

  let videoLoaded = false;
canvas.addEventListener("click", function(e) {
  if (!videoLoaded) {
    startCapture();
  }
})


  async function startCapture(){
    try {
      videoElement.srcObject = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions)
    }catch(err) {
      console.error("Error" + err)
    }
  }

  function videoOnLoad(element) {
    videoLoaded = true;
    resizeCanvas(element);
  }

  function resizeCanvas(element)
{
  canvas.width = element.offsetWidth;
  canvas.height = element.offsetHeight;
}

var canvasx = canvas.offsetLeft
var canvasy = canvas.offsetTop
var last_mousex = last_mousey = 0;
var mousex = mousey = 0;
var mousedown = false;
var rect = {}
var imageData;


showAreaCheckbox.addEventListener('change', function() {
  if (this.checked) {
    ctx.clearRect(0,0,canvas.width,canvas.height); //clear canvas
    ctx.beginPath();
    ctx.rect(rect.x,rect.y, rect.width, rect.height);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.stroke();
  } else if (rect.width > 0) {
    ctx.clearRect(0,0,canvas.width,canvas.height); //clear canvas
  }
});




canvas.addEventListener("mouseup", function (e) {
  mousedown = false;
  if (rect.width > 0) {

      showStuff(rect);
    }
}, false);

canvas.addEventListener("mousedown", function (e) {
  console.log(e,canvasx,canvasy);
  last_mousex = parseInt(e.clientX-canvasx);
	last_mousey = parseInt(e.clientY-canvasy);
  mousedown = true;
}, false);

canvas.addEventListener("mousemove", function (e) {
  mousex = parseInt(e.clientX-canvasx);
	mousey = parseInt(e.clientY-canvasy);
    if(mousedown) {
        ctx.clearRect(0,0,canvas.width,canvas.height); //clear canvas
        ctx.beginPath();
        var width = mousex-last_mousex;
        var height = mousey-last_mousey;
        ctx.rect(last_mousex,last_mousey,width,height);
        rect = {x: last_mousex, y: last_mousey, width, height}
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}, false);



function showStuff({width, height, x, y}) {
  aspectRatioY = videoElement.videoHeight / canvas.height;
  aspectRatioX = videoElement.videoWidth / canvas.width;

  const offsetY = 0.5 * aspectRatioY;

  var cv2 = document.createElement('canvas');
    cv2.width = width*aspectRatioX;
    cv2.height = height*aspectRatioY;
    var ctx2 = cv2.getContext('2d');
    ctx2.drawImage(videoElement, 0, 0, cv2.width, cv2.height);
    ctx2.beginPath();
    ctx2.moveTo(20,20)
    ctx2.lineTo(150,10)
    ctx2.lineTo(250,10)
    ctx2.lineTo(250,250)
    ctx2.closePath();
    ctx2.clearRect(0,0,canvas.width,canvas.height);
    ctx2.clip();
    ctx2.drawImage(videoElement, 0, 0, cv2.width, cv2.height);
    imageData = cv2.toDataURL('image/jpg');
      myImg.hidden = false;
      myImg.href = imageData;

}
