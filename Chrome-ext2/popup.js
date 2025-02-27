document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["selectedText"], (data) => {
    if (data.selectedText) {
      document.getElementById("summary").innerText = data.selectedText;
    } else {
      document.getElementById("summary").innerText = "No text selected. Select text on a webpage to see it here.";
    }
  });
});











// document.getElementById("summarizeBtn").addEventListener("click", async () => {
//     let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
//     chrome.scripting.executeScript({
//       target: { tabId: tab.id },
//       function: getSelectedText,
//     });
//   });
  
//   function getSelectedText() {
//     let selectedText = window.getSelection().toString();
//     if (!selectedText) {
//       alert("Please select some text first.");
//       return;
//     }
  
//     chrome.runtime.sendMessage({ action: "summarize", text: selectedText });
//   }
  