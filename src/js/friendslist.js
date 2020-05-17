//guardamos la URL de la API donde vamos a buscar los datos
const friendsAPI = 'https://rickandmortyapi.com/api/';
//guardamos en variable los contenedores de contactos
const $contactContainer = document.querySelector('.playlistFriends');
const $playlistContainer = document.querySelector('.myPlaylist');
//function contenedora
(async function load(){

async function getData(url) {
    const response = await fetch(url);
    const data = await response.json();
    if (data.info.count >0) {
        return data;
    } else {
        throw new Error('No se han encontrado contactos');
    }
}


//template para la seccion de contactos
function friendsTemplate(friend) {
    return (
        `<li class="playlistFriends-item">
         <a href="#">
        <img src="https://rickandmortyapi.com/api/character/avatar/${friend.id}.jpeg" alt="${friend.species}" />
        <span>
          ${friend.name}
        </span>
      </a>
      </li>`
    )
}
//template para la seccion de playlist
function playlistTemplate(item) {
    return (
        `<li class="myPlaylist-item">
        <a href="#">
          <span>
            ${item.episode}: ${item.name}
          </span>
        </a>
      </li>`
    )
}
function createTemplate(HTMLString) {
    const html = 
    document.implementation.createHTMLDocument();
    html.body.innerHTML = HTMLString;
    return html.body.children[0];
    
  }
//funcion para insertar el arrayFriends en la seccion de contactos
function insertHTML(array,template,container) {
  //iteramos el array de resultados
  array.forEach((item)=> {
    //generamos el template html
    const HTMLString = template(item);
    //convertimos a HTML el string
    const itemElement = createTemplate(HTMLString);
    container.append(itemElement);

})
}
//Traemos la lista de amigos desde la API
const friendsData = await getData(`${friendsAPI}character/`);
//guardamos los datos
const arrayFriends = []
friendsData.results.forEach(character => {
    arrayFriends.push(character);
}
);
//insertamos los datos del array en el HTML
insertHTML(arrayFriends,friendsTemplate,$contactContainer);
//traemos la lista de episodios desde la API
const episodesData = await getData(`${friendsAPI}episode/`);
//guardamos los datos
const arrayEpisodes = []
episodesData.results.forEach(episode => {
    arrayEpisodes.push(episode);
}
);
//insertamos los datos del array en el HTML
insertHTML(arrayEpisodes,playlistTemplate,$playlistContainer);

})();   

