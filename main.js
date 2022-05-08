// alert("one piece mola")
const home = document.getElementById("home");
const quiz = document.getElementById("quiz");
const results = document.getElementById("results");
const buttonNext = document.getElementById("buttonNext");
const buttonStart = document.getElementById("buttonStart");
const myModal = new bootstrap.Modal(
    document.getElementById("staticBackdrop"), {}
);
const questionTitle = document.getElementById("question");
const answerOptions = document.getElementById("answerOptions");
const modalResponse = document.getElementById("modalResponse")
let currentQuestionIndex;
let rightAnswers = 0;

function hideView() {
    home.classList.add("d-none");
    quiz.classList.add("d-none");
    results.classList.add("d-none");
}

function openModal() {
    myModal.show();
}

function closeModal() {
    myModal.hide();
}
const setStatusClass = (cardElement, cardValue) => {
    if (cardValue) {
        cardElement.children[0].className = "card bg-success";


        // element.children[0].classList.add("border-5")
    } else {
        cardElement.children[0].className = "card bg-danger";
    }

};

// pendiente
// if (card.correct == true) {
//     rightAnswers++
//   }

const showQuestion = (currentQuestion) => {
    console.log("holi", rightAnswers)
    questionTitle.innerHTML = ` ${currentQuestion[0]}?`;

    currentQuestion[2].forEach((answer) => {
        const card = document.createElement("card");
        card.innerHTML = ` 
                            <div class="card" id="card" >
                                <img src="/Assets/1.jpg" class="card-img-top" alt="..." />
                                <div class="card-body text-center">
                                    <h5 class="card-title">${answer}</h5>
                                </div>
                            </div>            
                      `;

        card.addEventListener("click", function selectAnswer() {

            Array.from(answerOptions.children).forEach((card) => {
                setStatusClass(card, card.dataset.correct);
            });
            modalResponse.innerHTML = `${currentQuestion[1]}`
            openModal();
        });
        answerOptions.appendChild(card);
    });

    // añade el atributo correcto a la primera card (que sabemos es correcta)
    console.log(answerOptions)
    Array.from(answerOptions.children).forEach(card => {
        if (card.innerText == currentQuestion[1])
            card.dataset.correct = true;

    })


};
const resetState = () => {
    closeModal();
    while (answerOptions.firstChild) {
        answerOptions.removeChild(answerOptions.firstChild);
    }
};
const nextQuestion = (data) => {
    resetState();
    showQuestion(data[currentQuestionIndex]);

};

// COGER DATOS DE LA API
const questionsAPI = async() => {
    const arrayAPI = await axios.get(
        "https://opentdb.com/api.php?amount=10&category=31&difficulty=easy&type=multiple"
    );
    // console.log(arrayAPI.data.results)
    let arrayQuestions = [];

    // depuramos las preguntas.
    arrayAPI.data.results.forEach((element) => {
        const {
            correct_answer: correctAnswer,
            question,
            incorrect_answers: incorrectAnswersArray,
        } = element;
        const answers = [correctAnswer, ...incorrectAnswersArray];
        const randomAnswers = answers.sort();
        const questionClear = question
            .replaceAll(/&quot;/gi, "")
            .replaceAll(/&#039;/gi, "");
        const arrayQuestions1 = [questionClear, correctAnswer, randomAnswers];

        arrayQuestions.push(arrayQuestions1);
    });
    return arrayQuestions;
};

questionsAPI().then((data) => {
    console.log("listado preguntas", data)

    // aqui metemos funciones que necesiten esos datos
    buttonStart.addEventListener("click", (e) => {
        e.preventDefault();
        hideView();
        quiz.classList.remove("d-none");
        currentQuestionIndex = 0;
        nextQuestion(data);
    });

    buttonNext.addEventListener("click", () => {
        if (data.length > currentQuestionIndex + 1) {
            currentQuestionIndex++;
            nextQuestion(data)
        } else {
            closeModal();
            hideView();
            results.classList.remove("d-none")
        }

    })

});
// Cuando llamas a una función el parámetro tiene que ser algo tangible, por ej. un dato o un numero. Sin embargo, cuando se invoca el parametro es un nombre inventado cualquiera.(jaja)
// showQuestion(arrayQuestions)

// console.log(arrayQuestions);

// DESESTRUCTURAMOS LA ARRAY

// const [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10] = arrayAPI
// console.log(question2)