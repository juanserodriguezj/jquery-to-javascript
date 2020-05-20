(async function load() {
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

  /* Con templete literals creamos una plantilla
  para nuestros elementos, pero no son HTML son solo
  texto, si yo los imprimiera serian muchas letras
  que no tendrian sentido. */

  function videoItemTemplete(movie) {
    return `<div class="primaryPlaylistItem">
      <div class="primaryPlaylistItem-image ">
        <img src="${movie.medium_cover_image}">
      </div>
      <h4 class="primaryPlaylistItem-title">
      ${movie.title}
      </h4>
    </div> `;
  }
  /* JAVASCRIPT se lee de arriba hacia abajo al ejecutar
el forEach antes que la declaracion de mi container
ocurrira un error por lo que las constantes deben
declararse que cualquier metodo que use la constante*/
  const $actionContainer = document.getElementById("action");
  actionList.data.movies.forEach((movie) => {
    /* Vamos a crear un DOM a partir de un HTMLString,
usando un texto que tenga la estructura HTML,
para esto voy a crear dentro de memoria de Javascript
un elemento HTML  */
    const HTMLString = videoItemTemplete(movie);
    const html = document.implementation.createHTMLDocument();
    html.body.innerHTML = HTMLString;

    $actionContainer.append(html.body.children[0]);
    /* Con tres pasos incluimos informacion de una
    api externa al navegador.
    1) convertir los datos a un elemento iterable con
    el foreach dentro de las listas.
    2) concertir esa informacion en templetes.
    3) Lo agregamos dentro del navegador.
    */
  });

  const $dramaContainer = document.getElementById("drama");
  const $animationContainer = document.getElementById("animation");

  const $featuringContainer = document.getElementById("featuring");
  const $form = document.getElementById("form");
  const $home = document.getElementById("home");

  const $overlay = document.getElementById("overlay");
  const $hideModal = document.getElementById("hideModal");
  const $modal = document.getElementById("modal");

  const $modalTitle = $modal.querySelector("h1");
  const $modalImage = $modal.querySelector("img");
  const $modalDescription = $modal.querySelector("p");
})();
