//1. Crear un servidor con Express en el puerto 3000.
// Paso 1.1 Importar express
const express = require("express");

// Paso 1.2 Instanciar express
const app = express();

// Paso 1.3 Levantar el servidor en el puerto 3000
app.listen(3000, () => {
    console.log("Servidor Express escuchando en el puerto 3000");
});

//2. Definir la carpeta “assets” como carpeta pública del servidor. 
// Definicion carpeta publica con un middleware de uso publico
app.use(express.static("assets"));

//3. Crear en el servidor un arreglo de nombres y devolverlo en formato JSON a través de
//la ruta /abracadabra/usuarios.
// Paso 3.1 Creacion arreglo de nombres
const usuarios =
    [
        "Juan",
        "Jocelyn",
        "Astrid",
        "Maria",
        "Ignacia",
        "Javier",
        "Brian"
    ];

// Paso 3.2 Devolverlo en formato JSON a través de la ruta /abracadabra/usuarios.
app.get("/abracadabra/usuarios", (req, res) => {
    res.json({ usuarios });
});

// 4. Crear un middleware con la ruta /abracadabra/juego/:usuario para validar que el
// usuario recibido como parámetro “usuario” existe en el arreglo de nombres creado en
// el servidor. En caso de ser exitoso, permitir el paso a la ruta GET correspondiente,
// de lo contrario devolver la imagen “who.jpeg”.
// Paso 4.1 Middleware con la ruta, para validar que el usuario exista en el arreglo
app.use("/abracadabra/juego/:usuario", (req, res, next) => {
    usuarios.includes(req.params.usuario) ? next() : res.redirect("/who.jpeg");
});

// Paso 4.2 Creacion de la ruta del juego, a la cual se ingresara si el nombre del usuario
// existe en el arreglo y pasa la validacion.
app.get("/abracadabra/juego/:usuario", (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

// 5. Crear una ruta /abracadabra/conejo/:n que valide si el parámetro “n” coincide con el
// número generado de forma aleatoria.
// En caso de ser exitoso, devolver la imagen del conejo, de lo contrario devolver la
// imagen de Voldemort.
// Paso 5.1 Creacion ruta solicitada y validacion
app.get("/abracadabra/conejo/:n", (req, res) => {
    // Capturar el valor del parametro n en una variable y lo transformamos a numero
    const numUsuario = Number(req.params.n);
    // Mostramos por consola el valor
    console.log("Valor de sombrero/numero escogido por el usuario: ", numUsuario);
    // Creamos la variable para obtener nuestro numero aleatorio del 1 al 4 
    const nrandom = Math.floor(Math.random() * (5 - 1)) + 1;
    // Mostramos por consola el valor
    console.log("Valor de numero random: ", nrandom);
    // Creamos la validacion con un operador ternario
    numUsuario === nrandom
        ? res.redirect("/conejito.jpg")
        : res.redirect("/voldemort.jpg");
});

// 6. Crear una ruta genérica que devuelva un mensaje diciendo “Esta página no existe...” al
// consultar una ruta que no esté definida en el servidor.
// Paso 6.1 Creacion de la ruta generica
app.get("*", (req, res) => {
    res.send("Esta página no existe...");
});