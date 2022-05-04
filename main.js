// alert("one piece mola")

const getA = document.getElementById('cardA')
let myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {});

const home = document.getElementById('home')
const quiz = document.getElementById('quiz')

// esto se cambia mas tarde porque no quiero cerrrarlo
const closeButton = document.getElementById('buttonNext')

const buttonStart = document.getElementById('buttonStart')




const startQuiz =() =>{
    home.classList.add('d-none')
    quiz.classList.remove('d-none')
} 
buttonStart.addEventListener('click',startQuiz  )


// function abrir() {
//     myModal.show();
// }
// getA.addEventListener("click",abrir)
// funcion anonima :s 
getA.addEventListener("click", () => myModal.show() )


closeButton.addEventListener("click", ()=>myModal.hide())
