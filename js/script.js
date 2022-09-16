const loginInput = document.getElementById("username-input");
loginInput.label = "username-label";
loginInput.addEventListener("focus", labelMoveFocus, false);
loginInput.addEventListener("blur", labelMoveBlur, false);

const passwordInput = document.getElementById("password-input");
passwordInput.label = "password-label";
passwordInput.addEventListener("focus", labelMoveFocus, false);
passwordInput.addEventListener("blur", labelMoveBlur, false);

function labelMoveFocus (event) {
    let input = event.target;
    let label = document.getElementById(input.label);

    label.style.top = "-18px"
    label.style.fontSize = "0.5rem"
}

function labelMoveBlur (event) {
    let input = event.target;
    let label = document.getElementById(input.label);

    if (input.value == "") {
        label.style.top = "10px"
        label.style.fontSize = "0.75rem"
    }
}
