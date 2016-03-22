//DAD, just update to the new number of the highest PIC##.jpg
var number_of_pictures = 50;
var SECONDS = 3;
var badfiles = [];
var cur = 1;
var image;

function rotatePictures()
{
	if( badfiles.indexOf(cur) >= 0 )
	{
		cur++;
		rotatePictures();
	}
	else
	{
		if(  cur == number_of_pictures )
			cur = 1;

		image = new Image();
		image.onload = changePix;
		image.onerror = skipPix;
		image.src = "/img/rotation/PIC" + ((cur < 10 ) ? "0" + cur : cur) + ".jpg";
	}
}

function changePix(){
    console.log(image.src);
    $("#profile > div.portrate.hidden-xs").css('background-image', 'url(' + image.src + ')');
	//document["rotateImage"].src = image.src;
	cur++;
	setTimeout(rotatePictures, (SECONDS * 1000) );
}

function skipPix(){
	badfiles.push( cur++ );
	rotatePictures();
}

$(function(){
    setTimeout(rotatePictures, (SECONDS * 1000) );
});
