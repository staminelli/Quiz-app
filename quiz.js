

const categoriesText = document.getElementById("categories");
const categories = Object.keys(questions); //in questions.js
const question = document.getElementById("question");
const options = Array.from(document.getElementsByClassName("option"));  // Array.from converts the HTMLCollection to an array
const divOptions = document.getElementById("options");
const scoreText = document.getElementById("score");
const progressBar = document.getElementById("progressBar");
const progressBarContainer = document.getElementById("progressBar_container");
const question_container = document.getElementById("question_container");
const timerText = document.getElementById("timer");
// const nextButton = document.getElementById("next");
const restartButton = document.getElementById("restart");
const answer = document.getElementById("answer")
const time = 10
const timeOut = 2000


let currentQuestion;
let score;
let timer
let interval;
let quiz;


function showCategories() {
    categoriesText.innerHTML = "";
    categories.forEach((category) => {
        const button = document.createElement("button");
        button.innerText = category.toUpperCase();
        button.classList.add("btn");
        button.addEventListener("click", () => {
            selectCategory(category);
        })
        categoriesText.appendChild(button);
    })
}

function selectCategory(category) {
    quiz = questions[category];
    categoriesText.style.display = "none";
    divOptions.style.display = "flex"
    currentQuestion = 0;
    score = 0;
    showQuiz();
    nextQuestion();
}


function nextQuestion() {
    clearInterval(interval)
    answer.innerText = ""
    if (currentQuestion < Object.keys(quiz).length) {
        question.innerText = quiz[currentQuestion].question;
        options.forEach((option, index) => {
            option.style.backgroundColor = "white";
            option.style.pointerEvents = "auto";  // Enable the click
            option.innerText = quiz[currentQuestion].options[index];
        })
        timer = time;
        timerText.innerText = "Tiempo: " + timer
        interval = setInterval(() => {
            timer--;
            timerText.innerText = "Tiempo: " + timer;
            if (timer == 0) {
                clearInterval(interval);
                checkAnswer(-1);
                timerText.innerText = "Tiempo: 0"
                setTimeout(() => {
                    nextQuestion();
                }, timeOut);
                
            }
        }, 1000);
        // scoreText.innerText = `Score: ${score}`;
        progressBar.style.width = `${(currentQuestion / Object.keys(quiz).length) * 100}%`;
        progressBar.innerText = `${(currentQuestion / Object.keys(quiz).length) * 100}%`;

    } else {  //Fin del juego
        timerText.style.visibility = "hidden";
        question.innerText = "Fin del juego\nTu puntaje es: " + score;
        divOptions.style.display = "none"
        clearInterval(interval);
        // hideUI();
        progressBar.style.width = `${(currentQuestion / Object.keys(quiz).length) * 100}%`;
        progressBar.innerText = `${(currentQuestion / Object.keys(quiz).length) * 100}%`;
        restartButton.style.visibility = "visible";
    }
}

function showQuiz() {
    // scoreText.style.visibility = "visible";
    timerText.style.visibility = "visible";
    progressBarContainer.style.display = "block"
    divOptions.style.display = "flex"
    question_container.style.visibility = "visible";
}

function hideQuiz() {
    progressBarContainer.style.display = "none"
    timerText.style.visibility = "hidden";
    question_container.style.visibility = "hidden";
    divOptions.style.display = "none"
    // scoreText.style.visibility = "hidden";
}

function checkAnswer(option) {
    if (option == quiz[currentQuestion].answer) { // Correct answer
        score+=timer;
        clearInterval(interval);
        options[option].style.backgroundColor = "darkseagreen";
        // scoreText.innerText = `Score: ${score}`;
        answer.style.color = "green"
        answer.innerText = "Respuesta correcta"
        options.forEach((option) => {
            option.style.pointerEvents = "none";  // Disable the click
        })
        setTimeout(() => {
            nextQuestion();
        }, timeOut);
    }
    else if (option == -1) {  // Time's up
        // clearInterval(interval)
        answer.style.color = "black"
        answer.innerText = "Se terminó el tiempo"
        // options[quiz[currentQuestion].answer].style.backgroundColor = "green";
        options.forEach((option) => {
            option.style.pointerEvents = "none";  // Disable the click
        })
        setTimeout(() => {
            nextQuestion();
        }, timeOut);
    }
    else { // Wrong answer
        clearInterval(interval);
        answer.style.color = "red"
        answer.innerText = "Respuesta incorrecta"
        options[option].style.backgroundColor = "red";
        // options[quiz[currentQuestion].answer].style.backgroundColor = "darkseagreen";
        options.forEach((option) => {
            option.style.pointerEvents = "none";  // Disable the click
        })
        setTimeout(() => {
            nextQuestion();
        }, timeOut);
    }
    currentQuestion++;
    
}

function restart() {
    hideQuiz();
    restartButton.style.visibility = "hidden";
    categoriesText.style.display = "grid";
    showCategories();
}

restart();








