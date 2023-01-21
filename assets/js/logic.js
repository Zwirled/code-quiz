
let start = document.querySelector('#start');
let questionContainer = document.querySelector('#questions');

let question = document.querySelector('#question-title');
let choiceContainer = document.querySelector('#choices');

let time = document.querySelector('#time');
let timer;
let count = 60;
time.textContent = count;

// init();

start.addEventListener("click", function () {
    // hide start-screen on start button click
    document.getElementById("start-screen").classList.add('hide');

    //display questions container on start button click
    questionContainer.classList.remove('hide');

    // Add the question into the h2
    question.textContent = quizInfo[0].question;

    //create the ordered list
    const list = document.createElement('ol');

    // create a loop to get each list item (choices)
    for (let i = 0; i < quizInfo[0].choices.length; i++) {

        // create the list items
        const li = document.createElement('li');

        // assign the object array to the list item
        li.textContent = quizInfo[0].choices[i];

        // append to the ordered list
        list.appendChild(li);
    }

    // append the list to the choices ID
    choiceContainer.append(list);

    //timer element - starts the 60s countdown
    timer = setInterval(function () {
        // count timer to go down by 1 after each iteration
        count--;
        // change the time ID content to be equal to the count
        time.textContent = count;
        // End the timer if it reaches 0s
        if (count <= 0) {
            // Clears interval and stops timer
            clearInterval(timer);
        }
        // change interval every 1s
    }, 1000);
});