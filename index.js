import express from 'express';// Agregar el type: module en el package.json
import router from './routes/index.js';
import db from './config/db.js';




// Solo debe de haber una llamada a express
const app = express();

// LOS DIFERENTES MIDLEWARES

// conectar la base de datos
db.authenticate()
  .then(() => console.log('Base de datos conectada'))
  .catch( error => console.log(error));

// Puerto en el que se ejecutará el servidor
const port = process.env.PORT || 3000;

// Habilitar PUG
app.set('view engine', 'pug');

// Obtener al año actual
/*
req - Lo que estas enviando al servidor
res - Lo que el servidor de manda a ti
next - Nos envia al siguiente midleware
*/
app.use((req, res, next)=> {
    // Se debe de utilizar res.local para usar una variable
    const fechaActual = new Date();
    res.locals.actualYear = fechaActual.getFullYear();
    
    return next();
});

// Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

// Definir la carpeta public
app.use(express.static('public'));

//Agregar roouter, nos redirecciona nuestras rutas
app.use('/', router);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});