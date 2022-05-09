// alert("one piece mola")
const home = document.getElementById("home");
const quiz = document.getElementById("quiz");
const results = document.getElementById("results");
const buttonNext = document.getElementById("buttonNext");
const buttonStart = document.getElementById("buttonStart");
const myModal = new bootstrap.Modal(
  document.getElementById("staticBackdrop"),
  {}
);
const questionTitle = document.getElementById("question");
const answerOptions = document.getElementById("answerOptions");
const cardAnswer = document.getElementById("cardAnswer")
let currentQuestionIndex;
let rightAnswers = 0;


function hideView() {
  home.classList.add("d-none");
  quiz.classList.add("d-none");
  results.classList.add("d-none");
}

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
  questionTitle.innerHTML = ` ${currentQuestion[0]} ?`;
// console.log("respuestas originales", currentQuestion[1])
//   answerOptions.firstElementChild.dataset.correct = true;
//   const randomQuestion = shuffle(currentQuestion[1])
//   console.log("respuestas aleatorias", randomQuestion)

 
currentQuestion[1].forEach((answer) => {
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
        console.log(rightAnswers)
        console.log("holi")
        Array.from(answerOptions.children).forEach((card) => {
          setStatusClass(card, card.dataset.correct);
// esto no chuta
          if(card.dataset.correct == true ){
            rightAnswers++
            console.log(rightAnswers)
                }
        });
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
const questionsAPI = async () => {
  const arrayAPI = await axios.get(
    "https://opentdb.com/api.php?amount=10&category=31&difficulty=easy&type=multiple"
  );
  // console.log(arrayAPI.data.results)
  let arrayQuestions = [];

  // depuramos las preguntas.
  arrayAPI.data.results.forEach((element) => {
    const {
      correct_answer: correctAnswerArray,
      question,
      incorrect_answers: incorrectAnswersArray,
    } = element;
    // console.log(element)
    // console.log(correctAnswerArray)


    // correctAnswer.forEach(answer => {
    //     answer.dataset.correct = true
    // })
   
    const answers = [correctAnswerArray, ...incorrectAnswersArray];  

    // console.log(correctAnswerArray)
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
};
// const arrayQuestions = []
questionsAPI().then((data) => {
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

  buttonNext.addEventListener("click", () => {
    if(data.length > currentQuestionIndex + 1){
        currentQuestionIndex++;
        nextQuestion(data)
    }
    else{
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
