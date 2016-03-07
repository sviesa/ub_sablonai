$(function() {
  $( ".connectedSortable" ).sortable({
    connectWith: ".connectedSortable"
  }).disableSelection();

  $( ".to" ).on( "sortreceive", function(event, ui) {
    if( !( $(this).attr("type") ===  ui.item.attr("type")) ){
      // alert("kad ne");
      $(ui.sender).sortable('cancel');
      $(this).animate({"background-color": "red"}, 200, function() {
        $(this).animate({"background-color": "#e2e2e2"})
      });
    }
    else if($(this).children().length > 4){
      $(ui.sender).sortable('cancel');
    }
    else{
      ui.item.find('a.title').removeClass("hidden");
      $(".from").children().first().removeClass("hidden");
      $(".from").children().first().animate({"opacity": "0", "left": "-3em"}, 0, function() {
        $(".from").children().first().animate({"opacity": "1", "left": "0"}, 500)
      });
    }
  });

});