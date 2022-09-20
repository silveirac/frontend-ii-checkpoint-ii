let emailLogin = document.querySelector("#email-input");
let senhaLogin = document.querySelector("#password-input");
let botaoLogin = document.querySelector("#l-button");
let erroLogin = document.querySelector(".form-message");

const URL = "https://ctd-todo-api.herokuapp.com/v1";
export function bloqueiaBotao(botao){
    botao.disabled= "true";
    botao.style.backgroundColor = "var(--primary)";
};
//função para realizar login do user
export function login(usuario){
    fetch(`${URL}/users/login`,{
    method:"POST",
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify(usuario)
}).then(function(resposta) {
    if(resposta.status==200 || resposta.status==201){
        return resposta.json();
    }else{
      throw resposta;
    }
  }).then(function(resposta){
    sessionStorage.setItem("jwt",resposta.jwt);
    window.location.href='tarefas.html';
  }).catch(erro =>{
    senhaLogin.value = "";
    emailLogin.value = "";
    bloqueiaBotao(botaoLogin);
    emailLogin.style.borderColor = "var(--secondary)";
    senhaLogin.style.borderColor = "var(--secondary)";
    erroLogin.innerText = "Usuário ou senha inválido."
    erroLogin.removeAttribute("hidden");
  })
};

//função para cadastrar o user na API
export function cadastra(usuario){
    fetch(`${URL}/users`,{
    method:"POST",
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify(usuario)
  }).then(function(resposta) {
    return resposta.json();
  }).then(function(resposta){
    sessionStorage.setItem("jwt",resposta.jwt);
    window.location.href='tarefas.html';
  })
  .catch(erro =>{
    console.log(erro);
  })
  }

export function campoValidado(small,campo){
    small.innerHTML = "";
    campo.style.borderColor = "var(--green)";
    return true;
};