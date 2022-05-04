// alert("one piece mola")

const getA = document.getElementById('cardA')
let myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {});

// esto se cambia mas tarde porque no quiero cerrrarlo
const closeButton = document.getElementById('buttonNext')




// function abrir() {

//     myModal.show();
// }

// getA.addEventListener("click",abrir)

// funcion anonima :s 
getA.addEventListener("click", () => myModal.show() )


closeButton.addEventListener("click", ()=>myModal.hide())
