/* ---- Cart and modal ----- */
/* Seleccion del modal + carrito */
let cartSVG = document.querySelector('.main-header__cart-button-container svg');  /* IMAGEN SVG DEL CARRITO */
let cartButtonContainer = document.querySelector('.cart-svg-container');
let modal = document.getElementById('modal');                              /* Modal */
let modalBackground = document.getElementById('modal-background');          // Fondo del modal
let modalCross = document.querySelector('.card-modal-x');                           /* Cruz del modal */
let modalContent = document.querySelector('.modal-content');                        /* Contenido del modal */
let modalTitle = document.querySelector('.modal_title');

/* ------------- MODAL ----------- */
/* funciones */
function cerrarModal() {
    cartButtonContainer.classList.remove('main-header__cart-button-container-mini-pressed');
    cartSVG.classList.remove('main-header__cart-button-container--pressed');
    modal.classList.remove('card-modal-container--show');
    modalBackground.classList.remove('cart-modal-background')
}

function mostrarModal() {
    cartSVG.classList.add('main-header__cart-button-container--pressed');
    modal.classList.add('card-modal-container--show');
    modalBackground.classList.add('cart-modal-background');
}

/* MODAL - OCULTAR/MOSTRAR*/
cartButtonContainer.addEventListener('click', function() {
    cartButtonContainer.classList.toggle('main-header__cart-button-container-mini-pressed');
        if(!cartButtonContainer.classList.contains('main-header__cart-button-container-mini-pressed')) {
            cerrarModal();
        } else {
            refreshModalTitle();
            mostrarModal();
        }
});

// MODAL - CERRAR CON TECLA ESCAPE
document.addEventListener('keydown', e => {
    if(e.key === 'Escape') {
        cerrarModal();
    }
});

/* MODAL - CERRAR CON CRUZ O CLICKEANDO AFUERA*/
modal.addEventListener('click', e => {
    if (e.target == modalCross) {
        cerrarModal();
    }
})
// MODAL - CERRAR CON CLICK FUERA
document.addEventListener('click', e => {
    if (e.target === modalBackground) {
        cerrarModal();
    }
})

/* CARD - EXPANDE LAS IMAGENES */
document.addEventListener('click', (e) => {if (e.target.classList.contains('card__image-btn')) {
    e.target.classList.toggle('card__image-btn-opened');
    e.target.parentNode.classList.toggle('card__image-container-large');

    if(e.target.previousElementSibling.dataset.label !== 'false') {
        e.target.previousElementSibling.classList.toggle('product-label-opened')};
}}
);


/* INICIAR AJAX - FETCH / AWAIT */
const main = document.getElementById('main');
const getIdFromHash = () => location.hash ? location.hash.slice(1) : 'inicio';
const getUrlFromId = id => `../templates/${id}.html`;

const ajaxInit = async id => {
    let url = '../templates/';
    try {
        await fetch(url + id)
        .then(response => { 
            if (response.ok) {
                    return response.text();
                } 
                throw new Error('Fallo en la conexión');
            })
        .then(data => {
            switch(id) {
                case 'inicio.html' :    fetchJS('products');
                break;
                case 'alta.html' :      fetchJS('form-alta');
                break;
                case 'contacto.html' :  fetchJS('form-contacto');
                break;                                
                default : null;
            }
            main.innerHTML = data;
        })    
}   catch (error) {
        console.error('Error:', error.message);
        main.innerHTML = 
        `Se ha detectado un error: ${error.message} <br>
        Vuelva al <a href="${location.origin}" style="color: red; text-decoration: none;">inicio</a>`
}
};


// PETICION AJAX AL REFRESCAR LA PAGINA
window.addEventListener('load', () => {
    if (location.hash) {
        ajaxInit(getIdFromHash() + '.html');
    } else {
        ajaxInit(getUrlFromId('inicio'));
    }
    activateLink();
});

/* LINKS Y URL's */
const navLinks = document.querySelectorAll('.main-nav__link');

// Deja el link presionado al hacer click
function activateLink() {
    navLinks.forEach(link => {
        if (link.dataset.id === location.href.split('#')[1]) {
            link.classList.add('active-link');
            link.ariaCurrent = 'page';
        } else {
            link.classList.remove('active-link');
            link.removeAttribute('aria-current');
        }
    })
}

/* Url's access by links */
navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const id = link.dataset.id;
        location.hash = id;
    })});

/* Crea el archivo JS autoejecutable */
const createJS = (id, content) => {
    const script = document.createElement('script');
    script.id = id;
    script.innerHTML = content;
    document.body.appendChild(script);
}

// REQUEST AL ARCHIVO JS Y TRAE SU RESPUESTA
const fetchJS = async (fileName) => {
    let urlJS = `/js/${fileName}.js`;
             await fetch(urlJS)
                        .then(response => {if(response.ok) {return response.text()}})
                        .then(data => {
                            if(document.getElementById(fileName)) {
                                document.getElementById(fileName).remove();
                                createJS(fileName, data);
                                return;
                            }
                            createJS(fileName, data);
                        })
}

/* PETICION AJAX AL REFRESCAR EL HASH */
window.addEventListener('hashchange', () => {
    const id = location.hash.slice(1);
    ajaxInit(id + '.html');
    activateLink();
});

/* CARRITO */
let cart = [];
const modalProducts = document.getElementById('modalProducts');

/* Funciones */
const saveCart = () => localStorage.setItem('cart', JSON.stringify(cart));
const loadCart = () => JSON.parse(localStorage.getItem('cart')) ||[];
const checkProductOnCart = id => cart.find(producto => producto.id == id);

function removeFromCart(id) {
    const indice = cart.findIndex(product => product.id === id);
    const product = cart.find(product => product.id === id);
    if (product.quantity > 1) {
        product.quantity--;
    } else {
        cart.splice(indice, 1);
    }
    refreshCart();
}

function addToCart(id){
   const item = stockProducts.find(product => product.id == id);
   if (!checkProductOnCart(id)) {
        item.quantity++;
        cart.push(item);
   } else {
        checkProductOnCart(id).quantity++;
        refreshCart();
   }
}

/* Contador de items en el carrito */
const modalCounter = document.getElementById('modalCounter');

/* EL BOTON DEL CARRITO QUE YA FUNCIONA */
main.addEventListener('click', e => {
        if (e.target.classList.contains('card__btn-buy')) {
        e.preventDefault();
        addToCart(parseInt(e.target.dataset.productId));
        refreshCart();
        showBtnAddedProduct();
    }
});

// MUESTRA EL BOTON DE 'PRODUCTO AGREGADO' AL CARRITO
function showBtnAddedProduct() {
    const showAddedBtn = document.createElement('div');
    showAddedBtn.classList.add('btn_added-product--show');
    showAddedBtn.innerHTML = 'Producto Agregado';
    document.querySelector('#modal-background').appendChild(showAddedBtn);
    setTimeout(() => {showAddedBtn.remove()}, 1000);
}

// Funcion para "imprimir" los productos en el modal y actualiza el contador, precio total y titulo
const refreshCart = () => {
    modalProducts.innerHTML = '';
    if (cart.length != 0) {
        modalProducts.innerHTML = `
            <div class="modal_products-header" >
                    <div class="modal_product-item modal_product-item-small"></div>
                    <div class="modal_product-item">NOMBRE</div>
                    <div class="modal_product-item">CANTIDAD</div>
                    <div class="modal_product-item">PRECIO</div>
                    <div class="modal_product-item">SUBTOTAL</div>
                    <div class="modal_product-item modal_product-item-small"></div>
            </div>
        `      // RENDERIZA EL ENCABEZADO DE TABLA --ANTES-- DE RENDERIZAR LOS PRODUCTOS
    }
    cart.forEach(product => {
        const div = document.createElement('div');
        div.className = ('modal_product');
        div.innerHTML = `
            <picture class="modal_image-container modal_product-item-small">
                <img src="${product.image}" alt="${product.name}" class="modal_image">
            </picture>
            <div class="modal_product-item">
                ${product.name}
            </div>
            <div class="modal_product-item" id="cantidad" data-product-id="${product.id}">
                ${product.quantity}
            </div>
            <div class="modal_product-item" id="precio">
                ${product.price}
            </div>
            <div class="modal_product-item" id="subtotal">
                ${product.price * product.quantity}
            </div>
            <div class="modal_product-item modal_product-item-small">
                <button class="modal_button modal_button--delete" onclick=removeFromCart(${product.id}) data-product-id="${product.id}">-</button>
                <button class="modal_button modal_button--add" onclick=addToCart(${product.id}) data-product-id="${product.id}">+</button>
            </div>
        `
        modalProducts.appendChild(div);
    })
    modalCounter.innerText = cart.reduce((total, product) => total + product.quantity, 0);        // SE ACTUALIZA EL CONTADOR LUEGO DE AGREGAR EL PRODUCTO        
    totalPrice.innerText = cart.reduce((accumulative, product) => accumulative + (product.price * product.quantity), 0);     // SE ACTUALIZA EL PRECIO TOTAL DE LOS PRODUCTOS
    refreshModalTitle();                        // SE ACTUALIZA EL TITULO
    saveCart();                                 // SE GUARDA LOS CAMBIOS EN EL LOCALSTORAGE
};

// BOTON DE VACIAR CARRITO
const modalEmptyButton = document.getElementById('modalEmptyButton');
modalEmptyButton.addEventListener('click', () => {
    cart = [];
    refreshCart();
    saveCart()
    stockProducts.forEach(product => product.quantity = 0);
});

// PRECIO TOTAL DEL CARRITO
const totalPrice = document.getElementById('totalPrice');

// Actualización del titulo del modal
const refreshModalTitle = () => {
    (cart.length === 0) ?   modalTitle.innerText = 'Aún no has agregado ningún producto al carrito' :
                            modalTitle.innerText = 'Tu carrito';
};

// CARGA DE LOS PRODUCTOS AL INICIAR LA PAGINA
document.addEventListener('DOMContentLoaded', () => {
    cart = loadCart();
    refreshCart();
});

// CARGA LAS CARDS PARA LA PAGINA INICIO AUTOMATICAMENTE
ajaxInit('inicio.html');