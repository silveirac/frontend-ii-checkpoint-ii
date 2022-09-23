// CAPTURA DE ELEMENTOS
const nameInput = document.getElementById("name-input");
const lastNameInput = document.getElementById("lastname-input");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const password2Input = document.getElementById("password2-input");

window.addEventListener("load",userValidation);
function userValidation() {
    let jwt = sessionStorage.getItem("jwt");
    fetch ("https://ctd-fe2-todo-v2.herokuapp.com/v1/users/getMe", {
        method: 'GET',
        headers: {"Authorization" : jwt}
    })
    .then (response => response.json())
    .then (result => {
        if (result !== "jwt malformed") {
            sessionStorage.setItem("user", JSON.stringify(result))
        }
    })
    .catch (erro => console.log(erro))
}

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
    let arrow = document.querySelector(".arrow-bars");
    let pWindow = document.getElementById("profile-window")

    if (pWindow == null) { 
        togleProfileWindow();
        pWindow = document.getElementById("profile-window")
        arrow.style.transform = "rotate(180deg)"
        pWindow.style.visibility = "visible";
        pWindow.style.transition = "100ms"
        pWindow.style.height = "300px"
    
    } else {
        let body = document.querySelector("body")
        pWindow = document.getElementById("profile-window")

        arrow.style.transform = ""
        pWindow.style.visibility = "hidden";
        pWindow.style.transition = "0ms"
        pWindow.style.height = "0"

        body.removeChild(pWindow);
    }
}

function togleProfileWindow () {
    let body = document.querySelector("body");
    let pWindow = document.createElement("div");    
    pWindow.innerHTML = `
        <img src="./assets/profile-pic.jpg" alt="imagem de perfil" id="profile-pic">
        <p id="profile-name">Neymar Jr.</p>
        <p id="profile-email">MENINONEY@PSG.FR</p>
        <a href="#" id="profile-password-change">ALTERAR SENHA</a>
        <a href="./index.html" id="profile-logout">
            <p>ENCERRAR SESSÃO</p>
            <img src="./assets/logout.svg" alt="Encerrar Sessão">
        </a>
    `;

    pWindow.id = "profile-window";
    body.appendChild(pWindow);
}
