window.onload= cargarAjax;
let canciones =[];
let rand=false;
let loop=false;
function cargarAjax(){
    cargar();
    var req = new XMLHttpRequest();
    req.open('GET', 'album_alphaville.json',true);
    req.send();
    req.onreadystatechange = function(){
        if(req.readyState == 4){
            if( req.status == 200){
                let datos = req.responseText;
                canciones = JSON.parse(datos);
                console.log(canciones);

                canciones.forEach(cancion => {

                    let titulo = document.createElement('h3');
                    titulo.innerText = cancion.titulo;
                    document.querySelector("#lista-canciones").appendChild(titulo);

                    titulo.addEventListener("click", ()=>{
                        cargarCancion(cancion.id);
                    }) 

                });
            }
        }
    }
}

let reproductor = document.querySelector('#track');
function cargarCancion(id){
    document.querySelector("#pause").style.display="inline";
    document.querySelector("#play").style.display="none";
    let titulo =canciones[id]["titulo"];
    let cancion =canciones[id]["cancion"];
    console.log(titulo,cancion);
    document.querySelector('#cancion-seleccionada').innerHTML= titulo;
    reproductor.src= "./audio/"+cancion;
    reproductor.play();
    //BARRA DE PROGRESO
    reproductor.addEventListener('timeupdate', function(){
        document.querySelector('#barra').value= reproductor.currentTime;
        document.querySelector('#barra').max=reproductor.duration;
    });
    //SIGUIENTE CANCION CUANDO TERMINA UNA CANCION
    reproductor.addEventListener('ended', ()=>{
        console.log("cargando cancion nueva");
        console.log(rand);
        if (loop==true) {
            cargarCancion(id);
        }else{
            if(rand==true){
                var randnum = Math.floor(Math.random() * (canciones.length - 0)) + 0;
                id=randnum;
                console.log("en random es"+id);
                cargarCancion(id);
            }else{
                console.log("de normal es"+id);
                if(id==canciones.length-1){
                    id=0;
                    cargarCancion(id);
                }
                else{
                    cargarCancion(++id);
                }
            };
        };
        
        
        
    });
    //EVENTO Y FUNCION DE CANCION SIGUIENTE
    document.querySelector('#next').addEventListener('click', ()=>{
        console.log("cargar siguiente");
        if(rand==true){
            var randnum = Math.floor(Math.random() * (canciones.length - 0)) + 0;
            id=randnum;
            console.log("en random es"+id);
            cargarCancion(id);
        }else{
            console.log("de normal es"+id);
            if(id==canciones.length-1){
                id=0;
                cargarCancion(id);
            }
            else{
                cargarCancion(++id);
            }
        };
        
        
    });
    //EVENTO Y FUNCION DE CANCION ANTERIOR
    document.querySelector('#prev').addEventListener('click', ()=>{
        console.log("cargar anterior");
        if(rand==true){
            var randnum = Math.floor(Math.random() * (canciones.length - 0)) + 0;
            id=randnum;
            console.log("en random es"+id);
            cargarCancion(id);
        }else{
            if(id==0){
                id=canciones.length-1;
                cargarCancion(id);
            }
            else{
                cargarCancion(--id);
            }
        };
        
        
    });
}



function cargar(){
    //EVENTOS DE CLICK DE LOS BOTONES
    document.querySelector('#shuffle').addEventListener('click', aleatorio);
    document.querySelector('#play').addEventListener('click', reproducir);
    document.querySelector('#pause').addEventListener('click', pausar);
    document.querySelector('#stop').addEventListener('click', parar);
    document.querySelector('#loop').addEventListener('click', loopear);
    
//CAMBIO DE LA BARRA DE VOLUMEN EVENTO
    document.querySelector('#volumen').addEventListener('change', function(){
        reproductor.volume = document.querySelector('#volumen').value;
        console.log('cambiando...')
    });
    //CAMBIO DE BARRA DE TIEMPO EVENTO
    document.querySelector('#barra').addEventListener('change', function(){
        reproductor.currentTime = document.querySelector('#barra').value;
        console.log('cambiando...')
    });
}
//BOTON DE ALEATORIO
function aleatorio(){
    if (rand==true) {
        rand=false
        
    }else{
        rand=true
    }
    console.log(rand);
}
//BOTON DE LOOP
function loopear(){
    if (loop==true) {
        loop=false
        
    }else{
        loop=true
    }
    console.log(loop);
}
//BOTON DE PLAY FUNCION
function reproducir(){
    //IF QUE COMPURBA SI HAY ALGUNA CANCION CARGADA, EN SU DEFECTO REPRODUCE LA PRIMERA 
    //CANCION DE LA PLAYLIST
    if (document.querySelector('#cancion-seleccionada').innerHTML=="") {
        cargarCancion(0);
    }
    //FUNCION DE REPRODUCCION
    console.log('sonando');
    reproductor.play();
    document.querySelector("#pause").style.display="inline";
    document.querySelector("#play").style.display="none";
}
//BOTON DE PAUSA FUNCION
function pausar(){
    console.log('pausando');
    reproductor.pause();
    document.querySelector("#play").style.display="inline";
    document.querySelector("#pause").style.display="none";
}
//BOTON DE STOP FUNCION
function parar(){
    console.log('parando');
    reproductor.pause();
    reproductor.currentTime = 0;
    document.querySelector("#play").style.display="inline";
    document.querySelector("#pause").style.display="none";
}