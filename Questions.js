const questions = [
    {
        question: "1. What is the primary use case for the device?",
        type: "radio",
        name: "Device Use Case",
        options: ["School", "Work", "Personal", "Entertainment"],
        required: true
    },
    {
        question: "2. Do you reuse the same 3-4 passwords for most of your accounts?",
        type: "radio",
        name: "Password Reuse",
        options: ["Yes", "No"],
        required: true
    },
    {
        question: "3. Have you enabled 2-factor/multiple factor authentication on all you accounts?",
        type: "radio",
        name: "Use of 2FA/MFA",
        options: ["Yes", "No", "Some Accounts"],
        required: true
    },
    {
        question: "4. When you download files or applications, where do you usually get them from?",
        type: "radio",
        name: "Location of Downloads",
        options: ["Official Websites/App Stores", "Links From Emails/Ads", "File-Sharing Sites", "Third-Party Stores"],
        required: true
    },
    {
        question: "5. If you are informed that your account has been involved in a data breach, what would you do?",
        type: "radio",
        name: "Data Breach Scenario",
        options: ["Change Password", "Read But Don't Take Action", "Ignore It"],
        required: true
    },
    {
        question: "6. When freely roaming the internet, what websites do you usually visit?",
        type: "radio",
        name: "Main Roaming Websites",
        options: ["Social Media", "Third-Party Websites", "Dating Websites", "Gaming Websites", "E-Commerce/Shopping Websites", "Other"],
        required: true
    },
    {
        question: "7. Please provide additional comments:",
        type: "textarea",
        name: "comments"
    }
];

let currentQuestionIndex = 0;
const answers = {};

function loadQuestion() {
    const questionContainer = document.getElementById('questionContainer');
    questionContainer.innerHTML = '';

    const currentQuestion = questions[currentQuestionIndex];

    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = `<label>${currentQuestion.question}</label><br>`;
    
    if (currentQuestion.type === "radio") {
        currentQuestion.options.forEach(option => {
            questionElement.innerHTML += `
                <div>
                    <input type="radio" name="${currentQuestion.name}" value="${option}" required> ${option}   
                </div>`;
        });
    } else if (currentQuestion.type === "textarea") {
        questionElement.innerHTML += `<textarea name="${currentQuestion.name}" rows="4"></textarea>`;
    }

    questionContainer.appendChild(questionElement);
}

function nextQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    const formData = new FormData(document.getElementById('questionnaireForm'));

    // Store the answer
    if (currentQuestion.type !== "textarea") {
        answers[currentQuestion.name] = formData.get(currentQuestion.name);
    } else {
        answers[currentQuestion.name] = formData.get(currentQuestion.name) || "No comments provided.";
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        displayResults();
    }
}

function displayResults() {
    document.getElementById('questionnaireForm').style.display = 'none';
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<h3>Your Responses:</h3>`;
    let resultString = '';
    console.log(answers);
    for (const [key, value] of Object.entries(answers)) {
        resultString += `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}\n`;
        resultDiv.innerHTML += `<p>${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}</p>`;
    }
    localStorage.setItem('resultString', resultString);
    sendPromptToGemini();
}

// Load the first question when the page loads
window.onload = loadQuestion;
