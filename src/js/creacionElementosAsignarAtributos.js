(async function load() {
  async function getData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  const $actionContainer = document.getElementById("action");
  const $dramaContainer = document.getElementById("drama");
  const $animationContainer = document.getElementById("animation");

  const $featuringContainer = document.getElementById("featuring");
  const $form = document.getElementById("form");
  const $home = document.getElementById("home");

  /* Vamos a crear un elemento HTML sin usar un template
  string. Para crear el elemento desde cero vamos a
  usar el método document.createElement, este recibe
  como parámetro la etiqueta html del elemento que se
  quiere crear, no funciona mandándole el template
  string. Para añadirle un atributo al elemento que
  acabamos de crear haremos uso del método
  setAttribute. Este recibe dos parámetros,
  uno indicando el nombre del atributo que vamos a
  añadir y el segundo parámetro indicando el valor
  de dicho atributo. Vamos a crear una función para
  poder añadir múltiples atributos a un solo elemento. */

  function setAttributes($element, attributes) {
    for (const attribute in attributes) {
      $element.setAttribute(attribute, attributes[attribute]);
    }
  }

  $form.addEventListener("submit", function (event) {
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
  });

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
