// alert("one piece mola")
const home = document.getElementById('home')
const quiz = document.getElementById('quiz')
const results = document.getElementById('results')
const buttonNext = document.getElementById('buttonNext')
const buttonStart = document.getElementById('buttonStart')
const myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {});
const questionTitle = document.getElementById("question")
const answerOptions = document.getElementById("answerOptions")

let currentQuestionIndex;
let rightAnswers;

const questionsList = [{
        question: "Pregunta 1",
        answers: [
            { text: "respuesta1", correct: false },
            { text: "respuesta2", correct: false },
            { text: "respuesta3", correct: false },
            { text: "respuesta4", correct: true }
        ]
    },
    {
        question: "Pregunta 2",
        answers: [
            { text: "respuesta1", correct: false },
            { text: "respuesta2", correct: false },
            { text: "respuesta3", correct: false },
            { text: "respuesta4", correct: true }
        ]
    },
    {
        question: "Pregunta 3",
        answers: [
            { text: "respuesta1", correct: false },
            { text: "respuesta2", correct: false },
            { text: "respuesta3", correct: false },
            { text: "respuesta4", correct: true }
        ]
    }
];

// declarar las demás cards más tarde
const getA = document.getElementById('cardA')



function hideView() {
    home.classList.add('d-none')
    quiz.classList.add('d-none')
    results.classList.add('d-none')
}

function openModal() {
    myModal.show();
}

function closeModal() {
    myModal.hide()
}


// getA.addEventListener("click", openModal)

const setStatusClass = (element, correct) => {

    if (correct) {
        element.children[0].className = "card bg-success"
            // element.children[0].classList.add("border-5")
    } else {
        element.children[0].className = "card bg-danger"
    }
}




const selectAnswer = () => {

    Array.from(answerOptions.children).forEach(card => {
        setStatusClass(card, card.dataset.correct);
    });

    openModal()
    if (questionsList.length > currentQuestionIndex + 1) {

    } else {

        buttonNext.innerText = "Check results"
        buttonNext.addEventListener("click", () => {
            hideView()
            results.classList.remove('d-none')
        })
    }

}


const showQuestion = (questionObj) => {
    questionTitle.innerText = questionObj.question;
    questionObj.answers.forEach(answer => {
        const card = document.createElement("card");
        // console.log("he creado tarjetas")
        card.innerHTML = ` 
                
                <div class="card" id="card" >
                    <img src="/Assets/1.jpg" class="card-img-top" alt="..." />
                    <div class="card-body text-center">
                        <h5 class="card-title">${answer.text}</h5>
                    </div>
                </div>
            
`
            // revisar aquí nombre
            // card.classList.add("card");
            // card.classList.add("cardAnswer");
        if (answer.correct) {
            card.dataset.correct = true;
        }

        // añadir un eventlistener para comprobar esto
        if (card.correct == true) {
            rightAnswers++
        }


        card.addEventListener("click", selectAnswer);
        answerOptions.appendChild(card);

    })

}


const resetState = () => {
    closeModal()
    while (answerOptions.firstChild) {
        answerOptions.removeChild(answerOptions.firstChild)
    }
}

const nextQuestion = () => {
    resetState();
    showQuestion(questionsList[currentQuestionIndex]);

}

const startQuiz = () => {
    hideView()
    quiz.classList.remove('d-none')
    currentQuestionIndex = 0;
    nextQuestion()
}
buttonStart.addEventListener('click', startQuiz)
buttonNext.addEventListener("click", () => {
    currentQuestionIndex++;
    nextQuestion();
})

const funcionPatata = (jaja) => {

    console.log(jaja);
}

// COGER DATOS DE LA API
const questionsAPI = async() => {
    const arrayAPI = await axios.get("https://opentdb.com/api.php?amount=10&category=31&difficulty=easy&type=multiple")
    return arrayAPI.data.results;
}

questionsAPI().then(elementos => {
    elementos.forEach(patata => {
        const { question } = patata
        const questionClear = question.replaceAll(/&quot;/ig, '').replaceAll(/&#039;/ig, '"')
        console.log(questionClear);
        // Cuando llamas a una función el parámetro tiene que ser algo tangible, por ej. un dato o un numero. Sin embargo, cuando se invoca el parametro es un nombre inventado cualquiera.(jaja)
        funcionPatata(questionClear)
    })
})

// DESESTRUCTURAMOS LA ARRAY

// const [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10] = arrayAPI
// console.log(question2)