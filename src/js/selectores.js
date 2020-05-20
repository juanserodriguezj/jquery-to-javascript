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

  /* Selectores, lo que estamos buscando hacer en
  este momento es hacer un selector del contenedor
  de peliculas y ponerle adentro la lista de peliculas
  que ya obtuvimos.*/

  //guardamos el variables la ubicacion de los contenedores
  /* Por convención una variable que este represente
  un objeto del DOM lleva el signo $, esto es para 
  tener claro que estamos manipulando un objeto del DOM 
  y no algún tipo de información o dato. */
  const $actionContainer = document.getElementById("action");
  const $dramaContainer = document.getElementById("drama");
  const $animationContainer = document.getElementById("animation");

  const $featuringContainer = document.getElementById("featuring");
  const $form = document.getElementById("form");
  const $home = document.getElementById("home");

  const $overlay = document.getElementById("overlay");
  const $hideModal = document.getElementById("hideModal");
  const $modal = document.getElementById("modal");
  /* Elementos dentro de mi modal */
  const $modalTitle = $modal.querySelector("h1");
  const $modalImage = $modal.querySelector("img");
  const $modalDescription = $modal.querySelector("p");
})();
