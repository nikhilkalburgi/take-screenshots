let docked = false;
let dock = false;
function onError(error) {
  console.error(`Error: ${error}`);
}

function sendMessageToTabs(tabs) {
  for (let tab of tabs) {
    browser.tabs.sendMessage(
      tab.id,
      {id: tab.id,dock:true}
    ).then((response) => {
      docked = response.docked;
    }).catch(onError);
  }
}


  browser.browserAction.onClicked.addListener(function() {
    console.log("icon clicked!!")
    browser.tabs.query({
      currentWindow: true,
      active: true
    }).then(sendMessageToTabs).catch(onError);
  });
  