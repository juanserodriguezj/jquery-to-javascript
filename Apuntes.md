<!-- Shift + Alt + A => comenta el codigo seleccionado -->

Tutorial de Ajax en jQuery y Javascript
Una característica muy solicitada en cualquier sitio dinámico es solicitar datos a un servidor, denominado API. Para esto normalmente se utiliza Ajax.

Ajax recibe dos parámetros los cuales son la url de la API y un objeto donde pondrás la configuración que se usara para realizar la petición. En la configuración se añaden dos funciones para manejar cuando la petición se realizo correctamente y cuando falla. Nos devolvera un objeto.

$.ajax('https://rickandmortyapi.com/api/character/2',{
method: 'GET',
success: function(data) {
  console.log(data);
},
error: function(error) {
  console.log(error);
}
});

JavaScript internamente cuenta con una función llamada fetch que también realiza peticiones a una API. Al igual que Ajax necesita dos parámetros, una url y una configuración, pero si solo le mandas la url fetch usará una configuración por defecto donde el método HTTP será GET.
fetch te regresa una promesa, esa promesa al resolverse te da los datos de respuesta y tiene un método llamado json que te regresa otra promesa con los datos en formato JSON.

/* peticion a traves de ajax por JS Vanilla */
/*fetch devuelve una promesa*/

fetch('https://rickandmortyapi.com/api/character/1')
  .then((response) => {return response.json()})
  .then((user)=> console.log(user))
  .catch((error)=> console.log(error));

Las promesas resuelven el problema del Callback Hell haciendo que una promesa pueda devolver otra promesa y en lugar de ser anidadas como los callback, estas promesas son encadenadas.

Funciones asíncronas
Una función asíncrona va a ser como una función normal, pero poniendo código asíncrono de forma que sea más fácil de leer de forma síncrona.

Para declarar una función asíncrona se usa la palabra reservada async, luego de eso declaras tu función de forma normal. Dentro de una función asíncrona cuentas con otra palabra reservada llamada await, lo que hará esta palabra es indicar que se debe esperar a que termine de ejecutarse ese fragmento de código antes de continuar.

Vamos a realizar peticiones con fetch a la API de yts para pedirle películas según su categoría y mostrarlas dentro de PlatziVideo. Sin el uso de funciones asíncronas para cada fetch tendríamos que usar los métodos then y catch, en cambio gracias a async/await solo debemos escribir la palabra await antes de cada promesa.

Selectores
Un selector nos sirve para poder manipular un objeto del DOM, puedes buscar dicho objeto ya sea por su id, clase, atributo, etc.

Para PlatziVideo necesitamos un selector de un contenedor para ponerle dentro la lista de películas.

En jQuery hacemos un selector de la siguiente forma:

const $home = $(‘ .home ’);
Por convención una variable que este represente un objeto del DOM lleva el signo $, esto es para tener claro que estamos manipulando un objeto del DOM y no algún tipo de información o dato.

Dentro de JavaScript existen distintas funciones para hacer selectores, entre ellas se encuentra:

• getElementById: recibe como parámetro el id del objeto del DOM que estás buscando. Te regresa un solo objeto.
• getElementsByTagName: recibe como parámetro el tag que estas buscando y te regresa una colección html de los elementos que tengan ese tag.
• getElementsByClassName: recibe como parámetro la clase y te regresa una colección html de los elementos que tengan esa clase.
• querySelector: va a buscar el primer elemento que coincida con el selector que le pases como parámetro.
• querySelectorAll: va a buscar todos los elementos que coincidan con el selector que le pases como parámetro.  

Creación de DOM
La plantilla que creamos la clase anterior de momento es puro texto, no es un elemento HTML que podamos poner dentro del navegador pues si los imprimimos en el navegador lo único que veremos es texto.
Vamos a insertar la plantilla dentro de nuestro container, para ello recuerda que JavaScript se lee de arriba hacia abajo entonces debemos declarar la variable del container antes de llamar a algún método de este.
Para convertir nuestra plantilla de texto a un Document Object Model necesitamos crear dentro de memoria un documento HTML, esto es posible gracias al método document.implementation.createHTMLDocument. A este documento HTML le vamos a añadir al body, mediante innerHTML, nuestra plantilla de texto. Una vez añadida le pedimos al body el primer elemento hijo que tenga y este lo añadimos a nuestro container.
Este flujo es la magia que hay detrás de varias librerías y frameworks que nos ayudan a crear interfaces.

ventos
Toda aplicación web necesita lidiar con interacciones del usuario, desde un click hasta arrastrar algún elemento, estas interacciones son escuchadas por el navegador mediante algo llamado eventos. Existen muchos tipos de eventos, el más común es el evento de click.
En esta clase vamos a trabajar con el evento click y submit.
Para que un elemento HTML pueda escuchar algún evento debemos usar el método addEventListener. Este método recibe dos parámetros, el nombre del evento que va a escuchar y la función que se va a ejecutar al momento de que se accione el evento.
La página se recarga al momento de ejecutarse el evento submit, para evitar esto debemos quitarle la acción por defecto que viene en submit usando el método event.preventDefault().

Clases y estilos CSS
En esta clase vamos a aprender a manipular las clases de CSS y estilos de nuestros elementos mediante JavaScript.
Dentro de cada elemento tenemos un método llamado classList, con este podemos ver las clases que tiene nuestro elemento y además llamar a otros métodos para añadir, borrar o hacer toggle a alguna clase.
De igual forma podemos acceder a todas las propiedades de CSS algún elemento mediante element.style.

Creación de elementos y asignación de atributos
Vamos a crear un elemento HTML sin usar un template string. Para crear el elemento desde cero vamos a usar el método document.createElement, este recibe como parámetro la etiqueta html del elemento que se quiere crear, no funciona mandándole el template string.
Para añadirle un atributo al elemento que acabamos de crear haremos uso del método setAttribute. Este recibe dos parámetros, uno indicando el nombre del atributo que vamos a añadir y el segundo parámetro indicando el valor de dicho atributo.
Vamos a crear una función para poder añadir múltiples atributos a un solo elemento.



Este es el resumen de la clase de formularios (Esta es una pequeña muestra de lo que se puede hacer new FormData en nuestros proyectos).

Podemos tomar la información que se deja en un formulario de un sitio web al fijarla cuando escribimos sobre ella. Uno de los atributos de form o un input en HTML es name, en ella guarda en memoria la información de que dejamos escrito.

<form action=""class="search" id="form">
<inputtype="text"name="name"placeholder="Buscar un artista o tema favorito"/>
</form>
Para obtener toda la información a javaScript la conseguimos creando un nuevo objeto (inf de FormData: https://developer.mozilla.org/es/docs/Web/Guide/Usando_Objetos_FormData#Creación_de_un_objeto_FormData_desde_cero)

const data = new FormData($form);
ó

const data = new FormData(document.getElementById('form'));
para obtener el dato que pusimos por parámetro en nuestro formulario es por el método get.

const informacion = data.get('name');
console.log(informacion);
	// Avengers
**Nota:**para establecer datos de un formulario en JavaScript utilizamos el método get.

const nuevaData = new FormData(document.getElementById('form') )
nuevaData.set('name','avengers')
para verla la podemos visualizar en cosola utilizado el método get ya anteriormente dicho.

data.get('name');

Desestructuración de objetos

Destructuring assignment o asignación por desestructuración nos permite introducirnos en un objeto para así extraer un dato para asignarlo a otra variable y así limpiar nuestro código.
Esto se hace usando llaves; ‘{}’ y ‘:’.

Ej. dónde podríamos aplicar esto:


// ...

  const peliculaBuscada = await getMovies(`${finder_API}${data.get('name')}`)
  $featuringContainer.innerHTML = featuringTemplate(peliculaBuscada.data.movies[0])

// ...

El objeto que nos arroja la función asíncrona del ejemplo nos obliga a entrar en el sub-objeto ‘data’ y este a la vez en ‘movies’, lo que nos hace usar esta declaración para acceder a los datos que necesitamos:

peliculaBuscada.data.movies[0]
Desestructurando la variable en la que voy a guardar el resultado de la función asíncrona que nos arroja el objeto nuestra variable se vería más limpia y el código quedaría así:


// ...
  const { 
	    data: {
	    	movies: peliculaBuscada 
	    }
	} = await getMovies(`${finder_API}${data.get('name')}`)
        $featuringContainer.innerHTML = featuringTemplate(peliculaBuscada[0])
// ...

LocalStorage
La propiedad de sólo lectura localStorage te permite acceder al objeto local Storage; los datos persisten almacenados entre de las diferentes sesiones de navegación. localStorage es similar a sessionStorage. La única diferencia es que, mientras los datos almacenados en localStorage no tienen fecha de expiración, los datos almacenados en sessionStorage son eliminados cuando finaliza la sesion de navegación - lo cual ocurre cuando se cierra la página.

Con sessionStorage los datos persisten sólo en la ventana/tab que los creó, mientras que con localStorage los datos persisten entre ventanas/tabs con el mismo origen.

Debe tenerse en cuenta que los datos almacenados tanto en localStorage como en sessionStorage son específicos del protocolo de la página.

Las claves y los valores son siempre cadenas de texto (ten en cuenta que, al igual que con los objetos, las claves de enteros se convertirán automáticamente en cadenas de texto).

https://developer.mozilla.org/es/docs/Web/API/Window/localStorage
//limpia el storage
window.localStorage.clear() 
//guardar datos
window.localStorage.setItem('nombre','Cristian')
//obtener datos
window.localStorage.getItem('nombre')
//no podemos guardar objetos en el storage, pero podemos guardarlos convertidos a texto
window.localStorage.setItem('nombre',JSON.stringify({'Apellido': 'Bonomo' }))
//y para traerlo, lo reconvertimos a objeto
JSON.parse(window.localStorage.getItem('nombre'))