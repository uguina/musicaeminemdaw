
const previous = document.querySelector('#previous');
const next = document.querySelector('#next');
const play = document.querySelector('#play').addEventListener('click', reproducir);;
const pause = document.querySelector('#pause').addEventListener('click', pausar);;
var titulo = [];
var albumesTotales= [];


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

        for (let i = 0; i < albumesTotales.length; i++) {
          let nombre_album = objeto_json.albumes[i].nombreAlbum;
          //console.log(nombre_album);

          var cancionesTotales = objeto_json.albumes[i].canciones;

          for (let j = 0; j < cancionesTotales.length; j++) {
            var nombre_cancion = cancionesTotales[j].titulo;

            let titulo = document.createElement('h3');
            titulo.innerText = nombre_cancion;
            document.querySelector("#lista-canciones").appendChild(titulo);
            
            titulo.addEventListener("click", () => {

              cargarCancion(cancionesTotales[j].id, albumesTotales[i].nombreAlbum);
   
   
           });
          }
        }

        
      }
    }
  }
}

let reproductor = document.querySelector('#track');
function cargarCancion(id,nombre_album) {
  
  // let cancion = albumesTotales['cancion'];
  console.log(id,nombre_album);

  document.querySelector('#cancion-seleccionada').innerHTML = titulo;

  // reproductor.src = "./audio/" + cancion;
  reproductor.play();

  reproductor.addEventListener('timeupdate', function () {
    document.querySelector('#barra').value = reproductor.currentTime;

    document.querySelector('#barra').max = reproductor.duration;
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




