$(function() {
    $("#tabs").tabs();
});

function toggle(identificador){
  $("#" + identificador).toggle();
  var display = $("#" + identificador).css("display");
  if (display === "block") {
    $("#show" + identificador).val("Ocultar");
  } else {
    $("#show" + identificador).val("Mostrar");
  }
  
};

$( document ).ready(function() {
  up = 0;
  var jsons = ["timeline.json", "myline.json", "update.json"];
  var ids = ["#all", "#myline", "#last"];
  for (var i = 1; i < 4; i++) {
    (function (json, id, j){
      $.getJSON(json, function( data ) {
        $.each( data.items, function(key, mensaje) {
          newid = j.toString() + key;
          $( "<img>" ).attr({
            "src": mensaje.avatar,
            "align": 'left'}).appendTo(id);
          if(key == 0){
            $( "<span>" ).html(mensaje.author).appendTo(id);
          }else{
            $( "<p>" ).html(mensaje.author).appendTo(id);
          }
          $( "<h2>" ).html(mensaje.title).appendTo(id);
          $("<input>").attr({
            'type': 'button',
            'value': 'Mostrar',
            'onclick': 'toggle(' + newid + ')',
            "id": "show" + newid
          }).appendTo(id);
          $(id).append("</br></br>")
          $("<div>").attr({
            'id': newid ,
            'style': "display:none;",
          }).appendTo(id);
          $( "<p>" ).html(mensaje.date).appendTo("#" + newid );
          $( "<p>" ).html(mensaje.contenido).appendTo( "#" + newid);
          if (j === 3) {
            up = key + 1;
          }
        });
        if(up != 0){
          $( "<p>" ).html("Update("+up+")").appendTo( "#boton" );
        }
      });
    })(jsons[i - 1], ids[i - 1], i);
  }

  $("#boton").click(function(){
    $("#update").show();
    $('#boton').html("")
  });
});

