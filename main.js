// alert("one piece mola")
const home = document.getElementById('home')
const quiz = document.getElementById('quiz')
const buttonNext = document.getElementById('buttonNext')
const buttonStart = document.getElementById('buttonStart')
const myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {});
const questionTitle = document.getElementById("question")
const answerOptions = document.getElementById("answerOptions")

let currentQuestionIndex;

const questionsList = [{
        question: "Pregunta 1",
        answers: [
            { text: "respuesta", correct: false },
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




function openModal() {
    myModal.show();
}

function closeModal() {
    myModal.hide()
}


// getA.addEventListener("click", openModal)

const setStatusClass = (element, correct) => {
    if (correct) {
        element.classList.add("opacity-100")
    } else {
        element.classList.add("opacity-25")
    }
}




const selectAnswer = () => {
    console.log("He entrado en respuestas")
    Array.from(answerOptions.children).forEach(card => {
        setStatusClass(card, card.dataset.correct);
    });

    openModal()
    // if(!questionsList.length>currentQuestionIndex +1){
    //     aquí iría que te lleve a otra sección() donde se muestre resultado y tendrá su propio boton de restart"
    // }
}


const showQuestion = (questionObj) => {
    questionTitle.innerText = questionObj.question;
    questionObj.answers.forEach(answer => {
        const card = document.createElement("card");
        // console.log("he creado tarjetas")
        card.innerHTML = ` 
                <div class="col">
                <div class="card" id="card" >
                    <img src="/Assets/1.jpg" class="card-img-top" alt="..." />
                    <div class="card-body text-center">
                        <h5 class="card-title">${answer.text}</h5>
                    </div>
                </div>
            </div>
`
            // revisar aquí nombre

        card.classList.add("cardAnswer");
        if (answer.correct) {
            card.dataset.correct = true;
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
    home.classList.add('d-none')
    quiz.classList.remove('d-none')
    currentQuestionIndex = 0;
    nextQuestion()
}
buttonStart.addEventListener('click', startQuiz)
buttonNext.addEventListener("click", () => {
    console.log("click en modal")
    currentQuestionIndex++;
    nextQuestion();
  });
