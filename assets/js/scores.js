let score = 0;

let saveData = document.querySelector('#submit');
let initialsInput = document.querySelector('#initials');

let finalScore = document.getElementById("final-score")

let highscores;
let savedScores = localStorage.getItem("highscores");
if (savedScores) {
    highscores = JSON.parse(savedScores);
} else {
    highscores = [];
}

let ol = document.querySelector('#highscores');

// Collect score and remaining time
function collectScore() {
    // Create the message to display at end of quiz
    let scoreMessage = score + "/" + quiz.length + " and you had " + count + "s remaining";
    // Add message to final score span
    finalScore.textContent = scoreMessage;
}

// On submit button click...
saveData.addEventListener('click', function () {
    // If value in input on submit is empty, return
    if (initialsInput.value === '') {
        return;
    } else {
        // Store data in object
        let highscore = {
            initials: initialsInput.value.trim(),
            score: score,
        };
        highscores.push(highscore);
        // Store data in local storage
        localStorage.setItem("highscores", JSON.stringify(highscores));

        redirect();
    }
    // Reset the input
    initialsInput.value = "";
});

function redirect() {
    // Redirect user to highscores html page
    window.location.href = "highscores.html";
}