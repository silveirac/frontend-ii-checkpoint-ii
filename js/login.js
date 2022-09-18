
let emailLogin = document.querySelector("#email-input");
let senhaLogin = document.querySelector("#password-input");
let botaoLogin = document.querySelector("#l-button");

import {bloqueiaBotao,campoValidado,login} from "./utilities.js" ;
bloqueiaBotao(botaoLogin);
let emailLoginValidado=false,senhaLoginvalidada=false;

//validação email do login
let testaEmail = /\S+@\S+\.\S+/;
emailLogin.addEventListener("keyup",function(){
  let testeEmail = testaEmail.test(emailLogin.value);
  let erroEmail = document.querySelector("#erroEmail");
  if(!testeEmail){
      erroEmail.innerHTML = "Informe um e-mail válido."
      emailLogin.style.borderColor = "var(--red)";
      bloqueiaBotao(botaoLogin);
  }else{
      emailLoginValidado= campoValidado(erroEmail,emailLogin);
      testaLogin();
  }
})
//validação senha 
senhaLogin.addEventListener("keyup",function(){
  let erroSenha = document.querySelector("#erroSenha");
    senhaLogin.style.borderColor = "var(--red)";
    if(senhaLogin.value.length>=8){
      senhaLoginvalidada= campoValidado(erroSenha,senhaLogin);
      testaLogin();
    }else{
      bloqueiaBotao(botaoLogin);
    }
})
//teste para verificar se ambos inputs estão validados e liberar botao de login
function testaLogin(){
  if(emailLoginValidado && senhaLoginvalidada){
    botaoLogin.removeAttribute("disabled");
    botaoLogin.style.backgroundColor = "var(--secondary)";
  }
};

botaoLogin.addEventListener("click",function(e){
    e.preventDefault();
    let user = {
      email: emailLogin.value,
      password: senhaLogin.value  
    };
    login(user);
});





