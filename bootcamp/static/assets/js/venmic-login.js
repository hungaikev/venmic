$(function(){

	$("#venmic-login").validate({
    	onkeyup: false,
		rules: {
			username: "required",
			password: "required"
		},
		messages: {
			username: "Your username is required.",
			password: "Your password is required."
		},
		submitHandler: function(form){
			$(form).submit();
			/*
			var postData = $(form).serializeArray();
		    var formURL = $(form).attr("action");
		    var formType = $(form).attr("method");

		    $.ajax({
		        url : formURL,
		        type: formType,
		        data : postData,
		        success:function(data, textStatus, jqXHR){
		        	pageRedirect = document.getElementById('login-page-redirect');
		        	pageRedirect.click();
		        },
		        error: function(jqXHR, textStatus, errorThrown){

		        }
		    });
			return false;*/
		}
	});

	var navLink = $('.nav-link');
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
		classie.add(servicesSubNavTrigger,'active');
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

	navServices.on('click',function(e){
		classie.remove(servicesSubNav,'show');
		classie.remove(navLink[2],'sub-nav-active');
		classie.remove(navLink[2],'nav-link-active');
		classie.remove(servicesSubNavTrigger,'active');
	});

	navLink.on('click', function(e){
    	classie.toggle(navUlSmall, 'hide');
	});

	var navBarSmall = document.getElementById('nav-bar-small');
	var navUlSmall = document.getElementById('nav-ul-small');
	$(navBarSmall).on('click', function(e){
    	classie.toggle(navUlSmall, 'hide');
	});

});