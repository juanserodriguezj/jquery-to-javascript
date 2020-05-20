/* Variables, */ // ↑ ↓
var x; // casi no se usa
let usuario = "@sebastian"; // puede cambiar su valor en un futuro
const NOMBRE = "Sebastian"; //no puede cambiar su valor en un futuro
/* Funciones, piesas de codigo que podemos reutilizar */
function cambiarUsuario(nuevoUsuario) {
  usuario = nuevoUsuario;
}
/* ---------------------------------------------- */
/* Promesas, sirven para manejar nuestro codigo asincrono, cosas que pueden ocurrir en un segundo o en dos horas */
/* las promesas se crean con new Promise()
se pueden guardar en una constante 
reciben como argumento una funcion
esta nueva funcion recibe otros dos paramentros
que tambien pueden ser funciones*/
const getUser = new Promise(function (todoFuncionaBien, todoFuncionaMal) {
  /* los paramentros son funciones que podemos lanzar en algun momento 
  ejecutar alguna funcion que esta como parametro dependera de un condicional 
  de algo que ocurra, de si mi request a mi API funciona correctamente o no.*/
  // todoFuncionaBien(); //ejecucion sencilla de la funcion.
  /* Para hacer un comportamiento mas real hacemos la llamada a una api
  donde vamos a simular un tiempo de delay o retraso usamos funciones
  que se va a ejecutar despues de un tiempo*/

  /* Esta funcion recibe 2 paramentros, el primero es una funcion y el segundo es
  un tiempo en milisegundos que demorara la ejecucion de la funcion  */
  setTimeout(function () {
    todoFuncionaBien();
  }, 3000);
  /* Tambien podemos llamar la funcion todofuncionaMal cuando pasen esos 
  3000 milisegundos y lo que se imprimira va a ser
  lo que ocurra en la seccion .catch de la promesa. */
});
/* Las promesas ahora nos dan metodos para ejecutar segun si todo funcion bien o no
.then es el metodo para ejecutar si todo sale bien,
y que va a ejecuatar si todo esta bien pues una funcion. */
getUser
  .then(function () {
    console.log("Todo esta bien ");
  })
  /* Para mandar una retroalimentacion de algun error ocurrido
usamos el metodo .catch cuando nuestra promesa se rechaza o falla*/
  .catch(function () {
    console.log("Todo fallo :( ");
  });

/* 
  setTimeout(function () {
    // Podemos personalizar el mensaje para el usuario
    agregandolo aca ↓
    todoFuncionaBien("Todo esta bien ");
  }, 3000);
   // Ese mensaje seria un parametro para el metodo, lo nombramos como message
   // lo imprimimos
  getUser
  .then(function (message) {
    console.log(message);
  })

  .catch(function () {
    console.log("Todo fallo :( ");
  });
  */

/*  */
