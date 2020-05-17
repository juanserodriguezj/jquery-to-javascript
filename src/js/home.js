const API = "https://yts.mx/api/v2/";

(async function load() {
  async function getData(url) {
    const response = await fetch(url);
    const data = await response.json();
    if (data.data.movie_count > 0) {
      return data;
    } else {
      throw new Error("No se encontró ningún resultado");
    }
  }

  //guardamos el variables la ubicacion de los contenedores
  const $actionContainer = document.querySelector("#action");
  const $dramaContainer = document.querySelector("#drama");
  const $animationContainer = document.querySelector("#animation");
  const $featuringContainer = document.getElementById("featuring");
  //generamos el listener para el form de busqueda
  const $form = document.getElementById("form");
  const $home = document.getElementById("home");
  const $modal = document.getElementById("modal");
  const $overlay = document.getElementById("overlay");
  const $hideModal = document.getElementById("hide-modal");
  const $modalTitle = $modal.querySelector("h1");
  const $modalImage = $modal.querySelector("img");
  const $modalDescription = $modal.querySelector("p");

  //funcion para cargar multiples atributos a un elemento html
  function setAttributes(element, attributes) {
    //generamos un for para iterar cada elemento dentro de los atributos
    for (let attribute in attributes) {
      element.setAttribute(attribute, attributes[attribute]);
    }
  }
  //funcion para agregar los datos de la pelicula buscada a un template html
  function featuringTemplate(infoPeli) {
    return `<div class="featuring">
    <div class="featuring-image">
      <img src="${infoPeli.medium_cover_image}" width="70" height="100" alt="">
    </div>
    <div class="featuring-content">
      <p class="featuring-title">Pelicula encontrada</p>
      <p class="featuring-album">${infoPeli.title}</p>
    </div>
  </div>
    
    `;
  }

  function createTemplate(HTMLString) {
    const html = document.implementation.createHTMLDocument();
    html.body.innerHTML = HTMLString;
    return html.body.children[0];
  }
  //funcion para escuchar el evento click del usuario en las peliculas, y enviar la info al modal
  function addEventClick(element) {
    element.addEventListener("click", () => {
      //enviamos el elemento al modal
      showModal(element);
    });
  }

  //esta funcion recibe la ubicacion del array a iterar, y el container para imprimir el HTML
  function insertDataIntoHTML(arrayString, container, category) {
    //borramos el icono de loading
    container.children[0].remove();
    //iteramos el array de resultados
    arrayString.forEach((movie) => {
      //generamos el texto html
      const HTMLString = videoItemTemplate(movie, category);
      /*agregamos el texto html al container*/
      const movieElement = createTemplate(HTMLString);
      container.append(movieElement);
      //agregamos un efeecto fadeIn
      const movieImage = movieElement.querySelector("img");
      movieImage.addEventListener("load", (event) => {
        event.target.classList.add("fadeIn");
      });

      //generamos un listener para el click del usuario
      addEventClick(movieElement);
    });
  }

  function findByMovie(list, id) {
    return list.find((movie) => movie.id === parseInt(id, 10));
  }

  function findMovie(id, category) {
    switch (category) {
      case "action":
        return findByMovie(actionList, id);
      case "drama":
        return findByMovie(dramaList, id);
      default:
        return findByMovie(animationList, id);
    }
  }
  //funcion para mostrar el modal con la info de las peliculas
  function showModal($element) {
    //agregamos el overlay
    $overlay.classList.add("active");
    //animacion para el modal
    $modal.style.animation = "modalIn .8s forwards";
    //tenemos que buscar la pelicula, a traves de un elemento html que recibimos por parametro
    const id = $element.dataset.id;
    const category = $element.dataset.category;
    //funcion para buscar la pelicula
    const data = findMovie(id, category);
    //reemplazamos la data en el modal
    $modalTitle.textContent = data.title;
    $modalImage.setAttribute("src", data.medium_cover_image);
    $modalDescription.textContent = data.description_full;
  }
  //funcion para ocultar el modal con la info de las peliculas
  function hideModal() {
    //agregamos el overlay
    $overlay.classList.remove("active");
    //animacion para el modal
    $modal.style.animation = "modalOut .8s forwards";
  }
  //generador de template HTML con la info
  function videoItemTemplate(movie, category) {
    return ` <div class="primaryPlaylistItem" data-id=${movie.id} data-category=${category}>
  <div class="primaryPlaylistItem-image ">
    <img src="${movie.medium_cover_image}">
  </div>
  <h4 class="primaryPlaylistItem-title">
    ${movie.title}
  </h4>
</div>  `;
  }

  $form.addEventListener("submit", async (event) => {
    //evitemos que se recargue la pagina en cada busqueda
    event.preventDefault();
    //agregamos la clase para mostrar el resultado
    $home.classList.add("search-active");
    //creamos un nuevo elemento html para el loader
    const $loader = document.createElement("img");
    //pasamos los elementos que vamos a agregar
    setAttributes($loader, {
      src: "src/images/loader.gif",
      heigth: 50,
      width: 50,
    });
    $featuringContainer.append($loader);
    /* guardamos en formData un objeto con la info de nuestro form */
    const formData = new FormData($form);
    try {
      /* guardamos la info del parametro name del form para buscar  */
      const {
        //desestructuramos la variable para guardar solo la info que hay en el array movies dentro de data
        data: { movies },
      } = await getData(
        `${API}list_movies.json?limit=1&query_term=${formData.get("name")}`
      );
      /* generamos un htmlString para insertar */
      const HTMLString = featuringTemplate(movies[0]);
      $featuringContainer.innerHTML = HTMLString;
    } catch (error) {
      //mostamos el error
      alert(error.message);
      //quitamos el gif de loader
      $loader.remove();
      //quitamos el div donde se muestran los resultados
      $home.classList.remove("search-active");
    }
  });
  //escuchamos el evento click del modal para cerrarlo
  $hideModal.addEventListener("click", hideModal);
  //funcion para chequear el localStorage
  async function cacheExists(category) {
    //creamos una funcion para guardar lo que tengamos en el localStorage
    const cacheList = window.localStorage.getItem(`${category}List`);
    //chequeamos si cacheList no es null
    if (cacheList) {
      return JSON.parse(cacheList);
    } else {
      const {
        data: { movies },
      } = await getData(`${API}list_movies.json?genre=${category}`);
      window.localStorage.setItem(`${category}List`, JSON.stringify(movies));
      return movies;
    }
  }
  //llamamos a la API y traemos la info, imprimimos la info en el HTML
  const actionList = await cacheExists("action");
  insertDataIntoHTML(actionList, $actionContainer, "action");
  const dramaList = await cacheExists("drama");
  insertDataIntoHTML(dramaList, $dramaContainer, "drama");
  const animationList = await cacheExists("animation");
  insertDataIntoHTML(animationList, $animationContainer, "animation");
})();
