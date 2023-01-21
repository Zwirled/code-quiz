
let start = document.querySelector('#start');
let questionContainer = document.querySelector('#questions');

let questionTitle = document.querySelector('#question-title');
let choiceContainer = document.querySelector('#choices');

let time = document.querySelector('#time');
let count = 60;

// Starts timer at 60 before pressing start button
time.textContent = count;

let currentQuestion = 0;

// init(); // come back to later



// Begin the timer
function startTimer() {
    //Timer element - starts the 60s countdown
    let timer = setInterval(function () {
        // Count timer to go down by 1 after each iteration
        count--;
        // Change the time ID content to be equal to the count
        time.textContent = count;
        // End the timer if it reaches 0s
        if (count <= 0) {
            // Clears interval and stops timer
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
        choiceContainer.appendChild(li);
    }
}


// Adds event listener to correct answer
choiceContainer.addEventListener('click', function (event) {
    // If button with correct answer is clicked...
    if (event.target.innerText === quiz[currentQuestion].answer) {
        // Increase the index of currentQuestion
        currentQuestion++;
        // Move on to the next question
        nextQuestion();

    } else {
        // Minus 10s from the timer
        count -= 10;
    }
});


// Hides the start scereen and shows the question container
function startQuiz() {
    // Hide start-screen on start button click
    document.getElementById('start-screen').classList.add('hide');

    // Display questions container on start button click
    questionContainer.classList.remove('hide');

    // Calls the next question function
    nextQuestion();
}



// On start button click, run the following functions...
start.addEventListener('click', function () {
    // Calls the startTimer function above
    startTimer();
    //Calls the startQuiz function above
    startQuiz();
});