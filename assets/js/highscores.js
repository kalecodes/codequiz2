var scoresList = document.querySelector("#scores-list");

var loadScores = function() {
    highscores = localStorage.getItem("highscores");

    if (!highscores) {
        return false;
    }

    highscores = JSON.parse(highscores);

    highscores.sort(function(a,b) {
        return parseInt(b.score) - parseInt(a.score);
    })

    for (var i = 0; i < highscores.length; i++) {
        var scoreEl = document.createElement("li");
        scoreEl.className = "score";
        scoreEl.textContent = highscores[i].name + " : " + highscores[i].score;

        scoresList.appendChild(scoreEl);
    }

    
};




loadScores();