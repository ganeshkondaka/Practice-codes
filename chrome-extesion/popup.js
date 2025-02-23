document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("image-form");
  const output = document.getElementById("output");
  const extractedText = document.getElementById("extracted-text");
  const copyBtn = document.getElementById("copy-btn");

  output.style.display = "none";

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const fileInput = document.getElementById("image-input");
    const file = fileInput.files[0];
    if (!file) {
      alert("Please select an image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const imageData = e.target.result;

      // Use Tesseract.js to extract text
      try {
        console.log("Processing image...");
        const result = await Tesseract.recognize(imageData, "eng", {
          logger: (info) =>
            console.log(
              info.progress ? `${Math.round(info.progress * 100)}%` : info.status
            ),
        });

        // Display the extracted text
        console.log("Extracted Text:\n", result.data.text);
        extractedText.value = result.data.text;
        output.style.display = "block";
      } catch (error) {
        console.error("Error during text recognition:", error);
        alert("Error processing the image.");
      }
    };

    reader.readAsDataURL(file);
  });

  copyBtn.addEventListener("click", () => {
    extractedText.select();
    document.execCommand("copy");
    alert("Text copied to clipboard!");
  });
});
