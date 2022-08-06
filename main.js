function addBtn(){
  var viewFullScreen = document.createElement('button');
if (viewFullScreen) {
  viewFullScreen.addEventListener("click", function() {
    var docElm = document.documentElement;
    if (docElm.requestFullscreen) {
      docElm.requestFullscreen();
    } else if (docElm.msRequestFullscreen) {
      docElm.msRequestFullscreen();
    } else if (docElm.mozRequestFullScreen) {
      docElm.mozRequestFullScreen();
    } else if (docElm.webkitRequestFullScreen) {
      docElm.webkitRequestFullScreen();
    }
  })
}
viewFullScreen.innerHTML = "viewFullScreen";
document.body.appendChild(viewFullScreen);
}

browser.runtime.onMessage.addListener((request) => {
console.log(request)
  if(request.dock){

    addBtn();
  }
  
  return Promise.resolve({docked:request.dock});
});


