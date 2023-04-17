var startButton = document.querySelector("#start-button");
var welcomePrompt = document.getElementById("welcome-prompt");
var timerDisplay = document.getElementById("timer");
var mainSection = document.getElementById("main-section");
var secondsRemaining = 60;

var questionsArr = [
    {
        question: "This is question 1",
        option1: "Option 1",
        option2: "Option 2",
        option3: "Option 3",
        option4: "Option 4",
        answer: "This is answer 1"
    }
];

var endQuiz = function() {

;}

var startTimer = function() {
    var timer = setInterval(function() {
        timerDisplay.textContent = "Time Remaining: " + secondsRemaining + " seconds";
        secondsRemaining--;
        if (secondsRemaining <= 0) {
            clearInterval(timer);
            timerDisplay.textContent = "Time's Up!"
            endQuiz();
        }
    }, 1000); 
}

var startQuiz = function() {
    console.log("quiz has started");
    startTimer();
    welcomePrompt.remove();
    
    // create div inside main section to view questions
    var questionSpaceEl = document.createElement("div");
    questionSpaceEl.className = "question-div";
    mainSection.appendChild(questionSpaceEl);

    // create questions elements and append to questionSpaceEl
    var question = document.createElement("h3");
    question.className = "question";
    question.textContent = questionsArr[0].question;
    questionSpaceEl.appendChild(question);

    var questionOption1 = document.createElement("button");
    questionOption1.className = "question-option";
    questionOption1.textContent = questionsArr[0].option1;
    questionSpaceEl.appendChild(questionOption1);

    var questionOption2 = document.createElement("button");
    questionOption2.className = "question-option";
    questionOption2.textContent = questionsArr[0].option2;
    questionSpaceEl.appendChild(questionOption2);

    var questionOption3 = document.createElement("button");
    questionOption3.className = "question-option";
    questionOption3.textContent = questionsArr[0].option3;
    questionSpaceEl.appendChild(questionOption3);

    var questionOption4 = document.createElement("button");
    questionOption4.className = "question-option";
    questionOption4.textContent = questionsArr[0].option4;
    questionSpaceEl.appendChild(questionOption4);


};

startButton.addEventListener("click", startQuiz);