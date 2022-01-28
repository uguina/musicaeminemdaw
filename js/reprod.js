
const previous = document.querySelector('#previous');
const next = document.querySelector('#next');
const play = document.querySelector('#play').addEventListener('click', reproducir);;
const pause = document.querySelector('#pause').addEventListener('click', pausar);;
var titulo = [];
var albumesTotales= [];
var album_actual= 0


window.onload = cargarAjax;

function cargarAjax() {
  cargar();
  var req = new XMLHttpRequest();
  req.open('GET', 'music.json', true);
  req.send();
  req.onreadystatechange = function () {
    if (req.readyState == 4) {
      if (req.status == 200) {
        let datos = req.responseText;
        objeto_json = JSON.parse(datos);
        albumesTotales = objeto_json.albumes;
        document.querySelector('#disc1').addEventListener("click", () => {
          album_actual= 2;
          cargaralbum(album_actual);
          $.scrollTo(".contenedor");
        })
        document.querySelector('#disc2').addEventListener("click", () => {
          album_actual= 1;
          cargaralbum(album_actual);
          $.scrollTo(".contenedor");
        })
        document.querySelector('#disc3').addEventListener("click", () => {
          album_actual= 0;
          cargaralbum(album_actual);
          $.scrollTo(".contenedor");
        })
        document.querySelector('#disc4').addEventListener("click", () => {
          album_actual= 3;
          cargaralbum(album_actual);
          $.scrollTo(".contenedor");
        })
        
        function cargaralbum(album_actual){
          document.querySelector("#lista-canciones").innerHTML=""
          let nombre_album = objeto_json.albumes[album_actual].nombreAlbum;
          let img_album = objeto_json.albumes[album_actual].imgAlbum;
          document.querySelector('.player__song').innerHTML= nombre_album;
          document.querySelector('.player__img').src= "./img/"+ img_album;
          var cancionesTotales = objeto_json.albumes[album_actual].canciones;
          console.log(objeto_json.albumes[album_actual]);

          for (let j = 0; j < cancionesTotales.length; j++) {
            var nombre_cancion = cancionesTotales[j].titulo;
            
            let titulo = document.createElement('h2');
            let caja = document.createElement('div');
            titulo.innerText = nombre_cancion;
            caja.appendChild(titulo);
            caja.classList.add('cajacancion');
            document.querySelector("#lista-canciones").appendChild(caja);
            titulo.addEventListener("click", () => {
            cargarCancion(cancionesTotales[j].id,nombre_album,cancionesTotales[j].cancion,cancionesTotales[j].titulo);
   
           });
          }
        }
        
      }
    }
  }
}

let reproductor = document.querySelector('#track');
function cargarCancion(id,nombre__album,source,titulo__cancion) {
  document.querySelector('.player__albumTitle').innerHTML= titulo__cancion;
  reproductor.src = "./audio/" + nombre__album +"/"+ source;
  console.log(nombre__album +"/"+ source);
  reproductor.play();

  reproductor.addEventListener('timeupdate', function(){
    document.querySelector('#barra').value= reproductor.currentTime;
    document.querySelector('#barra').max=reproductor.duration;
});

  reproductor.addEventListener('ended', () => {

    if (id == canciones.length - 1) {
      id = 0;
      cargarCancion(id);
    } else {
      cargarCancion(++id);
    }

  });
}

function cargar() {

  document.querySelector('#play').addEventListener('click', reproducir);
  document.querySelector('#pause').addEventListener('click', pausar);

  document.querySelector('#barra').addEventListener('change', function () {
    reproductor.currentTime = document.querySelector('#barra').value;

  });

}

function reproducir() {
  console.log('sonando');
  reproductor.play();

}

function pausar() {
  console.log('pausando');
  reproductor.pause();
}




