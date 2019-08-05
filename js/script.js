$(document).ready(function(){

    /*SLIDER MOTION*/
    slider = $('.gallery-slider')
    slides = $('.gallery-slider .gallery-slider__item').length

    options_right ={
        "overflow": 'hidden',
        "height":'500px',
        "opacity": 0.3,
        "right": '-30px',
    }

    options_left ={
        "overflow": 'hidden',
        "height": '500px',
        "opacity": 0.3,
        "left": '-30px',
    }

    options_active = {
        "overflow": 'visible',
        "height": 'auto',
        "opacity": 1,
        "right": 'auto',
        "left": 'auto'
    }
    slider_size = false
    // if ($(window).width() < 1230) {
    //     slider.find('.gallery-slider__wrap').css({'width':'700px'})
    //     slider.find('.gallery-slider__item').css({'width':'700px'})
    //     slider_size = 700
    // }

    if ($(window).width() < 1230) {
        if ($(window).width() > 800) {
            slider_size = 700
        }
        if ($(window).width() < 800) {
            slider_size = 600
        }
        if ($(window).width() < 700) {
            slider_size = 500
        }
        if ($(window).width() < 600) {
            slider_size = 450
        }
        if ($(window).width() < 500) {
            slider_size = 400
        }
        if ($(window).width() < 400) {
            slider_size = 300
        }
        if ($(window).width() < 350) {
            slider_size = 280
        }            
        slider.find('.gallery-slider__wrap').css({ 'width': slider_size + 'px' })
        slider.find('.gallery-slider__item').css({ 'width': slider_size + 'px' })
        slider.find('.gallery-slider__wrap img').css({ 'width': '100%', 'height': '100%' })
        slider.find('.gallery-slider__item img').css({ 'width': '100%', 'height': '100%' })
    }

    if ($(window).width() > 1230) {
        slider.find('.gallery-slider__wrap').css({ 'width': 100 + '%' })
        slider.find('.gallery-slider__item').css({ 'width': 'auto' })
    }



    $(window).on('resize', function(){
        if ($(window).width() < 1230) {
            if ($(window).width() > 800) {
                slider_size = 700
            }            
            if ($(window).width() < 800){
                slider_size = 600
            }
            if ($(window).width() < 700) {
                slider_size = 500
            }
            if ($(window).width() < 600) {
                slider_size = 450
            }
            if ($(window).width() < 500) {
                slider_size = 400
            } 
            if ($(window).width() < 400) {
                slider_size = 300
            }
            if ($(window).width() < 350) {
                slider_size = 280
            }                                             
            slider.find('.gallery-slider__wrap').css({ 'width': slider_size+'px' })
            slider.find('.gallery-slider__item').css({ 'width': slider_size+'px' })
            slider.find('.gallery-slider__wrap img').css({ 'width': '100%', 'height':'100%' })
            slider.find('.gallery-slider__item img').css({ 'width': '100%', 'height':'100%' })            
        }

        if ($(window).width() > 1230){
            slider.find('.gallery-slider__wrap').css({ 'width': 100 + '%' })
            slider.find('.gallery-slider__item').css({ 'width': 'auto'})            
        }
    })
    

    function initial(){
        curr__index = slider.find('.gallery-slider__item_active').index()
        slider_active = slider.find('.gallery-slider__item_active')
        options_left.height = slider_active.height() - 50 + 'px'
        options_right.height = slider_active.height() - 50 + 'px'

        $('.gallery-slider_pagination__item').removeClass('gallery-slider_pagination__item_active')
        $('.gallery-slider_pagination__item').eq(curr__index).addClass('gallery-slider_pagination__item_active')

        if ($(window).width() < 350) {
            options_left.height = slider_active.height() - 20 + 'px'
            options_right.height = slider_active.height() - 20 + 'px'
        }
        if(curr__index == 0){
            slider.find('.gallery-slider__item').eq(slides - 1).css(options_left).addClass('gallery-slider__item_fit')
            slider_prev = slider.find('.gallery-slider__item').eq(slides - 1)
        }else{
            slider.find('.gallery-slider__item').eq(curr__index - 1).css(options_left).addClass('gallery-slider__item_fit')
            slider_prev = slider.find('.gallery-slider__item').eq(curr__index - 1)
        }

        if (curr__index == slides-1){
            slider.find('.gallery-slider__item').eq(0).css(options_right).addClass('gallery-slider__item_fit')
            slider_next = slider.find('.gallery-slider__item').eq(0)
        }else{
            slider.find('.gallery-slider__item').eq(curr__index + 1).css(options_right).addClass('gallery-slider__item_fit')
            slider_next = slider.find('.gallery-slider__item').eq(curr__index + 1)
        }
    }
    initial()

    $('.gallery-slider__nav_right').on('click', function(){
        slider_active.dequeue()
        slider_prev.dequeue()
        slider_next.dequeue()
        options_left.height = slider_active.height()- 50+'px'
        options_right.height = slider_active.height() - 50 + 'px'
        if ($(window).width() < 350) {
            options_left.height = slider_active.height() - 20 + 'px'
            options_right.height = slider_active.height() - 20 + 'px'
        }        
        //options_left.height = '500px'
        slider_active.css({"z-index":1}).animate(options_left, 200, function(){
            $(this).dequeue()
        }).removeClass('gallery-slider__item_active')
        width = slider_next.find('img').width()
        
        if(slider_size){
            width = slider_size            
        }
        position = (slider.find('.gallery-slider__items-wrap').width() - width) / 2
        if(slider_size){
            term_options = {"right": position + 'px', 'z-index': 5}
            slider_next.css('width',slider_size)
        }else{
            term_options = {"right": position + 'px', 'z-index': 5, 'width': width}        
        }
        slider_next.addClass('gallery-slider__item_active').removeClass('gallery-slider__item_fit')
        slider_next.css({ "opacity": 1, "height": 'auto'}).animate(term_options, 200, function () {
            $(this).dequeue()
        })
        toStopIndex = slider_prev.index() 
        slider_prev.animate({ "opacity": "0" }, 200, function(){
            $(this).removeAttr('style').css({ "opacity": "0" })
        })
        slider_prev = slider.find('.gallery-slider__item').eq(slider_active.index())
        slider_active = slider.find('.gallery-slider__item').eq(slider_next.index())
        curr__index = slider_active.index()
        if(slider_active.index() == slides-1){
            slider_next = slider.find('.gallery-slider__item').eq(0)
        }else{
            slider_next = slider.find('.gallery-slider__item').eq(curr__index+1)
        }
        slider_next.css(options_right).addClass('gallery-slider__item_fit')
        $('.gallery-slider_pagination__item').removeClass('gallery-slider_pagination__item_active')
        $('.gallery-slider_pagination__item').eq(curr__index).addClass('gallery-slider_pagination__item_active')        

    })

    $('.gallery-slider__nav_left').on('click', function () {
        slider_active.dequeue()
        slider_prev.dequeue()
        slider_next.dequeue()       
        options_left.height = slider_active.height() - 50 + 'px'
        options_right.height = slider_active.height() - 50 + 'px'
        if ($(window).width() < 350) {
            options_left.height = slider_active.height() - 20 + 'px'
            options_right.height = slider_active.height() - 20 + 'px'
        }
        //options_left.height = '500px'
        slider_active.css({ "z-index": 1, 'left': 'inherit' }).css(options_right).removeClass('gallery-slider__item_active')
        // slider_active.css({ "z-index": 1, 'left':'inherit'}).animate(options_right, 200, function () {
        //     $(this).dequeue()
        // }).removeClass('gallery-slider__item_active')
        width = slider_prev.find('img').width()
        if (slider_size) {
            width = slider_size
        }
        position = (slider.find('.gallery-slider__items-wrap').width() - width) / 2
        if (slider_size) {
            term_options = { "left": position + 'px', 'z-index': 5 }
            slider_prev.css('width', slider_size)
        } else {
            term_options = { "left": position + 'px', 'z-index': 5, 'width': width }
        }
        slider_prev.addClass('gallery-slider__item_active').removeClass('gallery-slider__item_fit')
        slider_prev.css({ "opacity": 1, "height": 'auto' }).animate(term_options, 200, function () {
            $(this).dequeue()
        })
        slider_next.animate({ "opacity": "0" }, 200, function () {
            $(this).removeAttr('style').css({ "opacity": "0" })
        })
        slider_next = slider.find('.gallery-slider__item').eq(slider_active.index())
        slider_active = slider.find('.gallery-slider__item').eq(slider_prev.index())
        curr__index = slider_active.index()
        if (slider_active.index() == 0) {
            slider_prev = slider.find('.gallery-slider__item').eq(slides - 1)
        } else {
            slider_prev = slider.find('.gallery-slider__item').eq(curr__index - 1)
        }
        
        slider_prev.css(options_left).addClass('gallery-slider__item_fit')
        $('.gallery-slider_pagination__item').removeClass('gallery-slider_pagination__item_active')
        $('.gallery-slider_pagination__item').eq(curr__index).addClass('gallery-slider_pagination__item_active')

    })

    $('.gallery-slider_pagination__item').on('click', function(){
        // function scroll_slider(counter,scroll){
        //     if (scroll > 0) {
        //         $('.gallery-slider__nav_right').click()
        //     }
        //     if (scroll < 0) {
        //         $('.gallery-slider__nav_left').click()
        //     }
        //     counter++
        //     if (counter != Math.abs(scroll)) {
        //         setTimeout(() => {
        //             scroll_slider(counter,scroll)
        //         }, 200);
        //     }
        // }      
        // scroll = $(this).index() - curr__index
        // console.log(scroll)
        // counter = 0
        // if(counter != scroll){
        //     scroll_slider(counter, scroll)
        // }
        slider.find('.gallery-slider__item_fit').removeClass('gallery-slider__item_fit')
        slider.find('.gallery-slider__item_active').removeClass('gallery-slider__item_active')
        slider.find('.gallery-slider__item').eq($(this).index()).addClass('gallery-slider__item_active').removeAttr('style')
        initial()
    })



    /*SLIDER MOTION*/
})


/*SLIDER*/
var slider_width = 0
slider_width = $('.news__slider__item_small').length * 293 + $('.news__slider__item_big').length * 585 + $('.news__slider__item_middle').length * 360
allows = []

$('.news__slider__wrap').width(slider_width+'px')

$('.news__slider__wrap').each(function(){
    allows.push({
        left: false,
        right: true,
    })
    slider_width = $(this).find('.news__slider__item_small').length * 293 + $(this).find('.news__slider__item_big').length * 585 + $(this).find('.news__slider__item_middle').length * 390
    $(this).width(slider_width)
})

$(document).ready(function(){
    $('.slider__nav_right').on('click', function () {
        left_arrow = $(this).parent().find('.slider__nav_left')
        news_slider = $(this).parent().parent().parent().find('.news__slider')
        wrap = $(this).parent().parent().parent().find('.news__slider__wrap') 
        index = $(this).parent().parent().parent().index()
        step = (index == 1) ? 390 : 293
        if($(window).width() <= 768 && index == 1)
            step = 346
        console.log(index)
        if ((news_slider.width() - wrap.width() + 30) + step > wrap.css('left').slice(0, -2)) {
            $(this).css({ "opacity": 0.5 })
        }

        if ((news_slider.width() - wrap.width() + 30) > wrap.css('left').slice(0, -2)){
            allows[index].right = false
            console.log(allows[index])
        }
        if(allows[index].right){
            allows[index].left = true
            console.log(allows[index])
            left_arrow.css({"opacity":1})
            wrap.animate({ left: "-="+step }, function () {
                wrap.queue('fx', [])
            })
        }
    })

    $('.slider__nav_left').on('click', function () {
        right_arrow = $(this).parent().parent().parent().find('.slider__nav_right')
        wrap = $(this).parent().parent().parent().find('.news__slider__wrap')
        index = $(this).parent().parent().parent().index()
        step = (index == 1) ? 390 : 293
        if ($(window).width() <= 768 && index == 1)
            step = 346        
        if (+wrap.css('left').slice(0, -2) + step >= 0){
            $(this).css({"opacity": 0.5})
        }
        console.log(index)
        
        if(wrap.css('left').slice(0, -2) + step >= 0){
            allows[index].left = false
            console.log(allows[index])
        }
        if (allows[index].left) {
            allows[index].right = true
            console.log(allows[index])
            right_arrow.css("opacity", 1)
            wrap.animate({ left: "+="+step }, function(){
                wrap.queue('fx', [])
            })
        }
    })

    /*SLIDER END*/

    /*BURGER*/
        $('.burger').on('click', function(){
            if ($(this).hasClass('hidden')){
                $(this).removeClass('hidden')
                $('nav').css({"display":"flex"})
                $('nav').show()
            }else{
                $('nav').css({"display":"none"})
                $(this).addClass('hidden')
            }
        })
    /*BURGER END*/
    $('.nav__item').on('click',function(){
        $('.nav__item').removeClass('active')
        $(this).addClass('active')
    })
    var thousandSeparator = function (str) {
        var parts = (str + '').split('.'),
            main = parts[0],
            len = main.length,
            output = '',
            i = len - 1;

        while (i >= 0) {
            output = main.charAt(i) + output;
            if ((len - i) % 3 === 0 && i > 0) {
                output = ' ' + output;
            }
            --i;
        }

        if (parts.length > 1) {
            output += '.' + parts[1];
        }
        return output;
    };
    $('.field__item__input').on('keyup', function(){
        str = $(this).val().replace(/\s*/g, '')
        if (!isNaN(+str)){
            $(this).val(thousandSeparator(str))
        }
    })
})