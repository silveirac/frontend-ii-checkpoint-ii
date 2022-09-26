let emailLogin = document.querySelector("#email-input");
let senhaLogin = document.querySelector("#password-input");
let botaoLogin = document.querySelector("#l-button");
let erroLogin = document.querySelector(".form-message");

const URL = "https://ctd-fe2-todo-v2.herokuapp.com/v1";

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
  }).then ( function(resposta) {

    sessionStorage.setItem("jwt",resposta.jwt);

    let fetchBody = {
      method: "GET",
      headers: {
          authorization: sessionStorage.getItem("jwt")
      }
    }
  
    fetch (`${URL}/tasks`, fetchBody)
    .then (response => response.json())
    .then (result => {
      let allTask = Array.from(result);

      allTask.forEach(element => {

        let taskDescription = JSON.parse(element.description);
        let taskDescriptionContent = taskDescription.content

        if (taskDescription.type == "pendingList") {
          sessionStorage.setItem("pendingList", JSON.parse(`[${taskDescriptionContent}]`))
          sessionStorage.setItem("pendingListId", element.id)
        } else if (taskDescription.type == "doneList") {
          sessionStorage.setItem("doneList", JSON.parse(`[${taskDescriptionContent}]`))
          sessionStorage.setItem("doneListId", element.id)
        }

      })

    window.location.href='tasks.html';
    });
    
  }).catch (erro => {
      senhaLogin.value = "";
      emailLogin.value = "";
      bloqueiaBotao(botaoLogin);
      emailLogin.style.borderColor = "var(--secondary)";
      senhaLogin.style.borderColor = "var(--secondary)";
      erroLogin.innerText = "Usuário ou senha inválido."
      erroLogin.removeAttribute("hidden");
  });
};

//função para cadastrar o user na API
export function cadastra (usuario) {

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
    window.location.href='tasks.html';
  }).catch(erro =>{
    console.log(erro);
  })

  }

export function campoValidado(small,campo) {
    small.innerHTML = "";
    campo.style.borderColor = "var(--green)";
    return true;
};