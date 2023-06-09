var startButton = document.querySelector("#start-button");
var welcomePrompt = document.getElementById("welcome-prompt");
var timerDisplay = document.getElementById("timer");
var mainSection = document.getElementById("main-section");
var secondsRemaining = 60;
var currentQuestion = 0;
var highscores = [];


var questionsArr = [
    {
        question: "JavaScript is an _________ language?",
        option1: "Object-Oriented",
        option2: "Procedural",
        option3: "Object-Based",
        option4: "None of the above",
        answer: "Object-Oriented"
    },
    {
        question: "Which of the following keywords is used to define a variable in JavaScript?",
        option1: "var",
        option2: "let",
        option3: "Both A and B",
        option4: "None of the above",
        answer: "Both A and B"
    },
    {
        question: "Which of the following is used to access HTML elements using JavaScript?",
        option1: "getElementById()",
        option2: "getElementsByClassName()",
        option3: "querySelector()",
        option4: "All of the above",
        answer: "All of the above"
    },
    {
        question: "How can a datatype be declared to be a constant type?",
        option1: "const",
        option2: "var",
        option3: "let",
        option4: "constant",
        answer: "const"
    },
    {
        question: "What does the JavaScript 'debugger' statement do?",
        option1: "It will debug errors in the program at runtime",
        option2: "It acts as a breakpoint in the program",
        option3: "It will debug any error in the statement in which it is placed",
        option4: "All of the above",
        answer: "It acts as a breakpoint in the program"
    },
    {
        question: "The process in which an object or data structure is translated into a format suitable for transferral over a network, or storage is called...?",
        option1: "Object Inheritance",
        option2: "Object Encapsulation",
        option3: "Object Serialization",
        option4: "None of the above",
        answer: "Object Serialization"
    },
    {
        question: "Which method is used to serialize an object into a JSON string in JavaScript?",
        option1: "stringify()",
        option2: "parse()",
        option3: "convert()",
        option4: "None of the above",
        answer: "stringify()"
    },
    {
        question: "Which of the following is a closure in JavaScript?",
        option1: "Variables",
        option2: "Functions",
        option3: "Objects",
        option4: "All of the above",
        answer: "All of the above"
    },
    {
        question: "Which of the following is used to declare an asynchronous function in JavaScript?",
        option1: "await",
        option2: "async",
        option3: "setTimeout",
        option4: "None of the Above",
        answer: "async"
    },
    {
        question: "What does the ... operator do in JavaScript?",
        option1: "It is used to spread iterables to individual elements",
        option2: "It is used to describe a datatype of undefined size",
        option3: "Delay the execution of a function",
        option4: "None of the above",
        answer: "It is used to spread iterables to individual elements"
    }
];



var saveScore = function(score) {
    var saveScoreDivEl = document.createElement("div");
    saveScoreDivEl.className = "question-div";
    
    var savePromptEl = document.createElement("p");
    savePromptEl.textContent = "Would you like to save you score to the leaderboard?";

    var nameInputEl = document.createElement("input");
    nameInputEl.setAttribute("id", "name-input");
    nameInputEl.setAttribute("placeholder", "Your Name");
    nameInputEl.setAttribute("type", "text");

    var saveButtonEl = document.createElement("button");
    saveButtonEl.setAttribute("id", "save-button");
    saveButtonEl.textContent = "Save";

    saveScoreDivEl.appendChild(savePromptEl);
    saveScoreDivEl.appendChild(nameInputEl);
    saveScoreDivEl.appendChild(saveButtonEl);

    mainSection.appendChild(saveScoreDivEl);

    saveButtonEl.addEventListener("click", function() {
        // remove last item in array (lowest score)
        if (highscores.length >= 5) {
            highscores.pop();
        }

        var name = nameInputEl.value;

        highscores.push({
            name: name,
            score: score
        });

        localStorage.setItem("highscores", JSON.stringify(highscores));
        location.href = "./highscores.html";
    })
};

var displayScore = function(score) {
    timerDisplay.remove();

    var scoreDivEl = document.createElement("div");
    scoreDivEl.className = "question-div";
    
    var finalMessageEl = document.createElement("p");
    finalMessageEl.setAttribute("id", "congrats");
    finalMessageEl.textContent = "Congrats! You have completed the challenge!";

    var scoreMessageEl = document.createElement("p");
    scoreMessageEl.setAttribute("id", "score-message");
    scoreMessageEl.textContent = "Final Score: " + score;

    scoreDivEl.appendChild(finalMessageEl);
    scoreDivEl.appendChild(scoreMessageEl);

    mainSection.appendChild(scoreDivEl);
    if (highscores.length < 5) {
        saveScore(score);
    }
    else if (score > highscores[4].score) {
        console.log(highscores);
        saveScore(score);
    }
    else {
        var saveScoreDivEl = document.createElement("div");
        saveScoreDivEl.className = "question-div";
        
        var savePromptEl = document.createElement("p");
        savePromptEl.textContent = "Sorry, your score was not high enough to make it on the leaderboard. Try again!";

        saveScoreDivEl.appendChild(savePromptEl);
        mainSection.appendChild(saveScoreDivEl);
    }

    
};

var endQuiz = function() {
    var questionDiv = document.getElementById("question-div");
    var answerValidation = document.getElementById("answer-validation");

    questionDiv.remove();
    answerValidation.remove();

    console.log("The quiz has ended");
     
    if (secondsRemaining > 0) {
        var score = secondsRemaining;
        secondsRemaining = 0;
        console.log(score);
        displayScore(score);
    }
    else {
        timerDisplay.textContent = "Time's Up!"
    }
    
;}

var displayQuestion = function() {
    var question = document.getElementById("question");
    var optionOne = document.getElementById("option-one");
    var optionTwo = document.getElementById("option-two");
    var optionThree = document.getElementById("option-three");
    var optionFour = document.getElementById("option-four");


    question.textContent = questionsArr[currentQuestion].question;
    optionOne.textContent = questionsArr[currentQuestion].option1;
    optionTwo.textContent = questionsArr[currentQuestion].option2;
    optionThree.textContent = questionsArr[currentQuestion].option3;
    optionFour.textContent = questionsArr[currentQuestion].option4;
};

var validateAnswer = function(event) {
    var answerValidation = document.getElementById("answer-validation");
    var answer = event.target.textContent;

    if (answer === questionsArr[currentQuestion].answer) {
        answerValidation.textContent = "Correct!"
    }
    else {
        answerValidation.textContent = "Wrong!"
        secondsRemaining = secondsRemaining - 10;
    }

    if (currentQuestion < 9) {
        currentQuestion++;
        displayQuestion();
    }
    else {
        endQuiz();
    }   
    
};

var startTimer = function() {
    var timer = setInterval(function() {
        timerDisplay.textContent = "Time Remaining: " + secondsRemaining + " seconds";
        secondsRemaining--;
        if (secondsRemaining <= 0) {
            secondsRemaining = 0;
            clearInterval(timer);
            endQuiz();
        }
    }, 1000); 
};

var startQuiz = function() {
    console.log("quiz has started");
    startTimer();
    welcomePrompt.remove();
    
    // create div inside main section to view questions
    var questionSpaceEl = document.createElement("div");
    questionSpaceEl.className = "question-div";
    questionSpaceEl.setAttribute("id", "question-div");
    mainSection.appendChild(questionSpaceEl);

    // create response text
    var responseText = document.createElement("p");
    responseText.setAttribute("id", "answer-validation");
    mainSection.appendChild(responseText);

    // create questions elements and append to questionSpaceEl
    var question = document.createElement("p");
    question.className = "question";
    question.setAttribute("id", "question");
    questionSpaceEl.appendChild(question);

    var questionOption1 = document.createElement("button");
    questionOption1.className = "question-option";
    questionOption1.setAttribute("id", "option-one");
    questionSpaceEl.appendChild(questionOption1);

    var questionOption2 = document.createElement("button");
    questionOption2.className = "question-option";
    questionOption2.setAttribute("id", "option-two");
    questionSpaceEl.appendChild(questionOption2);

    var questionOption3 = document.createElement("button");
    questionOption3.className = "question-option";
    questionOption3.setAttribute("id", "option-three");
    questionSpaceEl.appendChild(questionOption3);

    var questionOption4 = document.createElement("button");
    questionOption4.className = "question-option";
    questionOption4.setAttribute("id", "option-four");
    questionSpaceEl.appendChild(questionOption4);

    questionSpaceEl.addEventListener("click", validateAnswer);

    displayQuestion();
};

var loadScores = function() {
    highscores = localStorage.getItem("highscores");
    highscores = JSON.parse(highscores);

    if (!highscores) {
        highscores = [];
    }
    else {
        highscores.sort(function(a,b) {
            return parseInt(b.score) - parseInt(a.score);
        })
    }
    
    console.log(highscores);
};

loadScores();
startButton.addEventListener("click", startQuiz);