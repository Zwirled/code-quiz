let startContainer = document.querySelector('#start-screen');
let questionContainer = document.querySelector('#questions');
let endContainer = document.querySelector('#end-screen');

let questionTitle = document.querySelector('#question-title');
let choiceContainer = document.querySelector('#choices');

let time = document.querySelector('#time');
let count = 60;

// Starts timer at 60 before pressing start button
time.textContent = count;

let currentQuestion = 0;

let correctAudio = new Audio('./assets/sfx/correct.wav');
let incorrectAudio = new Audio('./assets/sfx/incorrect.wav');

function init() {
    // Get existing scores from local storage
    let savedScores = localStorage.getItem("highscores");

    // If scores exist
    if (savedScores) {
        // Convert string to object
        highscores = JSON.parse(savedScores);
    }

    // Get the ordered list element
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
}

// Gets existing scores from local storage
init();



// Begin the timer
function startTimer() {
    // Timer element - starts the 60s countdown
    let timer = setInterval(function () {
        // Count timer to go down by 1 after each iteration
        count--;
        // Change the time ID content to be equal to the count
        time.textContent = count;
        // End the timer if it reaches 0s
        if (count <= 0) {
            // Stops timer
            clearInterval(timer);
            // Sets visible time to 0
            time.textContent = 0;
        }
        // If all questions have been answered, stop the timer
        if (currentQuestion === quiz.length - 1) {
            // Stops timer
            clearInterval(timer);

        }
        // Change interval every 1s
    }, 1000);
}


// Get the next question along
function nextQuestion() {
    // Change the question title (Replace content in the H2)
    questionTitle.textContent = quiz[currentQuestion].question;
    // Reset the innerHTML of the #choices div to an empty string
    choiceContainer.innerHTML = '';
    // Reset the innerHTML of the ul to an empty string

    let ul = document.createElement('ul');
    // ul.innerHTML = '';
    choiceContainer.appendChild(ul);

    // For loop to get the list items and buttons within
    for (let i = 0; i < quiz[currentQuestion].choices.length; i++) {
        // Create li element
        let li = document.createElement('li');
        // Create button element
        let choice = document.createElement('button');
        // Set the text within the button to be the choice
        choice.innerText = quiz[currentQuestion].choices[i];
        // Append the button to the li
        li.appendChild(choice);
        // Append the li to the #choices div
        ul.appendChild(li);
    }
}


// Adds event listener to check for correct answer
choiceContainer.addEventListener('click', function (event) {
    // If button with correct answer is clicked...
    if (event.target.innerText === quiz[currentQuestion].answer) {
        // Play the correct audio
        correctAudio.play();
        // Adds 1 point to score
        score += 1;
        // Check if there are questions left
        if (currentQuestion === quiz.length - 1) {
            endQuiz();
            collectScore();
        } else {
            // Increase the index of currentQuestion
            currentQuestion++;
            // Move on to the next question
            nextQuestion();
        }

    } else {
        // Play the correct audio
        incorrectAudio.play();
        // If count is greater than 10s...
        if (count > 10) {
            // Minus 10s from count
            count -= 10;
            // If count is less than 10s
        } else {
            // Set count to 0s
            count = 0;
        }
    }
});

// Hides the start scereen and shows the question container
function startQuiz() {
    // Hide start-screen on start button click
    startContainer.classList.add('hide');

    // Display questions container on start button click
    questionContainer.classList.remove('hide');

    // Calls the next question function
    nextQuestion();
}

// Hides the start scereen and shows the question container
function endQuiz() {
    // Hide questions container on quiz end
    questionContainer.classList.add('hide');

    // Display questions container on start button click
    endContainer.classList.remove('hide');

}


// On start button click, run the following functions...
start.addEventListener('click', function () {
    // Calls the startTimer function above
    startTimer();
    //Calls the startQuiz function above
    startQuiz();
});