$(document).ready(function(){

 //  SELECTORES
 
  // seleccionamos todos los div del documento HTML -- selección por etiqueta --
 //var miselec = $('div');
 //alert(miselec.length + ' nº divs del cocumento HTML!');

  // seleccionamos la tabla con id cantantes. -- selección por id --
 // var miselec = $('#cantantes');
  
  //el resultado es la misma seleccion que antes pero ahora lo hacemos por clase CSS
  //var miselec = $('.datos');
  //miselec.css("background-color", "green");

  // número de elementos tr dentro de la tabla con id cantantes
  var miselec = $('#cantantes tr')
 alert(miselec.length + ' nº Filas tr dentro de la tabla de cantantes!');

  // número de elementos tr dentro de la tabla con id cantantes
  // sin contar el encabezado
  /*
  var miselec = $('#cantantes tbody tr');
  alert(miselec.length + ' nº Filas tr dentro de la tabla de cantantes son contar el encabezado!');
  miselec.css("background-color", "yellow");
  */

  // Todos los span que están dentro de un elemento p que a su vez están dentros de un div. Pero además
  // dichos div deben tener como identificdos noticias.

  /*
  var miselec = $('div #noticias p span');
  miselec.css("background-color", "red");
  */


  // FILTROS

  // Selccionamos todos los párrafos y filtramos para quedarnos solo con el primero
  /*
  var miselec = $('p:first');
  miselec.css("background-color", "blue");
  */

   // Selccionamos todos los párrafos y filtramos para quedarnos solo con el último
   //var miselec = $('p:last');
   //miselec.css("background-color", "purple");

   // Seleccionamos todos los párrafos y filtramos para quedarnos con el que ocupa la posición o índice 3 de la selección 
   // Realmente es el cuarto párrafo ya que la colección devuelta comienza con índice 0.
   //var miselec = $('p:eq(3)');
   //miselec.css("background-color", "brown");

    // Seleccionamos todos los párrafos y nos quedamos con los que ocupan posición o índice par en en la selección (0, 2, 4, 6, etc.)
   // Realmente es el cuarto párrafo ya que la colección devuelta comienza con índice 0.
   //var miselec = $('p:even');
   //miselec.css("background-color", "pink");

// Selección elementos tr dentro de la tabla con id cantantes sin contar el encabezado y filtramos
// quedándonos con los que ocupan posición impar (índice 1,3,5,7, etc. de la colección)
  //var miselec = $('#cantantes tbody tr:odd');
  //alert(miselec.length + ' nº Filas tr dentro de la tabla de cantantes son contar el encabezado!');
  //miselec.css("background-color", "grey");

  // Selecciona todos los párrafos, todos los div y todos los encabezados <h1> y todas las cajas input de la página.
  //var miselec = $('p,div,h1,input');
  //miselec.css("background-color", "orange");




 











 
});