/* 
Two Buttons viewFullScreen and displayScreen to initialize.
*/
var style = document.createElement("style");
style.innerHTML=".take-screenshots-after-button-nsk::after{\
  content:'';\
border: 89px solid #0ce31a;\
border-top: 80px solid transparent;\
border-right: 61px solid transparent;\
border-left: 61px solid transparent;\
position: absolute;\
top: -137px;\
left: 14px; }";
document.head.appendChild(style);

var viewFullScreen = document.createElement('button');
viewFullScreen.style.position = "fixed";
viewFullScreen.style.top = "50%";
viewFullScreen.style.left = "50%";
viewFullScreen.style.transform = "translate(-50%,-50%)";
viewFullScreen.style.width = "150px";
viewFullScreen.style.height = "150px";
viewFullScreen.style.border = "None";
viewFullScreen.style.borderRadius = "100px";
viewFullScreen.style.backgroundColor = "#0ce31a";
viewFullScreen.style.color = "black";
viewFullScreen.style.fontSize = "2vh";
viewFullScreen.innerHTML = "Full Screen";
viewFullScreen.style.zIndex = "2147483646";
viewFullScreen.style.cursor = "pointer";
viewFullScreen.className = "take-screenshots-after-button-nsk"

var displayScreen = document.createElement('button');
displayScreen.style.position = "fixed";
displayScreen.style.top = "50%";
displayScreen.style.left = "50%";
displayScreen.style.transform = "translate(-50%,-50%)";
displayScreen.style.width = "150px";
displayScreen.style.height = "150px";
displayScreen.style.border = "None";
displayScreen.style.borderRadius = "100px";
displayScreen.style.backgroundColor = "#0ce31a";
displayScreen.style.color = "black";
displayScreen.style.fontSize = "2vh";
displayScreen.innerHTML = "Get Screen"; 
displayScreen.style.zIndex = "2147483646";
displayScreen.style.cursor = "pointer";
displayScreen.className = "take-screenshots-after-button-nsk";

/*
toolbar with 5 tools
*/
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

// canvas on the screen
let canvas = document.createElement('canvas');
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

// canvas for download
var cv2 = document.createElement('canvas');
var ctx2 = cv2.getContext('2d');
cv2.style.position = "fixed";
cv2.style.top = "0px";
cv2.style.left = "0px";
// cv2.style.display = "none";

let firstClick = true;
var polygonClip = document.createElement("button");
polygonClip.style.border = "none";
var polygonClipToggle = false;
polygonClip.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-vector-pen" viewBox="0 0 16 16">\
<path fill-rule="evenodd" d="M10.646.646a.5.5 0 0 1 .708 0l4 4a.5.5 0 0 1 0 .708l-1.902 1.902-.829 3.313a1.5 1.5 0 0 1-1.024 1.073L1.254 14.746 4.358 4.4A1.5 1.5 0 0 1 5.43 3.377l3.313-.828L10.646.646zm-1.8 2.908-3.173.793a.5.5 0 0 0-.358.342l-2.57 8.565 8.567-2.57a.5.5 0 0 0 .34-.357l.794-3.174-3.6-3.6z"/>\
<path fill-rule="evenodd" d="M2.832 13.228 8 9a1 1 0 1 0-1-1l-4.228 5.168-.026.086.086-.026z"/>\
</svg>';
polygonClip.style.width = "40px";
polygonClip.style.padding = "1vh";
polygonClip.style.cursor = "pointer";

var rectClip = document.createElement("button");
rectClip.style.border = "none"
var rectClipToggle = false;
rectClip.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-square" viewBox="0 0 16 16">\
<path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>\
</svg>';
rectClip.style.width = "40px";
rectClip.style.padding = "1vh";
rectClip.style.cursor = "pointer";

var circleClip = document.createElement("button");
circleClip.style.border = "none"
var circleClipToggle = false;
circleClip.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle" viewBox="0 0 16 16">\
<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>\
</svg>';
circleClip.style.width = "40px";
circleClip.style.padding = "1vh";
circleClip.style.cursor = "pointer";

var download = document.createElement("button");
download.style.border = "none"
download.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">\
<path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>\
<path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>\
</svg>';
download.style.width = "40px";
download.style.padding = "1vh";
download.style.cursor = "pointer";

var closeBtn = document.createElement("button");
closeBtn.style.border = "none";
closeBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">\
<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>\
</svg>';
closeBtn.style.width = "40px";
closeBtn.style.padding = "1vh";
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

// Draw the polygon
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
  ctx.beginPath();
  ctx.moveTo(startX,startY);
  ctx.lineTo(mouseX,mouseY);
  ctx.stroke();
  ctx.closePath();
  isDrawing = true;
}

function onmousedown(e) {
  toolbar.style.bottom = "-5vh";
  if(tool == "polygon"){

    if(firstClick){
      startX = e.clientX;
      startY = e.clientY;
      firstClick = false;
    }
    if (e.button === 0) {
  
        existingLines.push({
          startX: startX,
          startY: startY,
          endX: mouseX,
          endY: mouseY
        });
  
      startX = e.clientX;
      startY = e.clientY;
  
      draw();
  
    }
  }else if(tool == "rect"){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.beginPath();
    existingRect.startx = e.clientX;
    existingRect.starty = e.clientY;
  }else{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.beginPath();
    existingCircle.startx = e.clientX;
    existingCircle.starty = e.clientY;
  }
  ismousedown = true;
}

function onmouseup(e){
  ismousedown = false;
  existingCircle.endx = e.clientX;
  existingCircle.endy = e.clientY;
  existingRect.endx = e.clientX;
  existingRect.endy = e.clientY;
  mouseX = e.clientX;
  mouseY = e.clientY;
  if(tool != "polygon")
  toolbar.style.bottom = "0px";
}

function onmousemove(e) {

  mouseX = e.clientX;
  mouseY = e.clientY;
  if(tool == "polygon"){
  
      if (isDrawing) {
        draw();
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

// Completing the polygon
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

download.onclick = (e)=>{
  e.preventDefault();
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.beginPath();
  document.body.style.pointerEvents = "none";
  polygonClip.style.backgroundColor = "white";
  rectClip.style.backgroundColor = "white";
  circleClip.style.backgroundColor = "white";
  polygonClipToggle = false;
  rectClipToggle = false;
  circleClipToggle = false;
  isDrawing = false;
  ismousedown = false;
  document.body.removeChild(canvas);
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

// Getting the screen access
async function startCapture(){
  try {
    if(!videoElement.srcObject){
      videoElement.srcObject = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions)
      videoElement.srcObject.getVideoTracks()[0].onended = ()=>{
        browser.runtime.sendMessage({dock:false},()=>{
          document.body.removeChild(viewFullScreen);
          document.body.removeChild(downloadLink);
          document.head.removeChild(style);
          document.body.removeChild(videoElement);
          videoElement.srcObject = null;
        });
        if(document.fullscreenElement)
          document.exitFullscreen()
      }

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
  if(!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia){
    alert("Media Unsupported");
    return;
  }
  document.body.appendChild(displayScreen);
}

docElm.addEventListener("fullscreenchange",(listener)=>{
  if(!document.fullscreenElement){
    document.body.removeChild(toolbar);
    document.body.removeChild(canvas);
    browser.runtime.sendMessage({dock:false},()=>{
      document.body.removeChild(downloadLink);
      document.head.removeChild(style);
      document.body.removeChild(videoElement);
    });
  }
})

if (viewFullScreen) {
  viewFullScreen.addEventListener("click", function() {    
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen().then(()=>{
          document.body.removeChild(viewFullScreen);
          document.body.appendChild(toolbar);
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
  document.body.removeChild(displayScreen);
  document.body.appendChild(viewFullScreen);
}

function removeBtn(){
  try{
    if(Array.from(document.body.childNodes).indexOf(displayScreen))
    document.body.removeChild(displayScreen);
    if(Array.from(document.body.childNodes).indexOf(toolbar))
    document.body.removeChild(toolbar);
    if(videoElement.srcObject)
    videoElement.srcObject.getVideoTracks()[0].stop();
    document.body.removeChild(videoElement);
    document.head.removeChild(style);
    document.body.removeChild(downloadLink);
  }catch(err){
    console.log(err);
  }
}

// Downloading the png image
function getImage(){
    cv2.width = canvas.width ;
    cv2.height = canvas.height;
    document.body.appendChild(cv2);
    ctx2.drawImage(videoElement, 0, 0, cv2.width, cv2.height);
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
      ctx2.arc(existingCircle.startx + (existingRect.endx - existingCircle.startx)/2,existingCircle.starty + (existingRect.endy - existingCircle.starty)/2,Math.sqrt((existingRect.endx - existingCircle.startx)**2 + (existingRect.endy - existingCircle.starty) **2)/2 - ctx.lineWidth,0,2*Math.PI);
      ctx2.clearRect(0,0,cv2.width,cv2.height);
      ctx2.clip();
    }else if(tool == "rect"){
      let region = new Path2D();
      region.rect(Math.abs(existingRect.startx)+ctx.lineWidth,Math.abs(existingRect.starty)+ctx.lineWidth,Math.abs(existingRect.endx - existingRect.startx)-ctx.lineWidth,Math.abs(existingRect.starty - existingRect.endy)-ctx.lineWidth);
      ctx2.clearRect(0,0,cv2.width,cv2.height);
      ctx2.clip(region)
    }
    ctx2.drawImage(videoElement, 0, 0, cv2.width, cv2.height);
    imageData = cv2.toDataURL('image/png');
    downloadLink.href = imageData;
    downloadLink.click();
    existingLines = [];
    tool = null;
    document.body.removeChild(cv2);
    popDialog();
    document.body.style.pointerEvents = "auto";
}

function popDialog(){
  let dialog = document.createElement("div");
  dialog.innerHTML = "Downloaded Successfully!";
  dialog.style.backgroundColor = "#0ce31a";
  dialog.style.color = "black";
  dialog.style.padding = "20px";
  dialog.style.position = "absolute";
  dialog.style.top = "50px";
  dialog.style.right = "50px";
  dialog.style.fontSize = "3vh";
  dialog.style.transition = "all 0.4s";
  dialog.style.fontFamily = "sans-serif";
  dialog.style.borderRadius = "4px";
  dialog.style.zIndex = "2147483646";
  dialog.style.opacity = "0";
  document.body.appendChild(dialog);
  setTimeout(()=>{
    dialog.style.opacity = "1";
  },200)
  setTimeout(()=>{
    dialog.style.opacity = "0";
  },2000)
  setTimeout(()=>{
    document.body.removeChild(dialog);
  },2500)
}

// Listening for the background script
browser.runtime.onMessage.addListener((request) => {

  if(request.dock){
    addBtn();
  }else{
    removeBtn();
  }
  
  return Promise.resolve({dock:request.dock});
});


