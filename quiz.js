const homeBtnContainer = document.getElementById("home_buttons_container");
const playButton = document.getElementById("playButton");
const rankingButton = document.getElementById("rankingButton");
const rankingContainer = document.getElementById("ranking_container");
const inputName = document.getElementById("name_input");
const dataList = document.getElementById("name_list");
const players = document.getElementById("players");
const currentPlayer = document.getElementById("current_player");
const listPlayers = document.getElementById("listPlayers");
const rankingTable = document.getElementById("ranking");
const categoriesText = document.getElementById("categories");
const categoriesContainer = document.getElementById("categories_container");
const categories = Object.keys(questions); //in questions.js
const question = document.getElementById("question");
const divOptions = document.getElementById("options");
const scoreText = document.getElementById("score");
const progressBar = document.getElementById("progressBar");
const progressBarContainer = document.getElementById("progressBar_container");
const question_container = document.getElementById("question_container");
const timerText = document.getElementById("timer");
const timerContainer = document.getElementById("timer_container");
// const nextButton = document.getElementById("next");
const restartButton = document.getElementById("restart");
const startButton = document.getElementById("start");
// const answer = document.getElementById("answer");

const time = 10;
const timeOut = 2000;

let options;
let currentQuestion;
let score = 0;
let timer;
let interval;
let quiz;
let playersList;
let playerScores;


function sortByScore() {
    playersList = [];
    playerScores = {};
    for (let i = 0; i < localStorage.length; i++) {
        playerScores = {
            name: localStorage.key(i),
            score: localStorage.getItem(localStorage.key(i)),
        };
        playersList.push(playerScores);
    }
    playersList.sort((a, b) => b.score - a.score); //Sort the array of objects by score
}

sortByScore();

console.log(playersList);

function createList() {
    dataList.innerHTML = ""; // Clear the datalist before adding new options
    playersList.forEach((player) => {
        const option = document.createElement("option");
        option.value = player.name;
        dataList.appendChild(option);
    });
}

createList(); // Call the function to populate the datalist

playButton.addEventListener("click", () => {
    players.style.display = "block";
    // playButton.style.display = "none"
    // rankingButton.style.display = "none"
    homeBtnContainer.style.display = "none";
    rankingContainer.style.display = "none";
    inputName.value = "";
    inputName.focus();
});

rankingButton.addEventListener("click", () => {
    rankingTable.innerHTML = "<tr><th>#</th><th>Jugador</th><th>Puntaje</th></tr>";
    // for (let i = 0; i < playersList.length; i++) {
    //     rankingTable.insertAdjacentHTML("beforeend",`<tr><td>${i + 1}</td><td>${playersList[i].name}</td><td>${playersList[i].score}</td></tr>`);
    // }
    let i = 0;
    while (i < playersList.length && i < 10) {
        rankingTable.insertAdjacentHTML("beforeend", `<tr><td>${i + 1}</td><td>${playersList[i].name}</td><td>${playersList[i].score}</td></tr>`);
        // console.log(i);
        i++;
    }
    rankingContainer.style.display = "block";
    homeBtnContainer.style.display = "none";
    startButton.style.display = "block";
});

inputName.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        if (inputName.value == "") {
            alert("Por favor ingrese un nombre");
        } else {
            showCurrentPlayer();
            //localStorage.setItem(inputName.value, score); // ?
            restart();
        }
    }
});


function showCurrentPlayer () {            
    players.style.display = "none";
    currentPlayer.innerHTML = `
            <p class="hi">Hola ${inputName.value}</p>
            <div class="score_container">
                <p>Puesto: <span class="score">${playersList.findIndex(player => player.name === inputName.value) + 1} </span></p>
                <p>Puntaje: <span class="score">${localStorage.getItem(inputName.value) || 0}</span></p>
            </div>
            <p>Elige una categoría:</p>
    `;
    currentPlayer.style.display = "block";
}

function showCategories() {
    categoriesContainer.style.display = "block";
    categoriesText.style.display = "grid";
    categoriesText.innerHTML = "";
    categories.forEach((category) => {
        const button = document.createElement("button");
        button.innerHTML = `<img src="images/${category}.png" class="category_img">`;
        button.innerHTML += `<h3 class="h3_card">${category[0].toUpperCase() + category.slice(1)}</h3>` // Capitalize the first letter of the category
        button.innerHTML += `<p class="p_card">${Object.keys(questions[category]).length} preguntas</p>`;
        // console.log(questions[category].length());
        button.classList.add("category_btn");
        button.addEventListener("click", () => {
            selectCategory(category);
        });
        categoriesText.appendChild(button);
    });
}

function selectCategory(category) {
    quiz = questions[category];
    console.log(quiz);
    categoriesContainer.style.display = "none";
    categoriesText.style.display = "none";
    divOptions.style.display = "flex";
    currentQuestion = 0;
    score = 0;
    progressBarContainer.style.display = "block";
    // timerText.style.visibility = "visible";
    timerContainer.style.display = "block";
    question_container.style.display = "flex";
    divOptions.style.display = "flex";
    currentPlayer.style.display = "none";
    nextQuestion();
}

function nextQuestion() {
    clearInterval(interval);
    // answer.innerText = "";
    timerText.style.transition = "width 0.1s linear, background-color 0.2s linear";
    timerText.style.backgroundColor = "green";
    if (currentQuestion < Object.keys(quiz).length) {
        question.innerText = quiz[currentQuestion].question;
        divOptions.innerHTML = ""; //Erase the previuos answers options
        let optionsArray = quiz[currentQuestion].options;
        for (let index = 0; index < optionsArray.length; index++) {
            const button = document.createElement("button");
            button.innerText = quiz[currentQuestion].options[index];
            button.classList.add("option");
            button.addEventListener("click", () => {
                checkAnswer(index);
            });
            // button.setAttribute("onclick",`checkAnswer(${index})`)  //Instead of adding with addEventListener
            button.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
            button.style.border = "2px solid rgba(255, 255, 255, 0.1)";
            button.style.boxShadow = "var(--box-shadow)";
            button.style.pointerEvents = "auto";
            divOptions.appendChild(button);
        }
        options = Array.from(document.getElementsByClassName("option")); // Array.from converts the HTMLCollection to an array
        // options = [...document.getElementsByClassName("option")]; // This also works
        
        
        // CON BOTONES FIJOS EN HTML
        // options.forEach((option, index) => {
        //     option.style.backgroundColor = "white";
        //     option.style.pointerEvents = "auto";  // Enable the click
        //     option.innerText = quiz[currentQuestion].options[index];
        // })

        timer = time;
        // timerText.innerText = "Tiempo: " + timer
        timerText.style.width = `${(timer / time) * 100}%`;
        interval = setInterval(() => {
            timer--;
            timerText.style.transition = "width 1s linear, background-color 3s linear";
            timerText.style.width = `${(timer / time) * 100}%`;
            // timerText.innerText = "Tiempo: " + timer;
            if (timer >= time - time * 0.3) {
                timerText.style.backgroundColor = "#0f0";
            } else if (timer >= time - time * 0.6) {
                timerText.style.backgroundColor = "yellow";
            } else {
                timerText.style.backgroundColor = "red";
            }
            if (timer < 0) {
                clearInterval(interval);
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
    } 
    
                                    //****FIN DEL JUEGO*****
    else {   
        timerContainer.style.display = "none";
        question.innerText = "Fin del juego\nTu puntaje es: " + score + "/" + time * Object.keys(quiz).length;
        divOptions.style.display = "none";
        clearInterval(interval);
        progressBar.style.width = `${(currentQuestion / Object.keys(quiz).length) * 100}%`;
        progressBar.innerText = `${(currentQuestion / Object.keys(quiz).length) * 100}%`;
        if (score > localStorage.getItem(inputName.value) || localStorage.getItem(inputName.value) === undefined) {
            alert("¡Felicitaciones. Obtuviste un nuevo record!");
            localStorage.setItem(inputName.value, score);
        }
        // else if (score == localStorage.getItem(inputName.value)) {
        //     alert("¡Igualaste tu record!");
        // }
        // else {
        //     alert("No superaste tu record. Mejor suerte la proxima vez.");
        // }
        restartButton.style.display = "block";
        startButton.style.display = "block";
    }
}

function checkAnswer(option) {
                // RESPUESTA CORRECTA
    if (option == quiz[currentQuestion].answer) {   
        score += timer;
        clearInterval(interval);
        options[option].style.backgroundColor = "var(--success-color)";
        options[option].style.border = "2px solid green";
        options[option].style.color = "green";
        options[option].innerHTML += `<img src="images/check.png" class="check">`;
        // scoreText.innerText = `Score: ${score}`;
        // answer.style.color = "green";
        // answer.innerHTML = "<p>Respuesta correcta</p>";
        options.forEach((option) => {
            option.style.pointerEvents = "none"; // Disable the click
        });
        setTimeout(() => {
            nextQuestion();
        }, timeOut);
    
                // TIEMPO TERMINADO
    } else if (option == -1) {    
        // clearInterval(interval)
        // answer.style.color = "red";
        // answer.innerText = "Se terminó el tiempo";
        // options[quiz[currentQuestion].answer].style.backgroundColor = "green";
        options.forEach((option) => {
            option.style.pointerEvents = "none"; // Disable the click
        });
        setTimeout(() => {
            nextQuestion();
        }, timeOut);
    
                // RESPUESTA INCORRECTA
    } else {   
        clearInterval(interval);
        // answer.style.color = "red";
        // answer.innerText = "Respuesta incorrecta";
        options[option].style.backgroundColor = "var(--wrong-color)";
        options[option].style.border = "2px solid red";
        options[option].style.color = "red";
        options[option].innerHTML += `<img src="images/wrong.png" class="check">`;
        // options[quiz[currentQuestion].answer].style.backgroundColor = "darkseagreen";
        options.forEach((option) => {
            option.style.pointerEvents = "none"; // Disable the click
        });
        setTimeout(() => {
            nextQuestion();
        }, timeOut);
    }
    
    currentQuestion++;
}

function restart() {
    clear();
    showCategories();
    showCurrentPlayer();
}

function start() {
    clear();
    homeBtnContainer.style.display = "block";
    startButton.style.display = "none";
}

function clear() {
    const clearElements = [
        progressBarContainer,
        players,
        rankingContainer,
        question_container,
        divOptions,
        restartButton,
        categoriesText,
        categoriesContainer,
        currentPlayer,
    ];
    clearElements.forEach((element) => {
        element.style.display = "none";
    });
    timerText.style.backgroundColor = "green";
    sortByScore();
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

// restart();