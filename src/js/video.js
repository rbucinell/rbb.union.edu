/**
* Loads a video from the video menu
**/
function loadVideo( url )
{
	var video = document.getElementById('video');
	video.pause();
	//document.getElementById('mp4').src = url;
	video.src = url;
	video.load();
	video.play();
}

/**
* Selects a menu item, and ensures the proper path is also selected
**/
function selectItem( $this, loadLastItem )
{
	var $curItem = $this.parent();//li
	var $curList = $curItem.parent(); // ul of current li

	//This will make the current li item selected, and all in that
	//level of the list unselected
	$curItem.siblings().each( function()
	{
	   $(this).removeClass('selected').css('background', 'Beige');
	   $(this).find('ul').css('display', 'none');
	});
	$curItem.addClass( 'selected' ).css('background', '#923338');
	$curItem.find('ul').css('display','block');

	//recursive call
	if( $curItem.has('ul').length )
	{
		 selectItem( $curItem.find('ul').first().find('a').first(), false );
	}
	else
	{
		if( loadLastItem )
		{
			console.log('loading: ' + $curItem.text() + '- src: ' + $this.attr('href') );
			loadVideo( $this.attr('href') );
		}
	}
}

/**
* Initializes video menu
**/
function initVideoMenu()
{
	//Set the first Video as selected
	$('.C > li').first().addClass("selected");
	$('.T > li').first().addClass("selected");
	$('.V > li').first().addClass("selected");

	//hijack the click events to control the menu
	$(".videomenu a").click( function(event) {
		event.preventDefault();
		selectItem( $(this), true);
	});

	//Set video to the first category > topic > video, then pause it (no one likes autoplay)
	$('.C > li > a').first().click();
	$('.V > li > a').first().click();
	document.getElementById('video').pause();
};
