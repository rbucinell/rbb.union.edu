const delay = 5000;

document.addEventListener('DOMContentLoaded', async ()=> {

	let images = [];
	let foundMax = false;
	let cur = 1;	
	let portrait = document.querySelector("#profile > div.portrate");

	while( true )
	{
		if( !foundMax )
		{
			let imgResponse = await fetch( `img/rotation/PIC${((cur < 10 ) ? "0" + cur : cur)}.jpg` );
			if( imgResponse.status === 404 ) 
				foundMax = true;
			else
				images.push(  await imgResponse.blob() );
		}
		portrait.style.backgroundImage =  `url(${URL.createObjectURL(images[(cur-1)%images.length])})`;
		await new Promise(resolve => setTimeout(resolve, delay));
		cur++;
	}
});














/*

//DAD, just update to the new number of the highest PIC##.jpg
var number_of_pictures = 50;
var SECONDS = 3;
var badfiles = [];
var goodfiles = [];
var cur = 1;
var image;
var $portrait = {};


function updatePortrait()
{
	var nextSrc = "img/rotation/PIC" + ((cur < 10 ) ? "0" + cur : cur) + ".jpg";
	
	if(  cur == number_of_pictures )
	{
		cur = 1;
	}
	if( badfiles.indexOf(cur) >= 0 )
	{
		cur++;
		updatePortrait();
	}
	else
	{
		$.ajax({
		url: nextSrc,
		type: 'get',
		success: function(data)
		{
			console.log(nextSrc);
			$portrait.css('background-image', 'url(data:image/jpg;base64,' +data + ')');
			//$portrait.attr('src', "data:image/png;base64," + data); //todo, figure out why this isn't setting correctly
		},
		error: function()
		{
			number_of_pictures = cur-1;
			cur = 0;
		},
		complete: function()
		{
			cur++;
			setTimeout(updatePortrait, SECONDS * 1000 );
		}		
		});
	}	
}

$(function(){	
	$portrait = $("#profile > div.portrate");
	$portrait.css("all ease 3s");
	
	updatePortrait();
});
*/