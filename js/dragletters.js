$(function() {
  $( ".draggable" ).draggable({
    revert: function(event, ui){
      console.log( $(this).attr("type")+' to '+event.attr("type") );
      return !( $(this).attr("type") === event.attr("type") );
    }
  });

  $( ".droppable" ).droppable({
    activeClass: "ui-state-default",
    hoverClass: "ui-state-hover",
    drop: function( event, ui ) {
      $( this )
        .addClass( "ui-state-highlight" )
        .find( "p" )
          .html( "Dropped!" );
      // console.log( $(this).attr("type") + ' ---- ' + ui.draggable.attr("type"));
      if( $(this).attr("type") ===  ui.draggable.attr("type")) {
        $( '#results #' + ui.draggable.attr("id")).removeClass("invisible");
        ui.draggable.remove();
        $(".from").children().first().removeClass("hidden");
        $(".from").children().first().animate({"opacity": "0", "left": "-3em"}, 0, function() {
          $(".from").children().first().animate({"opacity": "1", "left": "0"}, 500)
        });
      }
    }
  });
});