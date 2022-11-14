
/* Reinicio del formulario al cargar la página */
const contactForm = document.getElementById('form_contact');
document.addEventListener('onload', contactForm.reset());

/* ------------------------ Contact form ---------------------- */
/* Inputs selection */
let inputName = document.getElementById('name');
let inputEmail = document.getElementById('email');
let textArea = document.getElementById('textarea');

/* ------------- Funciones: 
/* Mostrar error de validación */
function mostrarErrorValidacion(mensaje, input) {
    if(!input.parentNode.contains(document.querySelector('.error-detail')) && !input.classList.contains('form-contact-item_input-error')) {
        input.classList.remove('form-contact-item_input-confirm');  /* Se elimina la clase Confirm */
        input.classList.toggle('form-contact-item_input-error');    /* Se agrega la clase de Error */
        
        let mensajeContainer = document.createElement('div');   /* Agrega el div contenedor del error... */
        mensajeContainer.classList.toggle('error-detail');      
        mensajeContainer.innerHTML = mensaje;
        input.parentNode.appendChild(mensajeContainer);         /* ... al inputContainer */
    }
}

/* Validación del largo del input */
function validarLongitud(input, min, max) {
    let valorInput = input.value.trim();
    let mensajeError = '';

    if(valorInput.length < min && valorInput.length != 0) {
        mensajeError = `*Debe tener ${min} o más caracteres`;
        mostrarErrorValidacion(mensajeError, input);
        return null;
    } else if(valorInput.length > max) {
        mensajeError = `*Debe tener menos de ${max} caracteres`;
        mostrarErrorValidacion(mensajeError, input);
        return null;
    } else if(document.querySelector('.error-detail') && input.classList.contains('form-contact-item_input-error') && valorInput.length != 0) {
        document.querySelector('.error-detail').remove();               /* Chequea si las clases existen */
        input.classList.toggle('form-contact-item_input-error');        /* Si están las elimina */
        input.classList.remove('error-focus');
        input.classList.add('form-contact-item_input-confirm');         /* Y agrega la clase de confirmación */
    }

    return input.value;
}

/* Validación del input con regex */
function validarRegex(input, regex) {
    if (!regex.test(input.value)) {
        mostrarErrorValidacion('Compruebe los carácteres introducidos', input);
    } else if (regex.test(input.value) && input.classList.contains('form-contact-item_input-error') && document.querySelector('.form-contact-item > .error-detail')) {
        document.querySelector('.form-contact-item > .error-detail').remove();
        input.classList.remove('form-contact-item_input-error');
        input.classList.remove('error-focus');
        input.classList.add('form-contact-item_input-confirm');
    }
    return regex.test(input.value);
}

/* Event Listeners: validaciones en tiempo real */
inputName.addEventListener('input', () => validarLongitud(inputName, 3, 10));
textArea.addEventListener('input', () => validarLongitud(textArea, 10, 400));
inputEmail.addEventListener('input', () => validarRegex(inputEmail, /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/));

/* Validación final del formulario al clickear boton submit*/
contactForm.addEventListener('submit', e => {
    e.preventDefault()

    let valueName = validarRegex(inputName, /^[a-zA-Z][a-z^/s]{2,9}$/);
    let valueTextArea = validarLongitud(textArea, 10, 400);
    let valueEmail = validarRegex(inputEmail, /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/);

    if (valueName && valueEmail && valueTextArea) {
        alert('Su mensaje ha sido enviado')
        contactForm.submit();
    } else {
        alert('Corrija los campos correspondientes');
        if(!valueName) {inputName.classList.add('error-focus')};
        if(!valueEmail) {inputEmail.classList.add('error-focus')};
        if(!valueTextArea) {textArea.classList.add('error-focus')};
    }
});

