$(document).ready(function() {
    
   
    $(".hamburger").click(function(){ 
        $(".hamburger").toggleClass("is-active");
        $(".main-menu__list").slideToggle();
    });

    $(".slider__icons-itemStar").click(function(){ 
        var star = $(".user-action__itemStar").html();
        $(".user-action__itemStar").html(parseInt(star) + 1)
    });

    $(".slider__icons-itemCart").click(function(){ 
        var star = $(".user-action__itemCart").html();
        $(".user-action__itemCart").html(parseInt(star) + 1)
    });

    $(window).resize (function() {
        if (window.innerWidth >= 752) { 
            $('.main-menu .main-menu__list').attr('style', '');
        } 
    })

    $('.slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        dots: false,
        arrows: false
    });
});