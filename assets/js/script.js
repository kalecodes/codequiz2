var startButton = document.querySelector("#start-button");
var welcomePrompt = document.getElementById("welcome-prompt");
var timerDisplay = document.getElementById("timer");
var secondsRemaining = 60;

var questionsArr = [
    {
        question: "This is question 1",
        answer: "This is answer 1"
    },
    {
        question: "This is question 2",
        answer: "This is answer 2"
    },
    {
        question: "This is question 3",
        answer: "This is answer 3"
    },
    {
        question: "",
        answer: ""
    },
    {
        question: "",
        answer: ""
    },
    {
        question: "",
        answer: ""
    },
    {
        question: "",
        answer: ""
    },
    {
        question: "",
        answer: ""
    },
    {
        question: "",
        answer: ""
    },
    {
        question: "",
        answer: ""
    },
];

var endQuiz = function() {

;}

var startTimer = function() {
    var timer = setInterval(function() {
        timerDisplay.textContent = "Time Remaining: " + secondsRemaining + " seconds";
        secondsRemaining--;
        console.log("Time Remaining: " + secondsRemaining + " seconds");
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


};

startButton.addEventListener("click", startQuiz);