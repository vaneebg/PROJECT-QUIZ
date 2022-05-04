// alert("one piece mola")

const getA = document.getElementById('cardA')
let myModal = new bootstrap.Modal(document.getElementById('myModal'), {});




// function abrir() {

//     myModal.show();
// }

// getA.addEventListener("click",abrir)

// funcion anonima :s 
getA.addEventListener("click", () => myModal.show())