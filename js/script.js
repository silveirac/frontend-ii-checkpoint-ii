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

function openProfile () {
    let arrow = document.querySelector(".profile-bars");
    let pWindow = document.getElementById("profile-window")

    if (arrow.style.transform == "") {
        arrow.style.transform = "rotate(180deg)"
        pWindow.style.visibility = "visible";
        pWindow.style.transition = "100ms"
        pWindow.style.height = "300px"
    } else {
        arrow.style.transform = ""
        pWindow.style.visibility = "hidden";
        pWindow.style.transition = "0ms"
        pWindow.style.height = "0"
    }
}

function togleProfileWindow () {
    let pWindow = document.createElement("div");
    pWindow.innerHTML = `
        <img src="./assets/pic-placeholder.svg" alt="imagem de perfil" id="profile-pic">
        <p id="profile-name">${CAUÊ} ${SILVEIRA}</p>
        <p id="profile-email">${'CAUEASILVEIRA@GMAIL.COM'}</p>
        <a href="#" id="profile-password-change">ALTERAR SENHA</a>
        <a href="./index.html" class="profile-logout"></a>
    `;
}
