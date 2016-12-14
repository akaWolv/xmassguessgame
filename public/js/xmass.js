$(function() {
    $('#start_game').on( "click", function( event ) {
        $('#game_off').slideUp(function() {
            $('#game_on').slideDown();
        });
    });
    $('#stop_game').on( "click", function( event ) {
        $.ajax({
            url: "/stop",
            success: function () {
                $('#game_on').slideUp(function() {
                    $('#game_off').slideDown();
                });
            }
        });
    });
    $('#try_next, #start_game').on( "click", function( event ) {
        $.ajax({
            url: "/start_random",
            success: function( result ) {
                console.log(result);
                $("#answers > div h4").map(function (index, elem) {
                    $(elem).html(result[index].title);
                    $(elem)
                        .parent()
                        .parent()
                        .off('click')
                        .on('click', function (e) {
                            if (undefined != result[index].current) {
                                $('#my_modal_title').html('<div class="alert alert-success" role="alert"><strong><center>Correct awnser!</center></strong></div>');
                                $('.js_anwer_img').hide();

                                setTimeout(function() {
                                    var images = $('.js_anwer_img_correct');
                                    var random_image = $(images[Math.round(Math.random() * images.length)]);
                                    random_image.show();

                                    $('#my_modal').modal('toggle');
                                }, 1);

                            } else {
                                $('#my_modal_title').html('<div class="alert alert-danger" role="alert"><strong><center>Wrong awnser!</center></strong></div>');
                                $('.js_anwer_img').hide();

                                setTimeout(function() {
                                    var images = $('.js_anwer_img_fail');
                                    var random_image = $(images[Math.round(Math.random() * images.length)]);
                                    random_image.show();

                                    $('#my_modal').modal('toggle');
                                }, 1);
                            }
                            e.stopPropagation();
                        });
                });
            }
        });
    });

});