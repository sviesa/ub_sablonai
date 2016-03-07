var global_color = '';
var global_id = 0;
var answers = {
    "color1" : [0, [0,7]],
    "color2" : [0, [12, 16]],
    "color3" : [0, [17,17]],
    "color4" : [1, [13,18]],
    "color5" : [2, [4,12]],
    "color6" : [3, [1,9]],
    "color7" : [4, [9,17]]
    }
var leftButtonDown = false;
$(document).mousedown(function(e){
    // Left mouse button was pressed, set flag
    leftButtonDown = true;
});
$(document).mouseup(function(e){
    // Left mouse button was released, clear flag
    leftButtonDown = false;
});

$(document).ready( function(){
    $.each( $('.textblock'), function(i, textblock){
        var words = $(textblock).text().split(" ");
        $(textblock).empty();
        $.each(words, function (index, word) {
            $(textblock).append("<span id='"+i+index+"word'>" + word + "</span><span id='"+i+index+"whitespace'> </span>");
            $( "span#"+i+index+"word, span#"+i+index+"whitespace" ).mousemove(function( event ) {
                if(leftButtonDown){
                    document.getSelection().removeAllRanges();
                    $(this)
                    .removeClass()
                    .addClass("selected"+global_id)
                    .css( "background-color",  global_color);
                }
            });
        });
    });

})

// function check(){
//     var selected_text = '';
//     $.each( $('span.selected'+global_id), function(index, value){
//         selected_text = selected_text + $(value).text();
//     } );

//     // console.log( answers[id].replace(/ /g, '') );
//     // console.log( selected_text.replace(/ /g, '') );
//     if (answers[global_id].replace(/ /g, '') === $.trim(selected_text.replace(/ /g, '')) ){
//         alert('Teisingai');
//     }
//     else{ alert('Neteisingai');}
// }
function check(){
    var arr = answers[global_id];
    var selector = '';
    for ( var i = arr[1][0]; i <= arr[1][1]; i++ ) {
        selector = selector
            +' #'+arr[0].toString()+i.toString()+'word,'
            +' #'+arr[0].toString()+i.toString()+'whitespace,';
    }
    console.log( "4px dotted "+global_color );
    $(selector.slice(0,-1)).css("box-shadow", "0 7px 0 0"+global_color);
}
function cancel(){
    $.each( $('span.selected'+global_id), function(index, value){
        $( value ).removeClass().removeAttr('style');
    } );
}

function setColor(id){
    var color = hexc( $('#'+id).css('backgroundColor') );
    global_color = color;
    global_id = id;

    $('.button.selected')
    .removeClass('selected')
    // .children('.check, .cancel').remove()

    $('#'+id).addClass("selected")
    // .append("<div class='check' onclick='check(\""+id+"\")'>Tikrinti</div>")
    // .append("<div class='cancel' onclick='cancel(\""+id+"\")'>Atšaukti</div>");
}
function hexc(colorval) {
    var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    delete(parts[0]);
    for (var i = 1; i <= 3; ++i) {
        parts[i] = parseInt(parts[i]).toString(16);
        if (parts[i].length == 1) parts[i] = '0' + parts[i];
    }
    return ('#' + parts.join(''));
}