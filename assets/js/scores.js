let score = 0;

let submit = document.querySelector('#submit');
let initialsInput = document.querySelector('#initials');

let finalScore = document.getElementById("final-score")

let highscores;
let savedScores = localStorage.getItem("highscores");
if (savedScores) {
    highscores = JSON.parse(savedScores);
} else {
    highscores = [];
}

let clear = document.querySelector('#clear');

// Collect score and remaining time
function collectScore() {
    // Create the message to display at end of quiz
    let scoreMessage = score + "/" + quiz.length + " and you had " + count + "s remaining";
    // Add message to final score span
    finalScore.textContent = scoreMessage;
    //
    displayScores()

}

// Stops code running on pages without the button
if (submit) {
    // On submit button click...
    submit.addEventListener('click', function () {
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

        }
        // Reset the input
        initialsInput.value = "";
    });
}

let ol = document.getElementById("highscores");

for (let i = 0; i < highscores.length; i++) {
    let li = document.createElement('li');
    li.innerHTML = highscores[i].initials + ': ' + highscores[i].score;
    ol.appendChild(li);
    console.log(ol);
    console.log(li);
}

function reset() {
    localStorage.removeItem("highscores");
    ol.innerHTML = '';
}

clear.addEventListener('click', function () {
    reset();
});