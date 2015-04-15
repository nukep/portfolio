(function($) {
    function onPageLoad() {
        $('.sprite').waypoint(function() {
            $(this).addClass('animated wobble');
        }, { offset: 'bottom-in-view' });
    }

    var $body = $('html, body');
    var content = $('#mypage').smoothState({
        prefetch: true,
        pageCacheSize: 4,
        onStart : {
          duration: 250,
          render: function () {
            content.toggleAnimationClass('is-exiting');

            // Scroll user to the top
            $body.animate({
                'scrollTop': 0
            });
          }
        },
        callback: function(url, $container, $content) {
            onPageLoad();
        }
    }).data('smoothState');

    // $('header > h2').fitText(1.0, {
    //     minFontSize: '4em',
    //     maxFontSize: '70px'
    // });

    onPageLoad();
})(jQuery);
