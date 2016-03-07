var global_color = '';
var global_id = 0;
var answers = {
    "color1" : "Jūratė ir Motiejus kartu su mama ir tėčiu",
    "color2" : "Jie nori pamatyti Baltijos jūrą",
    "color3" : "žiemą.",
    "color4" : "jūros krantas pasidengia ledu ir sniegu,",
    "color5" : "pamatyti jūroje laivą, iš kurio mojuoja kapitonas ir jūreiviai,",
    "color6" : "Laivu galima nuplaukti iki Suomijos - Kalėdų senelio gimtinės...",
    "color7" : "apledijusį jūros krantą. Jūros pakrantėje spindėjo didžiuliai ledo kalnai.",
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

function check(){
    var selected_text = '';
    $.each( $('span.selected'+global_id), function(index, value){
        selected_text = selected_text + $(value).text();
    } );

    // console.log( answers[id].replace(/ /g, '') );
    // console.log( selected_text.replace(/ /g, '') );
    if (answers[global_id].replace(/ /g, '') === $.trim(selected_text.replace(/ /g, '')) ){
        alert('Teisingai');
    }
    else{ alert('Neteisingai');}
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