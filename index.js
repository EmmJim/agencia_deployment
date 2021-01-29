// const express = require('express');  //Sintaxis de CommonJS
import express from 'express'; //Imports y Exports
import router from './routes/index.js';
import db from './config/db.js';
import dotenv from 'dotenv';
dotenv.config({path:"variables.env"});


const app = express();

//Conectar la base de datos
db.authenticate()
    .then(()=> console.log('Base de Datos Conectada'))
    .catch(error => console.log(error));

//Definir el puerto
const port = process.env.PORT || 4000; 

//Habilitar PUG
app.set('view engine', 'pug');

// Obtener el año actual
app.use((req, res, next)=>{
    const year = new Date();

    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = 'Agencia de Viajes';

    next(); //Obligamos a que se vaya al siguiente middleware
})

//Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));


//Definir la carpeta publica
app.use(express.static('public'));

//Agregar Router
app.use('/', router);

//Puerto y Host para la app
const host = process.env.HOST;

app.listen(port, host, () =>{
    console.log(`El Servidor esta funcionando en el puerto ${port}`);
})