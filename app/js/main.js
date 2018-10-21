// Initialize and add the map
function initMap() {
  // The location of Uluru
  var radiks = { lat: 50.468083, lng: 36.409915 }; 

  // The map, centered at Uluru
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 14, center: radiks});
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({position: radiks, map: map});
}

$(function() {


	$.fn.extend({
   qcss: function(css) {
      return $(this).queue(function(next) {
         $(this).css(css);
         next();
      });
   	}
	});

	// Soft Scrolling for propagation menu
		$('.propagation-menu__link').on('click', function(e) {
			e.preventDefault();
			target = this.hash;
			$('body').scrollTo(target, 1000);
		});

		// for links starting with #id
		$('a[href^="#"]').on('click', function(e) {
			e.preventDefault();

			$menuBlock.fadeOut(800);

			target = this.hash;
			$('body').scrollTo(target, 1000);
		});

	// adding scrollspy for active menu
		$('body').scrollspy({target: '#propagation-menu'});


	// Burger Menu On-Click

		$burgerButton = $('.burger-block');
		$closeButton  = $('.menu__close-button');
		$menuBlock    = $('.menu');

		$burgerButton.on('click', function() {
			
			$menuBlock.fadeIn(800);

		})

		//Phone Input show
		$('#phone-input-menu').on('click', function(event) {
			$('#phone-input-menu').addClass('social-block_input');
			$('.phone_form').addClass('form-show');
			$('.check-mark').delay(300).qcss({ display: 'inline-block' });
			event.stopPropagation();
		})

		//Phone Input hide
		$('.menu_container').on('click', function() {
			$('#phone-input-menu').removeClass('social-block_input');
			$('.phone_form').removeClass('form-show');

				$('.check-mark').hide();
			
		})

		// set mask for phone input
		$("#phone").mask("8(999) 999-9999", {
  			completed: function(){ 
				$('.phone_form').find('.btn_submit').removeAttr('disabled');
				$('.check-mark').css('color', '#70F976');
				$('.check-mark').on('click', function() {
				$('.phone_form').submit();
  			})
  		}
		});

		$closeButton.on('click', function() {

			$menuBlock.fadeOut(800);

		})


		// contacts section -> phone icon on click triggers 'menu' popup and click on phone menu
		$('#phone-input-contacts').on('click', function() {
			$burgerButton.click();

			$('#phone-input-menu').click();
			$('#phone').focus();
		})

		// Product Pop-up

		$prodPop = $('.product-popup');
		$product  = $('#production .production-block__img');
		$productG  = $('#production-glue .production-block__img');
		$closePop_button = $('.product-popup__back-button');

		// Кнопки заказать -> открытие модального окна
		$orderButton = $("a.main-button[href='#modal']");
		$feedButton  = $("#mod-feed");

		// Кнопка добавить отзыв -> открытие модального окна

		$orderButton.on('click', function () {
			$('#modal1').modal('open');
		});

		$feedButton.on('click', function () {
			$('#modal2').modal('open');
		});

		// ***********

		$burger 		= $('.burger-block__elem');
		$prop_menu 	= $('.propagation-menu');

		$product.on('click', function() {
			$prodPop.fadeIn(1000);
		});

		$closePop_button.on('click', function() {
			$prodPop.fadeOut(1000);
		})

		

		// Glue Section
		$productG.on('click', function() {
			$prodPop.fadeIn(1000);
		});




		document.addEventListener('scroll', function(e) {

			// Checks if we are out of first section to change color of burger and paginator menu
				if ( isElementInViewport($('.plc')) || isElementInViewport($('.plc-foot'))) {
					$burger.css("background", "#fff")
					$prop_menu.fadeOut(1200);
				} else {
					$burger.css("background", "#000");
					$prop_menu.fadeIn(1200);
				}
		})

		// ********************************************

		$('.scroll-block__link').on('click', function() {
				$('body').scrollTo('#p1', 1000);
		})

		//Slider

		$('.slider-block').slick({
			centerMode: true,
  		centerPadding: '60px'
,  		slidesToShow: 3,
  		responsive: [
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '0px',
        slidesToShow: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 1
      }
    }
  ]
  	});


	// Modal Window - Форма связи 
	$('.modal').modal({
		startingTop: "40%"
	});

	// Underscoring input fields
	var $formInput = $('.contact-form__input');

		$formInput.focus(function() {
			$(this).parent().addClass('contact-form_active');
		}).blur(function() {
			if ($(this).val() === ''){
				$(this).parent().removeClass('contact-form_active');
			}
		});


});





function isElementInViewport (el) {

    //special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );



}