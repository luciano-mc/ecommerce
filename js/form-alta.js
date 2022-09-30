(() => {

/* Reinicio del formulario al cargar la página */
const productForm = document.getElementById('form_product');
document.addEventListener('onload', productForm.reset());

/* ------------------------ product form ---------------------- */
/* Inputs selection */
let inputCollection = document.querySelectorAll('form > div > input:not([id="image"])');
let textAreaCollection = document.querySelectorAll('textarea');

/* Input Styles al hacer focus */
inputCollection.forEach(input => input.addEventListener('focus', e => e.target.labels[0].classList.add('product-input-clicked')));
textAreaCollection.forEach(textarea=> textarea.addEventListener('focus', e => e.target.labels[0].classList.add('product-input-clicked')));

/* Muestra el error de la validación */
function mostrarErrorValidacion(mensaje, divInput) {
    if(!divInput.parentNode.contains(document.querySelector('.form-product-item > .form-product_error-detail'))) {
    let mensajeContainer = document.createElement('div');
    mensajeContainer.classList.add('form-product_error-detail');
    mensajeContainer.innerHTML = mensaje;
    divInput.parentNode.appendChild(mensajeContainer);
    }
}

/* Función de validación según el input y la regex */
function validarRegex(input, regex) {
    if (regex.test(input.value) && input.classList.contains('form-contact-item_input-error') && document.querySelector('.form-contact-item > .form-product_error-detail')) {
        document.querySelector('.form-contact-item > .form-product_error-detail').remove();
        input.classList.remove('form-contact-item_input-error');
        input.classList.remove('form-product_error-focus');
        input.classList.add('form-contact-item_input-confirm');
    }
    return regex.test(input.value);
}

/* Inputs selection */
let productInputName = document.getElementById('product-name');
let productInputPrice = document.getElementById('product-price');
let productInputStock = document.getElementById('product-stock');
let productInputBrand = document.getElementById('product-brand');
let productInputCategory = document.getElementById('product-category');
let productInputShortText = document.getElementById('short-description');
let productInputLongText = document.getElementById('long-description');
let productInputMinAge = document.getElementById('min-age');
let productInputMaxAge = document.getElementById('max-age');

/* Validación del formulario ante el evento submit */
productForm.addEventListener('submit', e => {
    e.preventDefault()

    let productValueName = validarRegex(productInputName, /^[a-zA-Z][a-zA-Z\s\d\\,\\.\\'\\"\-\\_\\/\\ñ\\´\\À-ÿ]{2,30}$/);   /* Entre 2 a 30 letras */
    let productValueBrand = validarRegex(productInputBrand, /^[a-zA-Z][a-zA-Z\s\d\\,\\.\\'\\"\-\\_\\/\\ñ\\´\\À-ÿ]{2,40}$/ ) /* Hasta 40 caracteres */
    let productValueCategory = validarRegex(productInputCategory, /^[a-zA-Z][a-zA-Z\s\d\\,\\.\\'\\"\-\\_\\/\\ñ\\´\\À-ÿ]{2,50}$/ ) /* Hasta 40 caracteres */
    let productValuePrice = validarRegex(productInputPrice, /(^[0-9]{1,}$|^[0-9]{1,}[\\,\\.][0-9]{1,2}$)/);                 /* Positivos con o sin decimales */
    let productValueStock = validarRegex(productInputStock, /^[0-9]{1,3}$/);                                                /* con ceros y hasta 3 digitos */
    let productValueShortText = validarRegex(productInputShortText, /^[a-zA-Z]{10,80}$/);                                   /* Entre 10 y 80 caracteres de largo */
    let productValueLongText = validarRegex(productInputLongText, /^[a-zA-Z]{10,2000}$/);                                   /* Entre 10 y 2000 caracteres de largo */
    let betweenAges = (parseInt(productInputMinAge.value) <= parseInt(productInputMaxAge.value));                           /* Edad mínima menor a edad máxima */

    if (productValueName && productValuePrice && productValueStock && productValueBrand && productValueCategory && productValueShortText && productValueLongText && betweenAges) {
        productForm.submit();
    } else {
        alert('Corrija los caracteres en los campos correspondientes');
        if(!productValueName) {productInputName.classList.add('form-product_error-focus'); mostrarErrorValidacion('*Debe tener entre 2 y 30 caracteres', productInputName)};
        if(!productValueBrand) {productInputBrand.classList.add('form-product_error-focus'); mostrarErrorValidacion('*Debe tener entre 2 y 40 caracteres', productInputBrand)};
        if(!productValueCategory) {productInputCategory.classList.add('form-product_error-focus'); mostrarErrorValidacion('*Debe tener entre 2 y 50 caracteres', productInputCategory)};
        if(!productValuePrice) {productInputPrice.classList.add('form-product_error-focus'); mostrarErrorValidacion('*Debe tener solo números con hasta 2 decimales', productInputPrice)};
        if(!productValueStock) {productInputStock.classList.add('form-product_error-focus'); mostrarErrorValidacion('*Debe tener solo números enteros y positivos', productInputStock)};
        if(!productValueShortText) {productInputShortText.classList.add('form-product_error-focus'); mostrarErrorValidacion('*Debe tener entre 10 y 80 caracteres', productInputShortText)};
        if(!productValueLongText) {productInputShortText.classList.add('form-product_error-focus'); mostrarErrorValidacion('*Debe tener entre 10 y 2000 caracteres', productInputLongText)};
        if(!betweenAges) {productInputMinAge.classList.add('form-product_error-focus'); mostrarErrorValidacion('*La edad mínima debe ser menor a la máxima', productInputMinAge)};
    }

});

})();