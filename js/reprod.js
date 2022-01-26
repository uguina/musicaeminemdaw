$(document).ready(() => {
  const next = document.querySelector('.fa-forward');
  const play = document.querySelector('.play-btn');
  const pause = document.querySelector('.pause-btn');
  const previous = document.querySelector('.fa-backward');


  const song = document.querySelector('.player__audio');
  const title = [];
  var time;

  //PETICIÓN AJAX
  // var req = new XMLHttpRequest();
  // req.open('GET', 'music.json', true);
  // req.send();
  // req.onreadystatechange = function () {
  //   if (req.readyState == 4) {
  //     if (req.status == 200) {
  //       let datos = req.responseText;
  //       canciones = JSON.parse(datos);

  //       canciones.forEach(song => {

  //         let titulo = document.createElement('h3');
  //         titulo.innerText = song.titulo;
  //         document.querySelector("#lista-canciones").appendChild(titulo);

  //         titulo.addEventListener("click", () => {
  //           cargarCancion(song.id);
  //         })

  //       });
  //     }
  //   }
  //}

});




