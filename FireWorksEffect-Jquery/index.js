$('button').on('dblclick', function (e) {
    if ($('input').val() == 10) {
        fireworks()
//         $('input').css('border-color', 'green');
    } else {
        $('input').css('border-color', 'red');
    }
})

function fireworks() {
    $('button').clickFireworks({
        id: 'fireworks',
        appendTo: 'body',
        zIndex: 1000
    });
}


