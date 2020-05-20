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
  //console.log(actionList, dramaList, animationList);

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

  /* Las funciones son porciones de codigo que vamos
  a poder reutilizar a lo largo de nuestra aplicacion
  es bueno que sepamos utilizar funciones y ponerlas lo
  mas especificas posible. Vamos a empezar a delegar
  responsabilidades*/

  function createTemplate(HTMLString) {
    const html = document.implementation.createHTMLDocument();
    html.body.innerHTML = HTMLString;
    return html.body.children[0];
  }
  /* Estamos iterando en una lista de peliculas y lugeo 
estamos creando un templete de una pelicula , creamos
una funcion solo para el templete.
 */

  function renderMovieList(list, $container) {
    //  actionList.data.movies.forEach((movie) => {
    $container.children[0].remove();
    list.forEach((movie) => {
      const HTMLString = videoItemTemplete(movie);
      const movieElement = createTemplate(HTMLString);

      $container.append(movieElement);
    });
  }

  const $actionContainer = document.getElementById("action");
  const $dramaContainer = document.getElementById("drama");
  const $animationContainer = document.getElementById("animation");
  /* Invocar renderMovieList para mandarlo los parametros
de la lista y el container */
  renderMovieList(actionList.data.movies, $actionContainer);
  renderMovieList(dramaList.data.movies, $dramaContainer);
  renderMovieList(animationList.data.movies, $animationContainer);

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
