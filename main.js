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
<<<<<<< HEAD
const modalResponse = document.getElementById("modalResponse")
=======
const cardAnswer = document.getElementById("cardAnswer")
>>>>>>> 6b5ecb70a4e78deab6030326c9761a4b10b0518e
let currentQuestionIndex;
let rightAnswers = 0;


function hideView() {
    home.classList.add("d-none");
    quiz.classList.add("d-none");
    results.classList.add("d-none");
}

<<<<<<< HEAD
function openModal() {
    myModal.show();
}

function closeModal() {
    myModal.hide();
}
=======
function openModal(answer) {
    myModal.show();  
    cardAnswer.innerText = `${answer[1][0]}`
} 

function closeModal() {
  myModal.hide();
} 


// funcion para desordenar el array
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

>>>>>>> 6b5ecb70a4e78deab6030326c9761a4b10b0518e
const setStatusClass = (cardElement, cardValue) => {
    if (cardValue) {
        cardElement.children[0].className = "card bg-success";
        // element.children[0].classList.add("border-5")
    } else {
        cardElement.children[0].className = "card bg-danger";
    }

<<<<<<< HEAD
};

// pendiente


const showQuestion = (currentQuestion) => {
    console.log("contador respuestas acertadas", rightAnswers)
    questionTitle.innerHTML = ` ${currentQuestion[0]}?`;

    currentQuestion[2].forEach((answer) => {
        const card = document.createElement("card");
        card.innerHTML = ` 
=======
const showQuestion = (currentQuestion) => { 
  questionTitle.innerHTML = ` ${currentQuestion[0]} ?`;
// console.log("respuestas originales", currentQuestion[1])
//   answerOptions.firstElementChild.dataset.correct = true;
//   const randomQuestion = shuffle(currentQuestion[1])
//   console.log("respuestas aleatorias", randomQuestion)

 
currentQuestion[1].forEach((answer) => {
const card = document.createElement("card");
   

    card.innerHTML = ` 
>>>>>>> 6b5ecb70a4e78deab6030326c9761a4b10b0518e
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
            if (answer === currentQuestion[1]) {
                rightAnswers++
            }
        });
<<<<<<< HEAD
        answerOptions.appendChild(card);
    });

    Array.from(answerOptions.children).forEach(card => {
        if (card.innerText == currentQuestion[1])
            card.dataset.correct = true;
    })


=======
         openModal(currentQuestion);
      }
    );
    answerOptions.appendChild(card);
  });

  // añade el atributo correcto a la primera card (que sabemos es correcta)
  answerOptions.firstElementChild.dataset.correct = true;

// //   ¿es muy loco hacer aqui otro bucle para pegar las aleatorias?
// // esto no termina de funcionar porque no las hace bien
// const randomQuestion = shuffle(currentQuestion[1])
// currentQuestion[1].forEach((answer) => {
//     console.log(answer)
//     card.innerHTML = ` 
//     <div class="card" id="card" >
//         <img src="/Assets/1.jpg" class="card-img-top" alt="..." />
//         <div class="card-body text-center">
//             <h5 class="card-title">${randomQuestion}</h5>
//         </div>
//     </div>            
// `;
// })
>>>>>>> 6b5ecb70a4e78deab6030326c9761a4b10b0518e
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

const questionsAPI = async() => {
    const arrayAPI = await axios.get(
        "https://opentdb.com/api.php?amount=10&category=31&difficulty=easy&type=multiple"
    );

<<<<<<< HEAD
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
=======
  // depuramos las preguntas.
  arrayAPI.data.results.forEach((element) => {
    const {
      correct_answer: correctAnswer,
      question,
      incorrect_answers: incorrectAnswersArray,
    } = element;
    const answers = [correctAnswer, ...incorrectAnswersArray];  
    // console.log("respuestas",answers) 
    // console.log("respuesta correcta", answers[0])
    // answers[0].dataset.correct = true

    const questionClear = question
      .replaceAll(/&quot;/gi, "")
      .replaceAll(/&#039;/gi, "");
    const arrayQuestions1 = [questionClear, answers];
    arrayQuestions.push(arrayQuestions1);
  });

  console.log(arrayQuestions)
  return arrayQuestions;
>>>>>>> 6b5ecb70a4e78deab6030326c9761a4b10b0518e
};

questionsAPI().then((data) => {
<<<<<<< HEAD
=======
//   console.log("listado preguntas",data)
//   console.log("pregunta aleatoria:", data[0][0])
//   console.log("total de respuestas de la pregunta aleatoria:", data[0][1])
//   console.log("respuesta correcta de la pregunta aleatoria:", data[0][1][1])
  
  // aqui metemos funciones que necesiten esos datos
  buttonStart.addEventListener("click", (e) => {
    e.preventDefault();
    hideView();
    quiz.classList.remove("d-none");
    currentQuestionIndex = 0;
    nextQuestion(data);
  });
>>>>>>> 6b5ecb70a4e78deab6030326c9761a4b10b0518e

    buttonStart.addEventListener("click", (e) => {
        e.preventDefault();
        rightAnswers = 0;
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