(async function load() {
  async function getData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  const BASE_API = "https://yts.mx/api/v2/";
  const $actionContainer = document.getElementById("action");
  const $dramaContainer = document.getElementById("drama");
  const $animationContainer = document.getElementById("animation");

  const $featuringContainer = document.getElementById("featuring");
  const $form = document.getElementById("form");
  const $home = document.getElementById("home");

  function setAttributes($element, attributes) {
    for (const attribute in attributes) {
      $element.setAttribute(attribute, attributes[attribute]);
    }
  }

  function featuringTemplete(peli) {
    return `
      <div class="featuring">
      <div class="featuring-image">
        <img src="${peli.medium_cover_image}" width="70" height="100" alt="">
      </div>
      <div class="featuring-content">
        <p class="featuring-title">Pelicula encontrada</p>
        <p class="featuring-album">${peli.title}</p>
      </div>
    </div>
    `;
  }

  $form.addEventListener("submit", async (event) => {
    event.preventDefault(); //evitar recargar la pagina al ejecutarse el evento
    $home.classList.add("search-active");
    /* crear un elemento html desde cero */
    const $loader = document.createElement("img");
    setAttributes($loader, {
      src: "src/images/loader.gif",
      width: "50",
      height: "50",
    });
    $featuringContainer.append($loader);

    const data = new FormData($form);

    /* Asignacion por desestructuracion: lo que
    nos permite entrar al objeto en profundidad
    y poder sacar un dato, extraerlo y asignarselo a 
    otra variable */

    /* Tengo un objeto con un monton de cosas y necesito
    traer alguno de esos datos en especifico, cuando
    tenemos los datos de una pelicula realmente NO
    tenemos el retorno del query que es una lista de otros
    objeto por lo que creo un objeto dentro de una
    constante, es como bajar un nivel de profundidad para
    encontrar el dato que realmente necesito. */
    const {
      data: { movies: pelis },
    } = await getData(
      `${BASE_API}list_movies.json?limit=1&query_term=${data.get("name")}`
    );
    const HTMLString = featuringTemplete(pelis[0]);
    $featuringContainer.innerHTML = HTMLString;
  });

  const actionList = await getData(`${BASE_API}list_movies.json?genre=action`);
  const dramaList = await getData(`${BASE_API}list_movies.json?genre=drama`);
  const animationList = await getData(
    `${BASE_API}list_movies.json?genre=animation`
  );
  //console.log(actionList, dramaList, animationList);

  function videoItemTemplete(movie) {
    return `
      <div class="primaryPlaylistItem">
      <div class="primaryPlaylistItem-image ">
        <img src="${movie.medium_cover_image}">
      </div>
      <h4 class="primaryPlaylistItem-title">
      ${movie.title}
      </h4>
    </div> 
    `;
  }

  function createTemplate(HTMLString) {
    const html = document.implementation.createHTMLDocument();
    html.body.innerHTML = HTMLString;
    return html.body.children[0];
  }

  function addEventClick($element) {
    $element.addEventListener("click", function () {
      showModal();
    });
  }

  function renderMovieList(list, $container) {
    //  actionList.data.movies.forEach((movie) => {
    $container.children[0].remove();
    list.forEach((movie) => {
      const HTMLString = videoItemTemplete(movie);
      const movieElement = createTemplate(HTMLString);
      $container.append(movieElement);
      addEventClick(movieElement);
    });
  }
  const $overlay = document.getElementById("overlay");
  const $hideModal = document.getElementById("hide-modal");
  const $modal = document.getElementById("modal");

  const $modalTitle = $modal.querySelector("h1");
  const $modalImage = $modal.querySelector("img");
  const $modalDescription = $modal.querySelector("p");

  function showModal() {
    $overlay.classList.add("active");
    $modal.style.animation = "modalIn .8s forwards";
  }
  $hideModal.addEventListener("click", hideModal);

  function hideModal() {
    $overlay.classList.remove("active");
    $modal.style.animation = "modalOut .8s forwards";
  }
  renderMovieList(actionList.data.movies, $actionContainer);
  renderMovieList(dramaList.data.movies, $dramaContainer);
  renderMovieList(animationList.data.movies, $animationContainer);
})();
