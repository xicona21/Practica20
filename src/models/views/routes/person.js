// Importamos la librería Express
const express = require("express");

// Creamos una instancia del enrutador de Express
const router = express.Router();

// Importamos la librería Mongoose para conectarnos a MongoDB
const mongoose = require("mongoose");

// Importamos el modelo 'Person' para interactuar con la base de datos
let Person = require('../models/persons');

// Manejador de la ruta GET '/gente'
router.get('/gente',async (req,res)=>{
    // Buscamos todos los documentos en la colección 'Person'
    const Persons = await Person.find({});
    
    // Enviamos los documentos en formato EJS
    res.render('persons.ejs',{Persons});
})

// Manejador de la ruta GET '/addPerson'
router.get('/addPerson',(req,res)=>{
    // Renderizamos la vista 'addPerson'
    res.render(('addPerson'));
});

// Manejador de la ruta POST '/addPerson'
router.post('/addPerson',(req,res)=>{
    // Creamos un nuevo documento 'Person' con los datos enviados en el cuerpo de la solicitud
    const newPerson = Person({
        nombre: req.body.nombre,
        edad:req.body.edad,
        tipoSangre:req.body.tipoSangre,
        nss: req.body.nss
    });

    // Guardamos el documento en la base de datos
    newPerson
    .save()
    .then((data)=>{res.redirect('/gente')})
    .catch((error)=>{res.json({message:error})})
})

// Exportamos el enrutador para que pueda ser utilizado en otras partes de la aplicación
module.exports = router;