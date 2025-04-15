const questions = {
    capitales: {
        0: {
            question: "¿Cuál es la capital de Francia?",
            options: ["París", "Londres", "Berlín", "Madrid"],
            answer: 0
        },
        1: {
            question: "¿Cuál es la capital de Alemania?",
            options: ["París", "Londres", "Berlín", "Madrid"],
            answer: 2
        },
        2: {
            question: "¿Cuál es la capital de España?",
            options: ["París", "Londres", "Berlín", "Madrid"],
            answer: 3
        },
        3: {
            question: "¿Cuál es la capital de Inglaterra?",
            options: ["París", "Londres", "Berlín", "Madrid"],
            answer: 1
        },
        4: {
            question: "¿Cuál es la capital de Argentina?",
            options: ["Buenos Aires", "Londres", "Berlín", "Yugoslavia"],
            answer: 0
        },
        5: {
            question: "¿Cuál es la capital de Italia?",
            options: ["Roma", "Londres", "Berlín", "Madrid"],
            answer: 0
        },
        6: {
            question: "¿Cuál es la capital de Japón?",
            options: ["Tokio", "Londres", "Berlín", "Madrid"],
            answer: 0
        },
        7: {
            question: "¿Cuál es la capital de Brasil?",
            options: ["Brasilia", "Londres", "Berlín", "Madrid"],
            answer: 0
        },
    },
    animales: {
        0: {
            question: "¿Cuál es el animal más grande del mundo?",
            options: ["Elefante", "Ballena Azul", "Jirafa", "Tiburón Blanco"],
            answer: 1
        },
        1: {
            question: "¿Cuál es el animal más rápido del mundo?",
            options: ["Guepardo", "León", "Leopardo", "Tigre"],
            answer: 0
        },
        2: {
            question: "¿Cuál es el animal más venenoso del mundo?",
            options: ["Araña de Sídney", "Cobra", "Pez Piedra", "Escorpión"],
            answer: 2
        },
        3: {
            question: "¿Cuál es el animal más fuerte del mundo?",
            options: ["Elefante", "Rinoceronte", "Hipopótamo", "Gorila"],
            answer: 3
        }
    },
    geografia: {
        0: {
            question: "¿En qué continente se encuentra el país de Kenia?",
            options: ["Asia", "África", "Europa", "Oceanía"],
            answer: 1
        },
        1: {
            question: "¿Cuál es el río más largo del mundo?",
            options: ["Amazonas", "Nilo", "Yangtsé", "Misisipi"],
            answer: 0
        },
        2: {
            question: "¿Cuál es el país más grande del mundo?",
            options: ["Rusia", "Canadá", "China", "Estados Unidos"],
            answer: 0
        },
        3: {
            question: "¿Cuál es el país más pequeño del mundo?",
            options: ["Mónaco", "Vaticano", "San Marino", "Liechtenstein"],
            answer: 1
        }
    },
    ciencia: {
        0: {
            question: "¿Cuál es el planeta más grande del sistema solar?",
            options: ["Júpiter", "Saturno", "Urano", "Neptuno"],
            answer: 0
        },
        1: {
            question: "¿Cuál es el planeta más pequeño del sistema solar?",
            options: ["Mercurio", "Venus", "Tierra", "Marte"],
            answer: 0
        },
        2: {
            question: "¿Cuál es el planeta más cercano al sol?",
            options: ["Mercurio", "Venus", "Tierra", "Marte"],
            answer: 0
        },
        3: {
            question: "¿Cuál es el planeta más lejano al sol?",
            options: ["Júpiter", "Saturno", "Urano", "Neptuno"],
            answer: 2
        }
    },
    tecnologia: {
        0: {
            question: "¿Quién es el fundador de Microsoft?",
            options: ["Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Jeff Bezos"],
            answer: 1
        },
        1: {
            question: "¿Quién es el fundador de Apple?",
            options: ["Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Jeff Bezos"],
            answer: 0
        },
        2: {
            question: "¿Quién es el fundador de Facebook?",
            options: ["Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Jeff Bezos"],
            answer: 2
        },
        3: {
            question: "¿Quién es el fundador de Amazon?",
            options: ["Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Jeff Bezos"],
            answer: 3
        }
    },
    historia: {
        0: {
            question: "¿En qué año se descubrió América?",
            options: ["1492", "1498", "1500", "1502"],
            answer: 0
        },
        1: {
            question: "¿En qué año se inició la Primera Guerra Mundial?",
            options: ["1914", "1916", "1918", "1920"],
            answer: 0
        },
        2: {
            question: "¿En qué año se inició la Segunda Guerra Mundial?",
            options: ["1939", "1940", "1941", "1942"],
            answer: 0
        },
        3: {
            question: "¿En qué año se produjo la Revolución Rusa?",
            options: ["1917", "1918", "1919", "1920"],
            answer: 0
        }
    },
    arte: {
        0: {
            question: "¿Quién pintó la Mona Lisa?",
            options: ["Leonardo Da Vinci", "Miguel Ángel", "Rafael", "Donatello"],
            answer: 0
        },
        1: {
            question: "¿Quién pintó la Capilla Sixtina?",
            options: ["Leonardo Da Vinci", "Miguel Ángel", "Rafael", "Donatello"],
            answer: 1
        },
        2: {
            question: "¿Quién pintó Las Meninas?",
            options: ["Leonardo Da Vinci", "Miguel Ángel", "Rafael", "Velázquez"],
            answer: 3
        },
        3: {
            question: "¿Quién pintó Guernica?",
            options: ["Leonardo Da Vinci", "Miguel Ángel", "Rafael", "Picasso"],
            answer: 3
        }
    },
    deportes: {
        0: {
            question: "¿Cuál es el deporte más popular del mundo?",
            options: ["Fútbol", "Baloncesto", "Tenis", "Golf"],
            answer: 0
        },
        1: {
            question: "¿En qué país se originó el fútbol?",
            options: ["Brasil", "Argentina", "Inglaterra", "España"],
            answer: 2
        },
        2: {
            question: "¿Cuál es el equipo de fútbol más antiguo de España?",
            options: ["Real Madrid", "Barcelona", "Athletic Club", "Valencia"],
            answer: 2
        },
        3: {
            question: "¿Cuál es el equipo de fútbol más antiguo del mundo?",
            options: ["Real Madrid", "Barcelona", "Athletic Club", "Sheffield FC"],
            answer: 3
        }
    },
    entretenimiento: {
        0: {
            question: "¿Quién es el director de la película Titanic?",
            options: ["James Cameron", "Steven Spielberg", "Quentin Tarantino", "Christopher Nolan"],
            answer: 0
        },
        1: {
            question: "¿Quién es el director de la película El Padrino?",
            options: ["James Cameron", "Steven Spielberg", "Quentin Tarantino", "Francis Ford Coppola"],
            answer: 3
        },
        2: {
            question: "¿Quién es el director de la película Pulp Fiction?",
            options: ["James Cameron", "Steven Spielberg", "Quentin Tarantino", "Christopher Nolan"],
            answer: 2
        },
        3: {
            question: "¿Quién es el director de la película Origen?",
            options: ["James Cameron", "Steven Spielberg", "Quentin Tarantino", "Christopher Nolan"],
            answer: 3
        }
    },
}