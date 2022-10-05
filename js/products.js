(() => {
    const textForCompile = document.getElementById('inicioHbs').innerHTML;
    const template = Handlebars.compile(textForCompile);
    const products = {
        onMain: [
            {id: 1, image: 'img/products/bob.png', name: 'Bob Esponja', description: {short: 'Este es bob', large: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis, error.'}, price: 10000, quantity: 0, label: {value: 'new', text:"Nuevo"}},
            {id: 2, image: 'img/products/oso.png', name: 'Teddy Bear', description: {short: 'Este es un oso', large: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis, error.'}, price: 12000, quantity: 0, label: {value: false, text: ''}},
            {id: 3, image: 'img/products/rex.png', name: 'Rex Dinosaur', description: {short: 'Este es Rex', large: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis, error.'}, price: 15000, quantity: 0, label: {value: 'highlight', text: 'Destacado'}},
            {id: 4, image: 'img/products/shrek.png', name: 'Shrek', description: {short: 'Este es bob', large: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis, error.'}, price: 20000, quantity: 0, label: {value: false, text: ''}},
            {id: 5, image: 'img/products/superman.png', name: 'Superman', description: {short: 'Este es Superman', large: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis, error.'}, price: 13600, quantity: 0, label: {value: false, text: ''}},
            {id: 6, image: 'img/products/sharks.png', name: 'Muñecos Sharks', description: {short: 'Estos son los Sharks', large: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis, error.'}, price: 11000, quantity: 0, label: {value: false, text: ''}},
            {id: 7, image: 'img/products/dog.png', name: 'Dog Toy', description: {short: 'Este es Dog', large: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis, error.'}, price: 9000, quantity: 0, label: {value: false, text: ''}}
        ]
    };
    const compiledHTML = template(products);
    document.querySelector('.cards-container').innerHTML = compiledHTML;
})();