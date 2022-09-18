// CAPTURA DE ELEMENTOS
const nameInput = document.getElementById("name-input");
const lastNameInput = document.getElementById("lastname-input");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const password2Input = document.getElementById("password2-input");

window.addEventListener("load",testeJWT)
function testeJWT(){
    let jwt = sessionStorage.getItem("jwt");
    if(jwt != null){
        window.location.href='tarefas.html';
    }
};

// ARRAY PARA ITERAÇÃO
let inputIterationArray = [
    nameInput,
    lastNameInput,
    emailInput,
    passwordInput,
    password2Input
];

// ITERAÇÃO DE .addEventListener
inputIterationArray.forEach(element => {
    if (element) {
        element.addEventListener("focus", labelMoveFocus, false);
        element.addEventListener("blur", labelMoveBlur, false);
    }
});

// FUNÇÕES
function labelMoveFocus (event) {
    let label = document.getElementById(`${event.target.name}-label`);

    label.style.top = "-18px"
    label.style.fontSize = "0.5rem"
}

function labelMoveBlur (event) {
    let label = document.getElementById(`${event.target.name}-label`);

    if (event.target.value == "") {
        label.style.top = "15px"
        label.style.fontSize = "0.75rem"
    }
}
