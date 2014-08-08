$(document).ready(function() {

    var $bHeader      = $('.b-header');
    var $bPromo       = $('.b-promo');
    var $bTopLine     = $('.b-top-line');
    var $bToTop       = $('.b-to-top');
    var $bSetLocation = $('.b-set-location');

    if ($bHeader.length) {
        $(window).resize(function() {

            if ($(window).width() > 732) {
                $('body').prepend($bTopLine.addClass('b-top-line--fixed'));

                $bHeader.css('height', $(window).height());

                $bPromo.find('.container').center({
                    inside: {
                        el: $bHeader
                    },
                    vOffset: 65,
                    hOffset: -14
                });
            } else {
                $bHeader.css('height', '').prepend($bTopLine.removeClass('b-top-line--fixed'));

                $bPromo.find('.container').css('position', 'static');
            }

        });
    }

    /* Определение города
    ------------------------------------------------------------------------------- */

    if (city) {
        $bTopLine.find('.b-top-line__location__city').text(city);
    }

    $bSetLocation.find('button').click(function() {
        var $city = $bSetLocation.find('[name="city"]');

        if (!$city.val()) {
            $city.addClass('error');
        } else {
            $bTopLine.find('.b-top-line__location__city').text($city.val());
            $.fancybox.close();
        }
    });

    /* Стилизация элементов форм
    ------------------------------------------------------------------------------- */

    $('.styler').styler();

    /* Placeholder для старых браузеров
    ------------------------------------------------------------------------------- */

    $('input, textarea').placeholder();

    /* Всплывающие окна (fancybox)
    ------------------------------------------------------------------------------- */

    $.extend($.fancybox.defaults, {
        scrollOutside: false,
        padding: 0,
        openEffect: 'fade',
        closeEffect: 'fade',
        openSpeed: 200,
        closeSpeed: 200,
        //aspectRatio: true
        helpers: {
            overlay: {
                locked: false
            }
        }
    });

    $(document).on('click', '[data-modal-form]', function(e) {
        $form = $('.b-order-form--modal');

        $form.find('[name="title"]').val($(this).data('modal-form') || 'Всплывающая форма');

        $.fancybox($form);

        e.preventDefault();
    });

    $(document).on('click', '[data-modal]', function(e) {
        e.preventDefault();

        $.fancybox($($(this).data('modal')));
    });

    /* Форма заказа
    ------------------------------------------------------------------------------- */
    
    $('[name="phone"]').inputmask("+9(999)999-99-99", {placeholder: "+_(___)___-__-__", clearIncomplete: true});

    $(document).on('submit', '.b-form', function(e) {
        var $this   = $(this),
            isError = false;

        $this.find('[name]').each(function() {
            var $this = $(this);

            if (!$this.val()) {
                $this.addClass('error'); isError = true;
            } else if ($this.attr('name') == 'email' && !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test($this.val())) {
                $this.addClass('error'); isError = true;
            } else {
                $this.removeClass('error');
            }
        });

        if (isError) { return false; }

        $.post('/order.php', $this.serialize(), function(response) {

            if (response.error) {
                alert(response.error);
            } else {
                document.location.href = 'thanks.html';
            }

        }, 'json');

        //document.location.href = 'thanks.html';

        e.preventDefault();
    });

    /* Тарифы
    ------------------------------------------------------------------------------- */

    var $plans            = $('.b-plans .container'),
        $plansTable       = $('.b-plans__table'),
        $plansTableHeader = $plansTable.find('.b-plans__table__top th:not(:first)');

    $plansTableHeader.each(function(key) {
        var $this = $(this);

        if ($this.hasClass('hit')) {
            $plansTable.find('.b-plans__table__top, .b-plans__table__options tr, .b-plans__table__prices').each(function() {
                $(this).find('.plan:eq(' + key + ')').addClass('hit');
            });
        }

        var $table = $plansTable.clone();

        $table.removeClass('b-plans__table--full').addClass('b-plans__table--simple');
        
        $table.find('.b-plans__table__top, .b-plans__table__options tr, .b-plans__table__prices').each(function() {
            $(this).find('.plan:not(:eq(' + key + '))').remove();
        });

        $plans.append($table);
    });

    $('.b-plans__table').tableHover({rowClass: '', colClass: 'hover', ignoreCols: [1], footCols: true}); 

    /* Кнопка наверх
    ------------------------------------------------------------------------------- */

    $(window).scroll(function() {
        if ($(window).scrollTop() >= $bHeader.height()) {
            $bToTop.fadeIn(400);
        } else {
            $bToTop.fadeOut(400);
        }
    });

    /* Вызываем событие resize
    ------------------------------------------------------------------------------- */

    $(window).trigger('resize');
});

$(window).load(function() {

    /* Слайдер доверия
    ------------------------------------------------------------------------------- */

    var $bConfidenceSlider = $('.b-confidence__slider');

    if ($bConfidenceSlider.length) {
        var confidenceSlider = new Sly($bConfidenceSlider.find('.b-confidence__slider__wrapper'), {
            horizontal: 1,
            itemNav: 'basic',
            touchDragging: 1,
            speed: 400,
            dynamicHandle: 1,
            itemNav: 'forceCentered',
            smart: 1,
            activateMiddle: 1,
            nextPage: $bConfidenceSlider.find('.b-pagination__next'),
            prevPage: $bConfidenceSlider.find('.b-pagination__prev'),
        }).init();

        $(window).resize(function() {
            confidenceSlider.reload();
        });
    }

    /* Слайдер партнеров
    ------------------------------------------------------------------------------- */

    var $bPartnersSlider = $('.b-partners__slider');

    if ($bPartnersSlider.length) {
        var partnersSlider = new Sly($bPartnersSlider.find('.b-partners__slider__wrapper'), {
            horizontal: 1,
            itemNav: 'basic',
            touchDragging: 1,
            speed: 400,
            dynamicHandle: 1,
            nextPage: $bPartnersSlider.find('.b-pagination__next'),
            prevPage: $bPartnersSlider.find('.b-pagination__prev'),
        }).init();
    }

    /* Слайдер заведений
    ------------------------------------------------------------------------------- */

    var $bPlacesSlider = $('.b-places__slider');

    if ($bPlacesSlider.length) {
        var placesSlider = new Sly($bPlacesSlider.find('.b-places__slider__wrapper'), {
            horizontal: 1,
            itemNav: 'basic',
            touchDragging: 1,
            speed: 400,
            dynamicHandle: 1,
            nextPage: $bPlacesSlider.find('.b-pagination__next'),
            prevPage: $bPlacesSlider.find('.b-pagination__prev'),
        }).init();
    }

    $bPlacesSlider.find('.b-places__slider__wrapper a').fancybox();

    /* Установка высоты слайдеров
    ------------------------------------------------------------------------------- */

    $(window).resize(function() {
        $('.js-slider').each(function() {
            var height = 0;
            var $this  = $(this);

            $this.find('li').each(function() {
                if ($(this).outerHeight() > height) {
                    height = $(this).outerHeight();
                }
            });
            
            $this.find('.js-slider__wrapper').height(height);
        });
    });

    /* Вызываем событие resize
    ------------------------------------------------------------------------------- */

    $(window).trigger('resize');
});