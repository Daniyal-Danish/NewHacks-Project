
//const prompt = "Explain how AI works";

function sendPromptToGemini() {
    console.log("HELLO");
    const promptElement = document.getElementById("PROMPT");
    const prompt = promptElement.textContent;
    console.log(promptElement);
    const { GoogleGenerativeAI } = require("@google/generative-ai");
    const genAI = new GoogleGenerativeAI("AIzaSyA6HqDl6tkvRX9pVol_MNv5FsLGrkJEKgo");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    model.generateContent(prompt).then((result) => {
        console.log(result.response.text());
    });
}

window.sendPromptToGemini = sendPromptToGemini;

// sendPromptToGemini(prompt);