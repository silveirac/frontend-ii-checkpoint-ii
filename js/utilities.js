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
    spinnerLoad("l-button", "ENTRAR")
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
    setTimeout(function () {
      window.location.href='tasks.html';
    }, 500)

    });
    
  }).catch (erro => {
      spinnerLoad("l-button", "ENTRAR")
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
  spinnerLoad("r-button", "ENVIAR")
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

    let fetchBody = JSON.stringify({
      description : {
          content : JSON.stringify("[]"),
          priority : 0,
          type : "pendingList"
      },
      completed : false
    });

    fetch (`${URL}/tasks`, {
        method: 'POST',
        headers: {
            "authorization" : resposta.jwt,
            "content-type" : "application/json"
        },
        body: fetchBody
    })
    .then (response => {

      let fetchBody2 = JSON.stringify({
        description : {
            content : JSON.stringify("[]"),
            priority : 0,
            type : "doneList"
        },
        completed : false
    });
    
      fetch (`${URL}/tasks`, {
          method: 'POST',
          headers: {
              "authorization" : resposta.jwt,
              "content-type" : "application/json"
          },
          body: fetchBody2
      }).then(response2 => {

        let fetchBody = {
          method: "GET",
          headers: {
              authorization: sessionStorage.getItem("jwt")
          }
        }
      
        fetch (`${URL}/tasks`, fetchBody)
        .then (response3 => response3.json())
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
        })
        .then (output => window.location.href='tasks.html')
      })
    }).catch(erro =>{
      console.log(erro);
    })
  })
}

export function campoValidado(small,campo) {
    small.innerHTML = "";
    campo.style.borderColor = "var(--green)";
    return true;
};

function spinnerLoad (buttonName, buttonText) {
  let getSpinner = document.getElementById("spinner")
  let lrButton = document.getElementById(buttonName)

  if(getSpinner == null) {
      let spinner = document.createElement("div");
      spinner.id = "spinner";
      spinner.classList.add("spinner");
      lrButton.innerText = "";
      lrButton.appendChild(spinner);

  } else {
    lrButton.innerText = buttonText;
    lrButton.removeChild(spinner)
  }
}