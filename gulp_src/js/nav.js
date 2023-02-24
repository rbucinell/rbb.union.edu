function initMenu() {
    $('ul#navigation li ul').hide();

    $('.navitem').click(
        function() {
            console.log('navitem click');
            var checkElement = $('ul', $(this));
            if((checkElement.is('ul')) && (checkElement.children(1).is(':visible'))) {
                checkElement.slideUp('normal')
                return false;
            }
            if((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
                $('#navigation ul:visible').slideUp('normal');
                checkElement.slideDown('normal');
                return false;
            }
            return true;
        }
    );

    $('.linkitem').click( function() {
            var link = $('a',$(this));
            window.location.href = link.attr('href');
            return false;
    });
}

var loc = window.location.href, index = loc.indexOf('#');

if (index > 0) {
  window.location = loc.substring(0, index);
}

$.fn.exists = function () {
    return this.length > 0 ? this : false;
};


$(document).ready(function(){

    initMenu();
	/*++++++++++++++++++++++++++++++++++++
		slidepage
	++++++++++++++++++++++++++++++++++++++*/
	var SidebarAnim = new TimelineLite({paused:true});
	SidebarAnim
		.to($(".social-icons, #main-nav"),0.2,{left:0})
		.to($("#main"),0.2,{left:250,right:"-=250"},"-=0.2")
        .to($("footer"),0.2,{left:250,right:"-=250"},"-=0.2");

	$("a.mobilemenu").on("click",function(){
		SidebarAnim.play();
	});
	$(".social-icons, #main-nav, #main").on("click",function(){
		SidebarAnim.reverse();
	});

    /*++++++++++++++++++++++++++++++++++++++++++++++
		custom scrolls with perfectScroll plugin
	++++++++++++++++++++++++++++++++++++++++++++++++*/
	$("#main").perfectScrollbar({
		wheelPropagation:true,
		wheelSpeed:80
	});
});
