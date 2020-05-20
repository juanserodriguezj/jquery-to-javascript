/* para declarar una funcion asincrona usamos la 
palabra async seguida del nombre de la funcion 
async function cargar() {} */
/* La funcion se tiene que llamar en algun momento
para que funcione, tenemos dos opciones: la primera
es declararla y despues llamarla o envolver la funcion
entre parentesis y hacer que se auto ejecute
(async function cargar() {}) () Tenemos cargada la app*/
(async function load() {
  /* por ejemplo fetch que devuelve una promesa,
  vamos a usar una api publica para traer informacion
  de peliculas de https://yts.mx/api segun el genero*/
  //
  // fetch("https://yts.mx/api/v2/list_movies.json?genre=action");
  //
  /* gracias que mi funcion cargar es asincrona tengo
  disponible otra palabra reservada que es await que
  me ayuda a esperar las peticiones a nuestra api */

  /* Ya que tenemos una funcion asincrona podemos guardar
  en una constante lo que devuelve el fetch y que espere
  await a que se termine, entonces voy a pausar mi app
  y luego se va ejecutar lo que yo ponga en las siguiente lineas */

  //const response = await fetch("https://yts.mx/api/v2/list_movies.json?genre=action");
  //const data = await response.json();
  //console.log(data);

  /* Que tal si reutilizando conocimiento creamos
  una funcion para llamar a la API,
  traemos la informacion de las peliculas,
  y la imprimimos en el HTML
   */
  async function getData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  const actionList = await getData(
    "https://yts.mx/api/v2/list_movies.json?genre=action"
  );
  const dramaList = await getData(
    "https://yts.mx/api/v2/list_movies.json?genre=drama"
  );
  const animationList = await getData(
    "https://yts.mx/api/v2/list_movies.json?genre=animation"
  );
  console.log(actionList, dramaList, animationList);
})();
