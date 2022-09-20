let botaoCadastro = document.querySelector("#r-button");
let nome= document.querySelector("#name-input");
let sobrenome= document.querySelector("#lastname-input");
let email= document.querySelector("#email-input");
let senha1= document.querySelector("#password-input");
let senha2= document.querySelector("#password2-input");
import {cadastra, bloqueiaBotao, campoValidado} from "./utilities.js";

bloqueiaBotao(botaoCadastro);
let nomeValidado=false, sobrenomeValidado=false, emailValidado=false, senha1validada=false, senha2validada=false;

//regex para testar se nome possui numeros ou caracteres especiais
let testaString = /^[a-záàâãéèêíïóôõöúçñ]+$/i;

// validação nome
nome.addEventListener("keyup",function(){
    let erroNome = document.querySelector("#erroNome");
    nome.style.borderColor = "var(--red)";
    let testenome = testaString.test(nome.value);
    bloqueiaBotao(botaoCadastro);
    if(nome.value.length<3){
        erroNome.innerHTML = "No mínimo 3 caracteres exigidos."
        }else if(!testenome){
            erroNome.innerHTML = "Caractere inválido";
        }else{
            nomeValidado = campoValidado(erroNome,nome);
            testaInputs();
    }
});

// validação sobrenome
sobrenome.addEventListener("keyup",function(){
    let erroSobrenome = document.querySelector("#erroSobrenome");
    sobrenome.style.borderColor = "var(--red)";
    let testenome = testaString.test(sobrenome.value);
    bloqueiaBotao(botaoCadastro);
    if(sobrenome.value.length<2){
        erroSobrenome.innerHTML = "No mínimo 2 caracteres exigidos."
        }else if(!testenome){
            erroSobrenome.innerHTML = "Caractere inválido."
        }else{
            sobrenomeValidado=campoValidado(erroSobrenome,sobrenome);
            testaInputs();
    }
});
//regex para testar se email possui formato valido, EX: xxx@xxx.com
let testaEmail = /\S+@\S+\.\S+/;

email.addEventListener("keyup",function(){
    let testeEmail = testaEmail.test(email.value);
    let erroEmail = document.querySelector("#erroEmail");
    bloqueiaBotao(botaoCadastro);
    if(!testeEmail){
        erroEmail.innerHTML = "Informe um e-mail válido."
        email.style.borderColor = "var(--red)";
    }else{
        emailValidado=campoValidado(erroEmail,email);
        testaInputs();
    }
})

// validação senha 1

senha1.addEventListener("keyup",function(){
    let erroSenha = document.querySelector("#erroSenha1");
    senha1.style.borderColor = "var(--red)";
    bloqueiaBotao(botaoCadastro);
    if(!senha1.value.match(/^(?=.*[0-9])/)){
        erroSenha.innerHTML="Senha precisa conter um número";
    }else if(!senha1.value.match(/^(?=.*[a-z])/)){
        erroSenha.innerHTML="Senha precisa conter uma letra minuscula";
    }else if(!senha1.value.match(/^(?=.*[A-Z])/)){
        erroSenha.innerHTML="Senha precisa conter uma letra maiuscula";
    }else if(!senha1.value.match(/^([a-zA-Z0-9]{8,})/)){
        erroSenha.innerHTML="Senha precisa conter no minimo 8 caracteres";
    }else{
        senha1validada=campoValidado(erroSenha,senha1);
        testaInputs();
    }
});

// validação senha 2

senha2.addEventListener("keyup",function(){
    let erroSenha = document.querySelector("#erroSenha2");
    bloqueiaBotao(botaoCadastro);
    if(senha1.value===senha2.value){
        senha2validada=campoValidado(erroSenha,senha2);
        testaInputs();
    }else{
        erroSenha.innerHTML="Senhas precisam ser iguais.";
        senha2.style.borderColor = "var(--red)";
    }
});

//função para verificar se todos campos foram devidamente validados e habilitar botão de enviar
function testaInputs(){
    if(nomeValidado && sobrenomeValidado && emailValidado && senha1validada && senha2validada){
        botaoCadastro.removeAttribute("disabled");
        botaoCadastro.style.backgroundColor = "var(--secondary)";
        };
};

botaoCadastro.addEventListener("click",function(evento){
    evento.preventDefault();
    let user = {
        firstName: nome.value,
        lastName: sobrenome.value,
        email: email.value,
        password: senha1.value  
    };
    cadastra(user);
});
