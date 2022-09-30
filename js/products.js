(() => {
    const textForCompile = document.getElementById('inicioHbs').innerHTML;
    const template = Handlebars.compile(textForCompile);
    const products = {
        onMain: [
            {id: 1, image: 'img/products/bob.png', name: 'Bob Esponja', description: {short: 'Este es bob', large: 'Descripcion mas larga con muchos mas caracteres'}, price: 10000, quantity: 0, label: {value: 'new', text:"Nuevo"}},
            {id: 2, image: 'img/products/oso.png', name: 'Oso Peluche', description: {short: 'Este es un oso', large: 'Descripcion mas larga con muchos mas caracteres'}, price: 12000, quantity: 0, label: {value: false, text: ''}},
            {id: 3, image: 'img/products/rex.png', name: 'Rex Dinosaur', description: {short: 'Este es Rex', large: 'Descripcion mas larga con muchos mas caracteres'}, price: 15000, quantity: 0, label: {value: 'highlight', text: 'Destacado'}},
            {id: 4, image: 'img/products/shrek.png', name: 'Shrek', description: {short: 'Este es bob', large: 'Descripcion mas larga con muchos mas caracteres'}, price: 20000, quantity: 0, label: {value: false, text: ''}},
            {id: 5, image: 'img/products/superman.png', name: 'Superman', description: {short: 'Este es Superman', large: 'Descripcion mas larga con muchos mas caracteres'}, price: 13600, quantity: 0, label: {value: false, text: ''}},
            {id: 6, image: 'img/products/sharks.png', name: 'Muñecos Sharks', description: {short: 'Estos son los Sharks', large: 'Descripcion mas larga con muchos mas caracteres'}, price: 11000, quantity: 0, label: {value: false, text: ''}},
            {id: 7, image: 'img/products/dog.png', name: 'Dog Toy', description: {short: 'Este es Dog', large: 'Descripcion mas larga con muchos mas caracteres'}, price: 9000, quantity: 0, label: {value: false, text: ''}}
        ]
    };
    const compiledHTML = template(products);
    document.querySelector('.cards-container').innerHTML = compiledHTML;
})();