import express from 'express';
import routerProducts from './router/products.js';
import DBMongoDB from './model/DBMongoDB.js';
import config from './config.js';

const app = express();

app.use(express.static('public', { extensions: ['html', 'htm'] }));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Caso de uso Products
app.use('/api/products', routerProducts);
// Caso de uso contactForm
app.use('/contact', (req,res) => {
    res.redirect('/');
});
// Casos de 404
app.use('*', (req,res) => {
    res.sendFile('public/views/404.html', { root: '.' })
});

const PORT = config.PORT;
const server = app.listen(PORT, () => console.log(`Servidor Express escuchando en el puerto ${PORT}.`));
server.on('error', error => console.log('Error al iniciar el servidor Express: ' + error.message));

DBMongoDB.connectDB();