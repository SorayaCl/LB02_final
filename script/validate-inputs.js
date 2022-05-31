//read form element
const form = document.getElementById('form');
const name = document.getElementById('name');
const lastname = document.getElementById( 'lastname');
const number = document.getElementById('number');
const email = document.getElementById('email');
let password = document.getElementById('password');


function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}



function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Email ist nicht gültig');
    }
}


function checkNumber(input) {
    const re = /^\d{10}$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Telefonnummer nicht gültig');
    }
}



function checkRequired(inputArr) {
    let isRequired = false;
    inputArr.forEach(function(input) {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} ist erforderlich`);
            isRequired = true;
        } else {
            showSuccess(input);
        }
    });

    return isRequired;
}


function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(
            input,
            `${getFieldName(input)} muss mindestens ${min} Zeichen haben`
        );
    } else if (input.value.length > max) {
        showError(
            input,
            `${getFieldName(input)} muss mindestens ${max} Zeichen haben`
        );
    } else {
        showSuccess(input);
    }
}

function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function validateForm(){
    if(!checkRequired([number, name, lastname, email, password])){
        checkLength(name);
        checkNumber(number, 3, 15);
        checkLength(lastname, 3, 25);
        checkLength(password, 6, 25);
        checkEmail(email);

    }
}

form.addEventListener('submit', function(e) {
    //https://www.w3schools.com/jsref/event_preventdefault.asp
    e.preventDefault();
    //First validate form
    validateForm();
});