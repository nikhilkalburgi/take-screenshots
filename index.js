let dock = false;
function onError(error) {
  console.error(`Error: ${error}`);
}

function sendMessageToTabs(tabs) {
  for (let tab of tabs) {
    browser.tabs.sendMessage(
      tab.id,
      {id: tab.id,dock:dock}
    ).then((response) => {

    }).catch(onError);
  }
}

browser.runtime.onMessage.addListener((request,sender,response) => {
  if(request.dock != undefined)
  dock = request.dock;
  response();
  })


  browser.browserAction.onClicked.addListener(function() {
    dock = !dock;
    browser.tabs.query({
      currentWindow: true,
      active: true
    }).then(sendMessageToTabs).catch(onError);
  });

  