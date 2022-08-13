
var viewFullScreen = document.createElement('button');
viewFullScreen.style.position = "fixed";
viewFullScreen.style.top = "50%";
viewFullScreen.style.left = "50%";
viewFullScreen.style.transform = "translate(-50%,-50%)";
viewFullScreen.style.width = "150px";
viewFullScreen.style.height = "150px";
viewFullScreen.style.border = "None";
viewFullScreen.style.borderRadius = "100px";
viewFullScreen.style.backgroundColor = "red";
viewFullScreen.style.color = "white";
viewFullScreen.style.fontSize = "2vh";
viewFullScreen.innerHTML = "View Full Screen";
viewFullScreen.style.zIndex = "2147483646";
viewFullScreen.style.cursor = "pointer";
viewFullScreen.style.boxShadow = "0px 0px 10px black";
viewFullScreen.onmousedown = ()=>{
  viewFullScreen.style.boxShadow = "none";
}
viewFullScreen.onmouseup = ()=>{
  viewFullScreen.style.boxShadow = "0px 0px 10px black";
}

var displayScreen = document.createElement('button');
displayScreen.style.position = "fixed";
displayScreen.style.top = "50%";
displayScreen.style.left = "50%";
displayScreen.style.transform = "translate(-50%,-50%)";
displayScreen.style.width = "150px";
displayScreen.style.height = "150px";
displayScreen.style.border = "None";
displayScreen.style.borderRadius = "100px";
displayScreen.style.backgroundColor = "red";
displayScreen.style.color = "white";
displayScreen.style.fontSize = "2vh";
displayScreen.innerHTML = "Access Screen"; 
displayScreen.style.zIndex = "2147483646";
displayScreen.style.cursor = "pointer";
displayScreen.style.boxShadow = "0px 0px 10px black";
displayScreen.onmousedown = ()=>{
  displayScreen.style.boxShadow = "none";
}
displayScreen.onmouseup = ()=>{
  displayScreen.style.boxShadow = "0px 0px 10px black";
}

var toolbar = document.createElement('div');
toolbar.style.display = "flex";
toolbar.style.position = "fixed";
toolbar.style.bottom = "0";
toolbar.style.left = "50%";
toolbar.style.transform = "translateX(-50%)";
toolbar.style.width = "35%";
toolbar.style.borderStartStartRadius = "10px";
toolbar.style.borderStartEndRadius = "10px";
toolbar.style.boxShadow = "0px 0px 5px rgb(125, 122, 122)";
toolbar.style.padding = "10px";
toolbar.style.justifyContent = "space-around";
toolbar.style.zIndex = "2147483647";
toolbar.style.backgroundColor="white";
toolbar.style.transition = "all 0.3s";

let  canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext('2d');
canvas.style.position = "fixed";
canvas.style.top = "0px";
canvas.style.left = "0px";
canvas.style.zIndex = "2147483646";
canvas.style.cursor = "crosshair";

var startX = 0;
var startY = 0;
var mouseX = 0;
var mouseY = 0;
var isDrawing = false;
var existingLines = [];
var hasLoaded = true;

var cv2 = document.createElement('canvas');
var ctx2 = cv2.getContext('2d');
cv2.style.position = "fixed";
cv2.style.top = "0px";
cv2.style.left = "0px";
cv2.style.display = "none";

  let firstClick = true;
  
  var polygonClip = document.createElement("button");
  polygonClip.style.border = "0.1px solid #918c8c";
  var polygonClipToggle = false;
  var image = new Image();
  image.src = browser.runtime.getURL('pen.png');
  polygonClip.appendChild(image);
  polygonClip.style.width = "40px";
  polygonClip.style.padding = "5px";
  polygonClip.style.cursor = "pointer";

  var rectClip = document.createElement("button");
  rectClip.style.border = "0.1px solid #918c8c"
  var rectClipToggle = false;
  image = new Image();
  image.src = browser.runtime.getURL('rect.png');
  image.style.width = "80%";
  image.style.paddingTop = "5px";
  image.style.paddingLeft = "3px";
  rectClip.appendChild(image);
  rectClip.style.width = "40px";
  rectClip.style.padding = "5px";
  rectClip.style.cursor = "pointer";

  var circleClip = document.createElement("button");
  circleClip.style.border = "0.1px solid #918c8c"
  var circleClipToggle = false;
  image = new Image();
  image.src = browser.runtime.getURL('circle.png');
  image.style.width = "80%";
  image.style.paddingTop = "5px";
  image.style.paddingLeft = "3px";
  circleClip.appendChild(image);
  circleClip.style.width = "40px";
  circleClip.style.padding = "5px";
  circleClip.style.cursor = "pointer";

  var download = document.createElement("button");
  download.style.border = "0.1px solid #918c8c"
  image = new Image();
  image.src = browser.runtime.getURL('download.png');
  image.style.width = "60%";
  image.style.paddingTop = "5px";
  download.appendChild(image);
  download.style.width = "40px";
  download.style.padding = "5px";
  download.style.cursor = "pointer";

  var closeBtn = document.createElement("button");
  closeBtn.style.border = "0.1px solid #918c8c";
  image = new Image();
  image.src = browser.runtime.getURL('close.png');
  image.style.paddingTop = "2px";
  image.style.paddingLeft = "2px";
  closeBtn.appendChild(image);
  closeBtn.style.width = "40px";
  closeBtn.style.padding = "5px";
  closeBtn.style.cursor = "pointer";

var downloadLink = document.createElement('a');
downloadLink.innerHTML = "DOWNLOAD";
downloadLink.style.display = "none";
downloadLink.download = "screenshot.png";
document.body.appendChild(downloadLink);
downloadLink = Array.from(document.getElementsByTagName('a'))[Array.from(document.getElementsByTagName('a')).length-1]
var imageData;
circleClip.style.backgroundColor = "white";
rectClip.style.backgroundColor = "white";
polygonClip.style.backgroundColor = "white";


var displayMediaOptions = {
  video: {
    cursor: 'always'
  },
  audio: false
}

let videoElement = document.createElement('video');
videoElement.style.display = "none";
videoElement.autoplay = true;
document.body.appendChild(videoElement);

var docElm = document.documentElement;
var tool;
var existingCircle = {
  startx:null,
  starty:null,
  endx:null,
  endy:null
}
var existingRect = {
  startx:null,
  starty:null,
  endx:null,
  endy:null
}

window.onresize = ()=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}


function draw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.beginPath();
  for (var i = 0; i < existingLines.length; ++i) {
    var line = existingLines[i];
    ctx.moveTo(line.startX,line.startY);
    ctx.lineTo(line.endX,line.endY);
  }
  ctx.strokeStyle = "rgb(244, 8, 42)";
  ctx.stroke();
  ctx.closePath();

  if (true) {
    ctx.beginPath();
    ctx.moveTo(startX,startY);
    ctx.lineTo(mouseX,mouseY);
    ctx.stroke();
    ctx.closePath();
    isDrawing = true;
  }
}
function onmousedown(e) {
  toolbar.style.bottom = "-5vh";
  if(tool == "polygon"){

    if(firstClick){
      startX = e.clientX - 10;
      startY = e.clientY - 10;
      firstClick = false;
    }
    if (hasLoaded && e.button === 0) {
  
        existingLines.push({
          startX: startX,
          startY: startY,
          endX: mouseX,
          endY: mouseY
        });
  
      startX = e.clientX - 10;
      startY = e.clientY - 10;
  
      draw();
  
    }
  }else if(tool == "rect"){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.beginPath();
    existingRect.startx = e.clientX - 10;
    existingRect.starty = e.clientY - 10;
  }else{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.beginPath();
    existingCircle.startx = e.clientX - 10;
    existingCircle.starty = e.clientY - 10;
  }
  ismousedown = true;
}
function onmouseup(e){
  ismousedown = false;
  existingCircle.endx = e.clientX-10;
  existingCircle.endy = e.clientY-10;
  existingRect.endx = e.clientX-10;
  existingRect.endy = e.clientY-10;
  mouseX = e.clientX - 10;
  mouseY = e.clientY - 10;
  if(tool != "polygon")
  toolbar.style.bottom = "0px";
}

function onmousemove(e) {

  mouseX = e.clientX - 10;
  mouseY = e.clientY - 10;
  if(tool == "polygon"){

    if (hasLoaded) {
  
      if (isDrawing) {
        draw();
      }
    }
  }else if(tool == "rect"){
    if(ismousedown){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.beginPath();
      ctx.strokeStyle = "rgb(244, 8, 42)";
      ctx.strokeRect(existingRect.startx,existingRect.starty,mouseX - existingRect.startx,mouseY - existingRect.starty);
    }
  }else{
    if(ismousedown){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.beginPath();
      ctx.strokeStyle = "rgb(244, 8, 42)";
      ctx.arc(existingCircle.startx + (mouseX - existingCircle.startx)/2,existingCircle.starty + (mouseY - existingCircle.starty)/2,Math.sqrt((mouseX - existingCircle.startx)**2 + (mouseY - existingCircle.starty) **2)/2,0,2*Math.PI);
      ctx.stroke();
    }
  }
}

function ondblclick(){
  isDrawing = false;
  ctx.beginPath();
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.moveTo(existingLines[0].startX,existingLines[0].startY)
  for (var i = 0; i < existingLines.length; ++i) {
    var line = existingLines[i];
    ctx.lineTo(line.endX,line.endY);
  }
  ctx.closePath();
  ctx.stroke();
  toolbar.style.bottom = "0px";
}


polygonClip.onclick = ()=>{
  polygonClipToggle = !polygonClipToggle;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.beginPath();
  existingLines = [];
  firstClick = true;
  tool = "polygon";
  circleClip.style.backgroundColor = "white";
  rectClip.style.backgroundColor = "white";
  rectClipToggle = false;
  circleClipToggle = false;
  if(polygonClipToggle){
      canvas.onmouseup = onmouseup;
      canvas.onmousedown = onmousedown;
      canvas.onmousemove = onmousemove;
      canvas.ondblclick = ondblclick;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      document.body.appendChild(canvas);
      polygonClip.style.backgroundColor = "rgb(27, 242, 141)";
  }else{
    canvas.onmouseup = null;
    canvas.onmousedown = null;
    canvas.onmousemove = null;
    canvas.ondblclick = null;
    document.body.removeChild(canvas);
    polygonClip.style.backgroundColor = "white";
  }
}

rectClip.onclick = ()=>{
  rectClipToggle = !rectClipToggle;
  tool = "rect";
  polygonClip.style.backgroundColor = "white";
  circleClip.style.backgroundColor = "white";
  polygonClipToggle = false;
  circleClipToggle = false;
  existingLines = [];
  if(rectClipToggle){
      canvas.onmouseup = onmouseup;
      canvas.onmousedown = onmousedown;
      canvas.onmousemove = onmousemove;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      document.body.appendChild(canvas);
      rectClip.style.backgroundColor = "rgb(27, 242, 141)";
  }else{
    canvas.onmouseup = null;
    canvas.onmousedown = null;
    canvas.onmousemove = null;
    canvas.ondblclick = null;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.beginPath();
    document.body.removeChild(canvas);
    rectClip.style.backgroundColor = "white";
  }
  existingLines = [];
  isDrawing = false;
}

circleClip.onclick = ()=>{
  circleClipToggle = !circleClipToggle;
  tool = "circle";
  polygonClip.style.backgroundColor = "white";
  rectClip.style.backgroundColor = "white";
  polygonClipToggle = false;
  rectClipToggle = false;
  existingLines = [];
  if(circleClipToggle){
      canvas.onmouseup = onmouseup;
      canvas.onmousedown = onmousedown;
      canvas.onmousemove = onmousemove;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      document.body.appendChild(canvas);
      circleClip.style.backgroundColor = "rgb(27, 242, 141)";
  }else{
    canvas.onmouseup = null;
    canvas.onmousedown = null;
    canvas.onmousemove = null;
    canvas.ondblclick = null;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.beginPath();
    document.body.removeChild(canvas);
    circleClip.style.backgroundColor = "white";
  }
  existingLines = [];
  isDrawing = false;
}


download.onclick = ()=>{
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.beginPath();
  polygonClip.style.backgroundColor = "white";
  rectClip.style.backgroundColor = "white";
  circleClip.style.backgroundColor = "white";
  polygonClipToggle = false;
  rectClipToggle = false;
  circleClipToggle = false;
  isDrawing = false;
  ismousedown = false;
  getImage();
}
closeBtn.onclick = ()=>{
  videoElement.srcObject.getVideoTracks()[0].stop();
  browser.runtime.sendMessage({dock:false},()=>{
  });
  if(document.fullscreenElement)
    document.exitFullscreen()
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.beginPath();

    polygonClipToggle = false;
    rectClipToggle = false;
    circleClipToggle = false;
    polygonClip.style.backgroundColor = "white";
    rectClip.style.backgroundColor = "white";
    circleClip.style.backgroundColor = "white";
      isDrawing = false;
      ismousedown = false;

}


toolbar.appendChild(polygonClip);
toolbar.appendChild(rectClip);
toolbar.appendChild(circleClip);
toolbar.appendChild(download);
toolbar.appendChild(closeBtn);



async function startCapture(){
  try {
    videoElement.srcObject = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions)
    console.log(videoElement.srcObject)
    videoElement.srcObject.getVideoTracks()[0].onended = ()=>{
      browser.runtime.sendMessage({dock:false},()=>{
        document.body.removeChild(viewFullScreen);
      });
      if(document.fullscreenElement)
        document.exitFullscreen()
    }
  }catch(err) {
    console.error("Error" + err)
    return false;
  }
  return true;
}



if(displayScreen){
  displayScreen.addEventListener("click",()=>{
    startCapture().then(()=>{
      addNextBtn();
    })
  })
}
function addBtn(){
  document.body.appendChild(displayScreen);
}



docElm.addEventListener("fullscreenchange",(listener)=>{
  if(!document.fullscreenElement){
    document.body.removeChild(toolbar);
    document.body.removeChild(canvas);
  }
})
if (viewFullScreen) {
  viewFullScreen.addEventListener("click", function() {    
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen().then(()=>{
          document.body.appendChild(toolbar);
          document.body.removeChild(viewFullScreen);
        })
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      }
  })  
}
function addNextBtn(){
document.body.appendChild(viewFullScreen);
document.body.removeChild(displayScreen);
}


function removeBtn(){
  try{
    if(Array.from(document.body.childNodes).indexOf(displayScreen))
    document.body.removeChild(displayScreen);
    if(Array.from(document.body.childNodes).indexOf(viewFullScreen))
    document.body.removeChild(viewFullScreen);
    if(videoElement.srcObject)
    videoElement.srcObject.getVideoTracks()[0].stop();
  }catch(err){
    console.log(err);
  }
}



function getImage(){


    cv2.width = canvas.width ;
    cv2.height = canvas.height;
    document.body.appendChild(cv2);
    ctx2.drawImage(videoElement, 0, 0, cv2.width, cv2.height);
    console.log("hi")
    if(tool != "rect" && tool != "circle"){
      
      if(existingLines.length){
  
        ctx2.beginPath();
        ctx2.moveTo(existingLines[0].startX,existingLines[0].startY)
        for (var i = 0; i < existingLines.length; ++i) {
          var line = existingLines[i];
          ctx2.lineTo(line.endX,line.endY);
        }
        ctx2.closePath();
        ctx2.clearRect(0,0,cv2.width,cv2.height);
        ctx2.clip();
        
      }
    }else if(tool == "circle"){
      ctx2.arc(existingCircle.startx + (existingRect.endx - existingCircle.startx)/2,existingCircle.starty + (existingRect.endy - existingCircle.starty)/2,Math.sqrt((existingRect.endx - existingCircle.startx)**2 + (existingRect.endy - existingCircle.starty) **2)/2,0,2*Math.PI);
      ctx2.clearRect(0,0,cv2.width,cv2.height);
      ctx2.clip();
    }else if(tool == "rect"){
      let region = new Path2D();
      region.rect(Math.abs(existingRect.startx),Math.abs(existingRect.starty),Math.abs(existingRect.endx - existingRect.startx),Math.abs(existingRect.starty - existingRect.endy) );
      ctx2.clearRect(0,0,cv2.width,cv2.height);
      ctx2.clip(region)
    }
    ctx2.drawImage(videoElement, 0, 0, cv2.width, cv2.height);
    imageData = cv2.toDataURL('image/jpg');
    downloadLink.href = imageData;
    downloadLink.click();
    existingLines = [];
    tool = null;
}


browser.runtime.onMessage.addListener((request) => {
  if(request.dock){
    addBtn();
  }else{
    removeBtn();
  }
  
  return Promise.resolve({docked:request.dock});
});


