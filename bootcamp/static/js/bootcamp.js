$(function () {
  $.fn.count = function (limit) {
    var length = limit - $(this).val().length;
    var form = $(this).closest("form");
    if (length <= 0) {
      $(".form-group", form).addClass("has-error");
    }
    else {
      $(".form-group", form).removeClass("has-error");
    }
    $(".help-count", form).text(length);
  };


  //Function to show/hide menu on small devices
  var menuTrigger = $('#open-small-menu');
  var menu = $('#menu');
  menuTrigger.on('click',function(e){
    classie.toggle(menu[0], 'active');
    console.log('Changed state.');
  });
});