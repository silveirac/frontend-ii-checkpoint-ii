window.addEventListener("load",testeJWT)
function testeJWT(){
    let jwt = sessionStorage.getItem("jwt");
    if(jwt == null){
        window.location.href='login.html';
    }
};