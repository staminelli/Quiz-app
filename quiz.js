
const capitals = [
    {
        question: "¿Cuál es la capital de Francia?",
        options: ["París", "Londres", "Berlín", "Madrid"],
        answer: 0
    },
    {
        question: "¿Cuál es la capital de Alemania?",
        options: ["París", "Londres", "Berlín", "Madrid"],
        answer: 2
    },
    {
        question: "¿Cuál es la capital de España?",
        options: ["París", "Londres", "Berlín", "Madrid"],
        answer: 3
    },
    {
        question: "¿Cuál es la capital de Inglaterra?",
        options: ["París", "Londres", "Berlín", "Madrid"],
        answer: 1
    }
]

const animals = [
    {
        question: "¿Cuál es el animal más grande del mundo?",
        options: ["Elefante", "Ballena Azul", "Jirafa", "Tiburón Blanco"],
        answer: 1
    },
    {
        question: "¿Cuál es el animal más rápido del mundo?",
        options: ["Guepardo", "León", "Leopardo", "Tigre"],
        answer: 0
    },
    {
        question: "¿Cuál es el animal más venenoso del mundo?",
        options: ["Araña de Sídney", "Cobra", "Pez Piedra", "Escorpión"],
        answer: 2
    },
    {
        question: "¿Cuál es el animal más fuerte del mundo?",
        options: ["Elefante", "Rinoceronte", "Hipopótamo", "Gorila"],
        answer: 3
    }
]
const geography = [
    {
        question: "¿En qué continente se encuentra el país de Kenia?",
        options: ["Asia", "África", "Europa", "Oceanía"],
        answer: 1
    },
    {
        question: "¿Cuál es el río más largo del mundo?",
        options: ["Amazonas", "Nilo", "Yangtsé", "Misisipi"],
        answer: 0
    },
    {
        question: "¿Cuál es el país más grande del mundo?",
        options: ["Rusia", "Canadá", "China", "Estados Unidos"],
        answer: 0
    },
    {
        question: "¿Cuál es el país más pequeño del mundo?",
        options: ["Mónaco", "Vaticano", "San Marino", "Liechtenstein"],
        answer: 1
    }
];

const historia = [
    {
        question: "¿En qué año se descubrió América?",
        options: ["1492", "1498", "1500", "1502"],
        answer: 0
    },
    {
        question: "¿En qué año se inició la Primera Guerra Mundial?",
        options: ["1914", "1916", "1918", "1920"],
        answer: 0
    },
    {
        question: "¿En qué año se inició la Segunda Guerra Mundial?",
        options: ["1939", "1940", "1941", "1942"],
        answer: 0
    },
    {
        question: "¿En qué año se produjo la Revolución Rusa?",
        options: ["1917", "1918", "1919", "1920"],
        answer: 0
    }
];

const art = [
    {
        question: "¿Quién pintó la Mona Lisa?",
        options: ["Leonardo Da Vinci", "Miguel Ángel", "Rafael", "Donatello"],
        answer: 0
    },
    {
        question: "¿Quién pintó la Capilla Sixtina?",
        options: ["Leonardo Da Vinci", "Miguel Ángel", "Rafael", "Donatello"],
        answer: 1
    },
    {
        question: "¿Quién pintó Las Meninas?",
        options: ["Leonardo Da Vinci", "Miguel Ángel", "Rafael", "Velázquez"],
        answer: 3
    },
    {
        question: "¿Quién pintó Guernica?",
        options: ["Leonardo Da Vinci", "Miguel Ángel", "Rafael", "Picasso"],
        answer: 3
    }
];

const categoriesText = document.getElementById("categories");
const categories = [capitals, animals, geography, historia, art]  // ??
const question = document.getElementById("question");
const options = Array.from(document.getElementsByClassName("options"));  // ??
const scoreText = document.getElementById("score");
const progressBar = document.getElementById("progressBar");
const progressBarContainer = document.getElementById("progressBar_container");
const question_container = document.getElementById("question-container");
const timerText = document.getElementById("timer");



let currentQuestion = 0;
let score = 0;
let timer
let interval;
// let progress = "20%";



function startQuiz() {
    currentQuestion = 0;
    score = 0;
    options.forEach((option) => {
        option.style.visibility = "visible";
    })
    scoreText.style.display = "block";
    timerText.style.visibility = "visible";
    progressBarContainer.style.visibility = "visible";
    nextQuestion();
}

function nextQuestion() {
    if (currentQuestion < capitals.length) {
        options.forEach((option) => {
            option.style.backgroundColor = "white";
            option.style.pointerEvents = "auto";  // Enable the click
        })
        question.innerText = capitals[currentQuestion].question;
        
        options.forEach((option, index) => {
            option.innerText = capitals[currentQuestion].options[index];
        })
        timer = 10;
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
                }, 2000);
                
            }
        }, 1000);
        console.log(typeof(interval));
        scoreText.innerText = `Score: ${score}`;
        progressBar.style.width = `${(currentQuestion / capitals.length) * 100}%`;
        progressBar.innerText = `${(currentQuestion / capitals.length) * 100}%`;

    } else {
        question.innerText = "Tu puntaje es: " + score;
        options.forEach((option) => {
            option.innerText = "";
            option.style.visibility = "hidden";
        })
        
        
        // question_container.style.display = "none";
        clearInterval(interval);
        timerText.style.visibility = "hidden";
        scoreText.style.display = "none";
        progressBar.style.width = `${(currentQuestion / capitals.length) * 100}%`;
        progressBar.innerText = `${(currentQuestion / capitals.length) * 100}%`;
    }
}

function checkAnswer(option) {
    if (option == capitals[currentQuestion].answer) {
        score+=timer;
        clearInterval(interval);
        options[option].style.backgroundColor = "green";
        scoreText.innerText = `Score: ${score}`;
        options.forEach((option) => {
            option.style.pointerEvents = "none";  // Disable the click
        })
    }
    else if (option == -1) {
        options[capitals[currentQuestion].answer].style.backgroundColor = "green";
        options.forEach((option) => {
            option.style.pointerEvents = "none";  // Disable the click
        })
    }
    else {
        options[option].style.backgroundColor = "red";
        options[capitals[currentQuestion].answer].style.backgroundColor = "green";
        options.forEach((option) => {
            option.style.pointerEvents = "none";  // Disable the click
        })
    }
    currentQuestion++;
    
}

function selectCategory(category) {
    switch (category) {
        case "capitals":
            capitals.sort(() => Math.random() - 0.5);
            nextQuestion();
            break;
        case "animals":
            animals.sort(() => Math.random() - 0.5);
            nextQuestion();
            break;
        case "geography":
            geography.sort(() => Math.random() - 0.5);
            nextQuestion();
            break;
        case "history":
            history.sort(() => Math.random() - 0.5);
            nextQuestion();
            break;
        case "art":
            art.sort(() => Math.random() - 0.5);
            nextQuestion();
            break;
    }
}

function showUI() {
    scoreText.style.display = "block";
    timerText.style.visibility = "visible";
    progressBarContainer.style.visibility = "visible";
    options.forEach((option) => {
        option.style.visibility = "visible";
    })
}

function hideUI() {
    scoreText.style.display = "none";
    timerText.style.visibility = "hidden";
    progressBarContainer.style.visibility = "hidden";
}










