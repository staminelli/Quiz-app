

const homeBtnContainer = document.getElementById("home_buttons_container")
const playButton = document.getElementById("playButton")
const rankingButton = document.getElementById("rankingButton")
const rankingContainer = document.getElementById("ranking_container")
const inputName = document.getElementById("name_input")
const players = document.getElementById("players")
const listPlayers = document.getElementById("listPlayers") 
const rankingTable = document.getElementById("ranking")
const categoriesText = document.getElementById("categories");
const categories = Object.keys(questions); //in questions.js
const question = document.getElementById("question");
const divOptions = document.getElementById("options");
const scoreText = document.getElementById("score");
const progressBar = document.getElementById("progressBar");
const progressBarContainer = document.getElementById("progressBar_container");
const question_container = document.getElementById("question_container");
const timerText = document.getElementById("timer");
const timerContainer = document.getElementById("timer_container")
// const nextButton = document.getElementById("next");
const restartButton = document.getElementById("restart");
const startButton = document.getElementById("start");
const answer = document.getElementById("answer")
const time = 10
const timeOut = 2000


let options;
let currentQuestion;
let score;
let timer
let interval;
let quiz;


playButton.addEventListener ("click", () => {
    players.style.display = "block"
    // playButton.style.display = "none"
    // rankingButton.style.display = "none"
    homeBtnContainer.style.display = "none"
    rankingContainer.style.display = "none"
})

rankingButton.addEventListener ("click", () => {
    let playersList = []
    let playerScores = {}
    for (let i = 0; i < localStorage.length; i++) {
        playerScores = {name:localStorage.key(i),score:localStorage.getItem(localStorage.key(i))}
        playersList.push(playerScores)
    }
    playersList.sort((a,b) => b.score - a.score)
    rankingTable.innerHTML = "<tr><th>Jugador</th><th>Puntaje</th></tr>"
    for (let i = 0; i < playersList.length; i++) {
        rankingTable.insertAdjacentHTML("beforeend", `<tr><td>${playersList[i].name}</td><td>${playersList[i].score}</td></tr>`)
    }
    rankingContainer.style.display = "block"
})

inputName.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        if (inputName.value == "") {
            alert("Por favor ingrese un nombre")
        }
        else {
            players.style.display = "none"
            localStorage.setItem(inputName.value, score)
            restart();
        }  
    }
})


function showCategories() {
    categoriesText.style.display = "grid";
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
    progressBarContainer.style.display = "block"
    // timerText.style.visibility = "visible";
    timerContainer.style.display = "block";
    question_container.style.visibility = "visible";
    divOptions.style.display = "flex"
    nextQuestion();
}


function nextQuestion() {
    console.log(options);
    clearInterval(interval)
    answer.innerText = ""
    timerText.style.transition = "width 0.1s linear, background-color 0.2s linear"
    timerText.style.backgroundColor = "green"
    if (currentQuestion < Object.keys(quiz).length) {
        question.innerText = quiz[currentQuestion].question;
        divOptions.innerHTML = ""; //Erase the previuos answers options
        for (let index = 0; index < Object.keys(quiz).length; index++) {
            const button = document.createElement("button");
            button.innerText = quiz[currentQuestion].options[index]
            button.classList.add("option")
            button.addEventListener("click",()=> {
                checkAnswer(index)
            })
            // button.setAttribute("onclick",`checkAnswer(${index})`)  //Instead of adding with addEventListener
            button.style.backgroundColor = "white";
            button.style.pointerEvents = "auto";
            divOptions.appendChild(button);
            
        }
        options = Array.from(document.getElementsByClassName("option")) // Array.from converts the HTMLCollection to an array
        console.log( options);
        
        // CON BOTONES FIJOS EN HTML
        // options.forEach((option, index) => {
            //     option.style.backgroundColor = "white";
            //     option.style.pointerEvents = "auto";  // Enable the click
            //     option.innerText = quiz[currentQuestion].options[index];
            
            // })
        timer = time;
            // timerText.innerText = "Tiempo: " + timer
        timerText.style.width = `${((timer) / time) * 100}%`;
        interval = setInterval(() => {
            timer--;
            timerText.style.transition = "width 1s linear, background-color 3s linear"
            timerText.style.width = `${((timer) / time) * 100}%`;
            // timerText.innerText = "Tiempo: " + timer;
            if (timer >= time - (time*0.3)){
                timerText.style.backgroundColor = "#0f0"
            }
            else if (timer >= time - (time*0.6)) {
                timerText.style.backgroundColor = "yellow"
            }
            else {
                timerText.style.backgroundColor = "red"
            }
            if (timer < 0) {
                clearInterval(interval)
                checkAnswer(-1);
                // timerText.innerText = "Tiempo: 0"
                setTimeout(() => {
                    nextQuestion();
                }, timeOut);
                
            }
        }, 1000);
        // scoreText.innerText = `Score: ${score}`;
        progressBar.style.width = `${(currentQuestion / Object.keys(quiz).length) * 100}%`;
        progressBar.innerText = `${(currentQuestion / Object.keys(quiz).length) * 100}%`;

    } else {  //End of game
        // timerContainer.style.visibility = "hidden";
        // timerText.style.visibility = "hidden";
        localStorage.setItem(inputName.value, score)
        timerContainer.style.display = "none";
        question.innerText = "Fin del juego\nTu puntaje es: " + score + "/" + time*Object.keys(quiz).length;
        divOptions.style.display = "none"
        clearInterval(interval);
        progressBar.style.width = `${(currentQuestion / Object.keys(quiz).length) * 100}%`;
        progressBar.innerText = `${(currentQuestion / Object.keys(quiz).length) * 100}%`;
        restartButton.style.visibility = "visible";
        startButton.style.visibility = "visible";

    }
}

function checkAnswer(option) {
    if (option == quiz[currentQuestion].answer) { // Correct answer
        score += timer;
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
        answer.style.color = "white"
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
    progressBarContainer.style.display = "none"
    players.style.display = "none"
    rankingContainer.style.display = "none"
    
    // timerText.style.visibility = "hidden";
    question_container.style.visibility = "hidden";
    divOptions.style.display = "none"
    restartButton.style.visibility = "hidden";
    categoriesText.style.display = "none";
    timerText.style.backgroundColor = "green"
    // timerContainer.style.display = "none"
    showCategories();
}

function start () {
    progressBarContainer.style.display = "none"
    players.style.display = "none"
    rankingContainer.style.display = "none"
    // playButton.style.display = ""
    // rankingButton.style.display = "block"
    homeBtnContainer.style.display = "block"
    // timerText.style.visibility = "hidden";
    question_container.style.visibility = "hidden";
    divOptions.style.display = "none"
    restartButton.style.visibility = "hidden";
    startButton.style.visibility = "hidden";
    categoriesText.style.display = "none";
    timerText.style.backgroundColor = "green"
}

function shuffle (array){
    array.sort(() => Math.random() - 0.5);
}



// restart();








