
let start = document.querySelector('#start');
let questionContainer = document.querySelector('#questions');

let time = document.querySelector('#time');
let timer;
let count = 60;
time.textContent = count;

// init();

start.addEventListener("click", function (event) {
    // hide start-screen on start button click
    document.getElementById("start-screen").classList.add('hide');

    //display questions container on start button click
    document.getElementById("questions").classList.remove('hide');

    //timer element - starts the 60s countdown
    timer = setInterval(function () {
        count--;
        time.textContent = count;
        // End the timer if it reaches 0s
        if (count <= 0) {
            // Clears interval and stops timer
            clearInterval(timer);
        }
    }, 1000);
});