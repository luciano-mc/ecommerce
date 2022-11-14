(async () => {
    const textForCompile = document.getElementById('inicioHbs').innerHTML;
    const template = Handlebars.compile(textForCompile);

    // Fetch a los productos en local
    // const JSONResponse = await fetch('../../products.json').then(response => response.json());

    // Fetch a los productos en base de datos
    const JSONResponse = await fetch('/api/products/', { method: 'get' }).then(r => r.json());
    
    const productsCollection = {
        products: JSONResponse
    }
    
    const compiledHTML = template(productsCollection);
    document.querySelector('.cards-container').innerHTML = compiledHTML;
})();