$(function(){

	$('.vs-info').slick({
		arrows: false,
    });

    $("#contact-form").validate({
    	onkeyup: false,
		rules: {
			contact_name: "required",
			contact_email: {
				required: true,
				email: true
			},
			contact_message: "required"
		},
		messages: {
			contact_name: "Your Name is required.",
			contact_email: {
				required: "Your E-mail is required.",
				email: "Enter a valid email address."
			},
			contact_message: "Your Message is required."
		},
		submitHandler: function(form){
			var postData = $(form).serializeArray();
		    var formURL = $(form).attr("action");
		    var formType = $(form).attr("method");

		    $.ajax({
		        url : formURL,
		        type: formType,
		        data : postData,
		        success:function(data, textStatus, jqXHR){
		        	
		        },
		        error: function(jqXHR, textStatus, errorThrown){

		        }
		    });
			return false;
		}
	});

    var navLink = $('.nav-link');
    var $root = $('html, body');
	navLink.on('click', function(e){
		$root.animate({
        	scrollTop: $($.attr(this, 'href')).offset().top
    	}, 1000, 'easeOutCirc');
    	if(!classie.has(element,'active')){
    		setTimeout(function(){
    			classie.toggle(element, 'active-small');
    		},50);
    		classie.toggle(navUlSmall, 'hide');	
    	}else{
    		classie.toggle(element, 'active-small');
    		classie.toggle(navUlSmall, 'hide');
    	}
    	return false;
	});

	var servicesSubNavTrigger = document.getElementById('services-sub-nav-trigger');
	var servicesSubNav = document.getElementById('services-sub-nav');
	var navServices = $('.nav-services');

	$(servicesSubNavTrigger).on('mouseenter', function(){
		classie.add(servicesSubNavTrigger, 'busy');
		classie.add(servicesSubNav,'show');
		classie.add(navLink[2],'sub-nav-active');
		classie.add(navLink[2],'nav-link-active');
		classie.add(servicesSubNavTrigger,'active');
	});

	$(servicesSubNavTrigger).on('mouseleave', function(){
		classie.remove(servicesSubNavTrigger, 'busy');
		setTimeout(function(){
			if(classie.has(servicesSubNav, 'busy') || classie.has(navLink[2], 'busy')){

			}else{
				classie.remove(servicesSubNav,'show');
				classie.remove(navLink[2],'sub-nav-active');
				classie.remove(navLink[2],'nav-link-active');
				classie.remove(servicesSubNavTrigger,'active');
			}
		}, 50);
	});

	$(navLink[2]).on('mouseenter', function(){
		classie.add(navLink[2],'busy');
		classie.add(servicesSubNav,'show');
		classie.add(navLink[2],'sub-nav-active');
		classie.add(navLink[2],'nav-link-active');
		classie.add(servicesSubNavTrigger,'active');
	});

	$(navLink[2]).on('mouseleave', function(){
		classie.remove(navLink[2],'busy');
		setTimeout(function(){
			if(classie.has(servicesSubNav, 'busy') || classie.has(servicesSubNavTrigger, 'busy')){

			}else{
				classie.remove(servicesSubNav,'show');
				classie.remove(navLink[2],'sub-nav-active');
				classie.remove(navLink[2],'nav-link-active');
				classie.remove(servicesSubNavTrigger,'active');
			}
		}, 50);
	});

	navServices.on('click',function(e){
		classie.remove(servicesSubNav,'show');
		classie.remove(navLink[2],'sub-nav-active');
		classie.remove(navLink[2],'nav-link-active');
		classie.remove(servicesSubNavTrigger,'active');
		$root.animate({
        	scrollTop: $( $.attr(this,'href') ).offset().top
    	}, 1000, 'easeOutCirc');
		$('.vs-info').slickGoTo($.attr(this,'slide-id')-1);
	});

	$(servicesSubNav).on('mouseenter', function(){
		classie.add(servicesSubNav,'busy');
	});

	$(servicesSubNav).on('mouseleave', function(){
		classie.remove(servicesSubNav,'busy');
		classie.remove(servicesSubNav,'show');
		classie.remove(navLink[2],'sub-nav-active');
		classie.remove(navLink[2],'nav-link-active');
		classie.remove(servicesSubNavTrigger,'active');
	});

    var element = document.getElementById('venmic-header');
	onscroll = function(){
    	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

    	if(scrollTop > 180){
			classie.add(element,'active');
		}else{
			classie.remove(element,'active');
		}
	}

	var navBarSmall = document.getElementById('nav-bar-small');
	var navUlSmall = document.getElementById('nav-ul-small');
	$(navBarSmall).on('click', function(e){
		classie.toggle(element,'active-small');
    	classie.toggle(navUlSmall, 'hide');
	});

	

	var nextButton = document.getElementById( 'next-button' );
	$(nextButton).on('click', function(){
		$('.vs-info').slickNext();
	});

	var previousButton = document.getElementById( 'previous-button' );
	$(previousButton).on('click', function(){
		$('.vs-info').slickPrev();
	});

	paceOptions = {
		ajax: false,
		document: true,
		eventLag: true,
		elements: false
	};

	var loadCover = document.getElementById( 'loader-div' );
	Pace.on("done", function(){
    	setTimeout(function(){
    		$(loadCover).fadeOut();
    	},400);
	});
});