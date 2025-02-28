chrome.action.onClicked.addListener((tab) => {
  // Handle extension icon click if needed
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content.js"]
  });
});





