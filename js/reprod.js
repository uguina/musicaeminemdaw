
var titulo = [];
let id=[];
var albumesTotales= [];
var album_actual= 0
var cancionesTotales = [];
let rand=false;
let loop=false;


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
          cancionesTotales = objeto_json.albumes[album_actual].canciones;
          console.log(objeto_json.albumes[album_actual]);

          for (let j = 0; j < cancionesTotales.length; j++) {
            var nombre_cancion = cancionesTotales[j].titulo;
            
            let titulo = document.createElement('h3');
            let caja = document.createElement('div');
            titulo.innerText = nombre_cancion;
            caja.appendChild(titulo);
            caja.classList.add('cajacancion');
            document.querySelector("#lista-canciones").appendChild(caja);
            titulo.addEventListener("click", () => {
            cargarCancion(cancionesTotales[j].id);
   
           });
          }
        }
        
      }
    }
  }
}

let reproductor = document.querySelector('#track');
function cargarCancion(id) {
  console.log(id);
  console.log(cancionesTotales[3].titulo);
  let titulo__cancion = cancionesTotales[id].titulo;
  let nombre__album = objeto_json.albumes[album_actual].nombreAlbum;
  let source= cancionesTotales[id].cancion;
  let playPause= document.querySelector('#play-pause');
  let play= document.querySelector('.play-btn');
  let pause= document.querySelector('.pause-btn');
  document.querySelector('.player__albumTitle').innerHTML= titulo__cancion;
  reproductor.src = "./audio/" + nombre__album +"/"+ source;
  console.log(nombre__album +"/"+ source);
  reproductor.play();
  playPause.classList.add("active");
  pause.classList.remove("hiden");
  play.classList.add("hiden");

  reproductor.addEventListener('timeupdate', function(){
    document.querySelector('#barra').value= reproductor.currentTime;
    document.querySelector('#barra').max=reproductor.duration;
  });

  reproductor.addEventListener('ended', () => {
    
    if (loop==true) {
      cargarCancion(id);
  }else{
      if(rand==true){
          var randnum = Math.floor(Math.random() * (cancionesTotales.length - 0)) + 0;
          id = randnum;
          console.log("en random es"+id);
          cargarCancion(id);
      }else{
          console.log("de normal es"+id);
          if (id == cancionesTotales.length - 1) {
            id = 0;
            cargarCancion(id);
          } else {
            cargarCancion(++id);
          }
      };
  };
  });
  document.querySelector('#next').addEventListener('click', ()=>{
    console.log("cargar siguiente");
    if(rand==true){
        var randnum = Math.floor(Math.random() * (cancionesTotales.length - 0)) + 0;
        while(id=randnum){
          randnum = Math.floor(Math.random() * (cancionesTotales.length - 0)) + 0;
        }
        id=randnum;
        console.log("en random es"+id);
        cargarCancion(id);
    }else{
        console.log("de normal es"+id);
        if(id==cancionesTotales.length-1){
            id=0;
            cargarCancion(id);
        }else{
            cargarCancion(++id);
        }
    };
  });
  document.querySelector('#prev').addEventListener('click', ()=>{
    console.log("cargar anterior");
    if(rand==true){
        var randnum = Math.floor(Math.random() * (cancionesTotales.length - 0)) + 0;
        while(id=randnum){
          var randnum = Math.floor(Math.random() * (cancionesTotales.length - 0)) + 0;
        }
        id=randnum;
        console.log("en random es"+id);
        cargarCancion(id);
    }else{
        if(id==0){
            id=cancionesTotales.length-1;
            cargarCancion(id);
        }
        else{
            cargarCancion(--id);
        }
    };
    
    
});
}

function cargar() {
  window.scrollTo(0,200);  

  document.querySelector('#play-pause').addEventListener('click', reproducir);
  document.querySelector('#rand').addEventListener('click', aleatorio);
  document.querySelector('#loop').addEventListener('click', loopear);

  document.querySelector('#volumen').addEventListener('change', function(){
    reproductor.volume = document.querySelector('#volumen').value;
    if(reproductor.volume==0){
      document.querySelector('.vol-min').classList.add('hiden');
      document.querySelector('.mute').classList.remove('hiden');
    }else{
      document.querySelector('.mute').classList.add('hiden');
      document.querySelector('.vol-min').classList.remove('hiden');
    }

    if(reproductor.volume==1 || reproductor.volume==0){
      document.querySelector('.vol-max').classList.add('hiden');
    }else{
      document.querySelector('.vol-max').classList.remove('hiden');
    }
});

  document.querySelector('#barra').addEventListener('change', function () {
    reproductor.currentTime = document.querySelector('#barra').value;

  });

}
function loopear(){
  if (loop==true) {
      loop=false;
      document.querySelector("#loop").classList.remove("active");
      
  }else{
      loop=true;
      document.querySelector("#loop").classList.add("active");
  }
  console.log(loop);
}
function aleatorio(){
  if (rand==true) {
      rand=false;
      document.querySelector("#rand").classList.remove("active");
  }else{
      rand=true;
      document.querySelector("#rand").classList.add("active");
  }
  console.log(rand);
}

//REPRODUCIR Y PAUSAR
function reproducir(){
  console.log('sonando');
  let playPause= document.querySelector('#play-pause');
  let play= document.querySelector('.play-btn');
  let pause= document.querySelector('.pause-btn');
  playPause.classList.remove("active");
  pause.classList.add("hiden");
  play.classList.remove("hiden");

  if(reproductor.paused){
    reproductor.play();
    playPause.classList.add("active");
    pause.classList.remove("hiden");
    play.classList.add("hiden");
  }else{
    console.log('pausando')
    reproductor.pause();
  }

}







