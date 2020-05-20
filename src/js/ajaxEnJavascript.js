/* Una de las caracteriasticas mas solicitadas 
en una aplicacion dinamica en Javascript es pedir
nuevos datos a un servidor, a lo cual denomianmos API
Para hacer esto se usa AJAX, vamos a aprender hacerlo
en Javascript Vanilla. */

/* XMLHttpRequest funciona con jquery pero 
JS Vanilla tiene una funcion mas adeacuada para
traer datos de un servidor llamada fetch.
fetch recibe dos parametros, el primero es una URL
y el segundo es una configuracion.*/
fetch("https://randomuser.me/api/")
  /* Dentro de fetch podemos ver que pasa en success
y en su error*/
  .then(function (response) {
    /*Fetch devuelve una promesa, por lo que tenemos nuestro 
metodo .then que tiene como parametros una funcion 
con un parametro con los datos de respuesta que nosotros
llamamos response.  */
    return response.json();
    /* nuestra respuesta tiene un metodo que se llama
    json y la podemos devolver. */
  })
  /* Lo bueno de las promesas es que pueden ser encadenadas
  por lo que la siguiente va a reaccionar cuando se 
  acabe de resolver la promesa del json. */
  .then(function (user) {
    /*A su vez va a tener como paramentro una funcion
    y aca si me va a traer los datos de mi usuario */
    console.log("user", user.results[0].name.first);
  })
  /* Como toda promesa tiene una respuesta para cuando
  todo falla, el catch se encarga de validar y retroalimentar
  ese caso*/
  .catch(function () {
    console.log("algo fallo");
  });
/* Caso de exito ↑, aca la respuesta la da el .then*/

/* Caso de fallo ↓,  aca la respuesta la da el .catch*/
fetch("https://randomuser.me/api/asd")
  .then(function (response) {
    //console.log(response);
    return response.json();
  })
  .then(function (user) {
    console.log("user", user.results[0].name.first);
  })
  .catch(function () {
    console.log(" caso de fallo, algo salio mal");
  });
