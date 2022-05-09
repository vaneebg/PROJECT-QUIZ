const home = document.getElementById("home");
const quiz = document.getElementById("quiz");
const results = document.getElementById("results");
const buttonNext = document.getElementById("buttonNext");
const buttonStart = document.getElementById("buttonStart");
const buttonReStart = document.getElementById("buttonReStart");
const myModal = new bootstrap.Modal(
    document.getElementById("staticBackdrop"), {}
);
const questionTitle = document.getElementById("question");
const answerOptions = document.getElementById("answerOptions");
const modalResponse = document.getElementById("modalResponse");
const scoreResults = document.getElementById("scoreResults");
const user = document.getElementById("user");
const alert = document.getElementById("alert");
const progressBar = document.getElementById("progressBar");

let images = [
    "./Assets/option1.png",
    "./Assets/option2.png",
    "./Assets/option3.png",
    "./Assets/option4.png",
];
let currentQuestionIndex;
let rightAnswers = 0;
let users = JSON.parse(localStorage.getItem("USERS")) || [];

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

function saveData() {
    const data = {
        userName: user.value,
        userScore: rightAnswers,
    };
    users.push(data);
    localStorage.setItem("USERS", JSON.stringify(users));
}

function printChart(users) {


    const data = {

        labels: users.map(user => user.userName),
        datasets: [{
            label: 'RESULTADOS',
            backgroundColor: ['rgba(116, 72, 194, .2)', 'rgba(33, 192, 215, .2)', 'rgba(217, 158, 43, .2)', 'rgba(205, 58, 129, .2)', 'rgba(156, 153, 204, .2)', 'rgba(225, 78, 202, .2)'],
            borderColor: ['rgba(116, 72, 194, 1)', 'rgba(33, 192, 215, 1)', 'rgba(217, 158, 43, 1)', 'rgba(205, 58, 129, 1)', 'rgba(156, 153, 204, 1)', 'rgba(225, 78, 202, 1)'],
            data: users.map(user => user.userScore),
        }]
    };
    const config = {
        type: 'bar',
        data: data,
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        stepSize: 1,
                        max: 10,
                        min: 0,
                    },
                }, ],
            }
        }
    }
    new Chart('myChart', config);
}

function printData(userName, userScore) {
    let usersBack = JSON.parse(localStorage.getItem("USERS"));
    printChart(usersBack)
        // Ordena puntuaciones de mayor a menor
    usersBack.sort((a, b) => b.userScore - a.userScore);

    scoreResults.innerHTML =

        ` Hey, ${userName} you have scored <b>${userScore}/10 </b> answers!
                <br>
                <br>
                    Check the score of other players below o(^▽^)o
                <br>
                <br>
                <br>
                    <div class="card-body text-center"><b>Top results</b></div>
                    `;
    usersBack.forEach((user) => {

        scoreResults.innerHTML += `
                        <div class="card">
                        <div class="card-header text-center">${user.userName}</div>
                        <li style="border:none" class="list-group-item text-center">${user.userScore}</li></div>   
                             `;
    });
}

const setStatusClass = (cardElement, cardValue) => {
    if (cardValue) {
        cardElement.children[0].className = "card bg-success";
    } else {
        cardElement.children[0].className = "card bg-danger";
    }
};

const showQuestion = (currentQuestion) => {
    let progress = `${currentQuestionIndex * 10}%`;
    progressBar.style.width = progress;
    questionTitle.innerHTML = ` ${currentQuestion[0]}?`;

    currentQuestion[2].forEach((answer, i) => {
        const card = document.createElement("card");
        card.innerHTML = ` 
                            <div class="card" id="card" >
                                <img src="${images[i]}" class="card-img-top" alt="..." />
                                <div class="card-body text-center">
                                    <h5 class="card-title">${answer}</h5>
                                </div>
                            </div>            
                      `;
        card.addEventListener("click", function selectAnswer() {
            Array.from(answerOptions.children).forEach((card) => {
                setStatusClass(card, card.dataset.correct);
            });
            modalResponse.innerHTML = `${currentQuestion[1]}`;
            openModal();
            if (answer === currentQuestion[1]) {
                rightAnswers++;
            }
        });
        answerOptions.appendChild(card);
    });

    Array.from(answerOptions.children).forEach((card) => {
        if (card.innerText == currentQuestion[1]) card.dataset.correct = true;
    });
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
    try {
        const arrayAPI = await axios.get(
            "https://opentdb.com/api.php?amount=10&category=31&difficulty=easy&type=multiple"
        );

        let arrayQuestions = [];

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
        buttonStart.addEventListener("click", (e) => {
            e.preventDefault();
            if (user.value == "") {
                alert.className = "alert alert-danger text-center";
                alert.innerText = "Please, introduce an username ಠ益ಠ)!";
            } else {
                rightAnswers = 0;
                hideView();
                quiz.classList.remove("d-none");
                currentQuestionIndex = 0;
                nextQuestion(arrayQuestions);
            }
            setTimeout(() => {
                alert.className = "d-none";
            }, 4000);
        });

        buttonNext.addEventListener("click", () => {
            if (arrayQuestions.length > currentQuestionIndex + 1) {
                currentQuestionIndex++;
                nextQuestion(arrayQuestions);
                if (currentQuestionIndex == 9) {
                    buttonNext.innerHTML = "Check your results ⊂((・▽・))⊃";
                }
            } else {
                closeModal();
                saveData();
                printData(user.value, rightAnswers);
                hideView();
                results.classList.remove("d-none");

            }
        });
        buttonReStart.addEventListener("click", (e) => {
            hideView();
            home.classList.remove("d-none");
            user.value = ""
        });
    } catch (error) {
        console.error(error);
    }
};
questionsAPI();