var global_color = '';
var global_id = 0;
var answers = {
    "color1" : [0, [0,7]],
    "color2" : [0, [12, 16]],
    "color3" : [0, [17,17]],
    "color4" : [1, [12,17]],
    "color5" : [2, [3,11]],
    "color6" : [3, [1,9]],
    "color7" : [4, [8,17]]
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
function generateSelectorForCorrectAnswer(arr){
    var selector = '';
    for ( var i = arr[1][0]; i <= arr[1][1]; i++ ) {
        selector = selector
            +' #'+arr[0].toString()+i.toString()+'word,'
            +' #'+arr[0].toString()+i.toString()+'whitespace,';
    }
    return $(selector.slice(0,-1));
}

function check(){
    var selector = generateSelectorForCorrectAnswer( answers[global_id] );
    $(selector.slice(0,-1)).css("box-shadow", "0 7px 0 0 "+darkenColor(global_color));
}

function cancel(){
    $.each( $('span.selected'+global_id), function(index, value){
        $( value ).removeClass().removeAttr('style');
    } );

    var selector = generateSelectorForCorrectAnswer( answers[global_id] );
    $.each( $(selector.slice(0,-1)), function(index, value){
        $( value ).removeAttr('style');
    } );

}

function setColor(id){
    global_color = $('#'+id).css('backgroundColor');
    global_id = id;

    $('.button.selected')
    .removeClass('selected')
    $('#'+id).addClass("selected")
}

function darkenColor(color){
    var arr = color.split(',');
    var new_color = 'rgb('
    $.each(arr, function(i, value){
        var darkerValue = ( parseInt( value.replace (/[^0-9]/g, '') ) - 50);
        if(darkerValue < 0){darkerValue = 0;}
        new_color = new_color + darkerValue.toString() + ',';
    })
    new_color = new_color.slice(0,-1) + ')';
    return new_color;
}