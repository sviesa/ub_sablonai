$(function() {
  $( ".draggable" ).draggable({
    revert: function(event, ui){
      if( event ){ return !( $(this).attr("type") === event.attr("type") ); }
      else{ return true }
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
      if( $(this).attr("type") ===  ui.draggable.attr("type")){
        ui.draggable.remove();

        $('.droppable[type="'+$(this).attr("type")+'"] > .answer').fadeIn( 0 );
        $('.droppable[type="'+$(this).attr("type")+'"] > .answer').text(ui.draggable.attr("data-word"));
        $('.droppable[type="'+$(this).attr("type")+'"] > .answer').delay( 2000 ).fadeOut( 500 );

        $( '#results #' + ui.draggable.attr("id")).animate({"opacity": "1"}, 500);
        $(".from").children().first().removeClass("hidden");
        $(".from").children().first().animate({"opacity": "0", "left": "-3em"}, 0, function() {
          $(".from").children().first().animate({"opacity": "1", "left": "0"}, 500);
        });
        if( $(".from").children().first().length === 0 ){
          $( '#animated-message' ).animate({"opacity": "1", "size" : "200%"}, 1000);
        }
      }
    }
  });
});