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
}

// Redirect to highscores page on button submit click
function redirect() {
    // Change window location to highscores
    window.location.href = "highscores.html";
}

// Stops code running on pages without the button
if (submit) {
    // On submit button click...
    submit.addEventListener('click', function () {
        // If value in input on submit is empty, return
        if (initialsInput.value === '') {
            // Do nothing
            return;
        } else {
            // Call redirect function
            redirect()
            // Store data in object
            let highscore = {
                initials: initialsInput.value.trim(),
                score: score,
            };
            //Push highscore object to highscores array
            highscores.push(highscore);
            // Store data in local storage as string
            localStorage.setItem("highscores", JSON.stringify(highscores));

        }
        // Reset the input
        initialsInput.value = "";
    });
}

let ol = document.getElementById("highscores");

// Stops code running on pages without the highscores ol
if (ol) {
    for (let i = 0; i < highscores.length; i++) {
        // Create the li element within the ol
        let li = document.createElement('li');
        // Set the content of the li
        li.innerHTML = highscores[i].initials + ': ' + highscores[i].score;
        // Append the li to the ol
        ol.appendChild(li);
    }
}

// Reset the local storage of highscores
function reset() {
    localStorage.removeItem("highscores");
    // Reset the ol
    ol.innerHTML = '';
}

// If clear button exists
if (clear) {
    // If clear button is clicked...
    clear.addEventListener('click', function () {
        // Call the reset function
        reset();
    });
}