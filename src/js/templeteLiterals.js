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

  /* Template Literals*/
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

  actionList.data.movies.forEach((movie) => {
    const HTMLString = videoItemTemplete(movie);
    console.log(HTMLString);
  });

  const $actionContainer = document.getElementById("action");
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
