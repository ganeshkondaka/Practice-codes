chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content.js"]
  });
});















// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.action === "summarize") {
//       console.log("Processing summary for:", message.text);
  
//       // Example API call (replace with actual AI API)
//       fetch("https://api.example.com/summarize", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ text: message.text })
//       })
//       .then(response => response.json())
//       .then(data => {
//         chrome.tabs.sendMessage(sender.tab.id, { action: "displaySummary", summary: data.summary });
//       })
//       .catch(error => console.error("Error:", error));
//     }
//   });
  
