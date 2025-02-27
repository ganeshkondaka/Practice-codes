document.addEventListener("mouseup", () => {
  let selectedText = window.getSelection().toString().trim();
  if (selectedText.length > 0) {
    let icon = document.createElement("div");
    icon.innerText = "📌 Go to Summary";
    icon.style.position = "absolute";
    icon.style.background = "yellow";
    icon.style.padding = "5px";
    icon.style.cursor = "pointer";
    icon.style.zIndex = "1000";

    let range = window.getSelection().getRangeAt(0);
    let rect = range.getBoundingClientRect();
    icon.style.top = `${rect.top + window.scrollY - 30}px`;
    icon.style.left = `${rect.left + window.scrollX}px`;
    document.body.appendChild(icon);

    icon.addEventListener("click", () => {
      chrome.storage.local.set({ selectedText });
      icon.remove();
    });

    setTimeout(() => icon.remove(), 5000);
  }
});



// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.action === "summarize") {
//       console.log("Selected text:", message.text);
//     }
//   });
  