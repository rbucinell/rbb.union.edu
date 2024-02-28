
const MAX_PICTURES = 50;
const SECONDS = 1;

let img = document.querySelector('#profile > img');
let id =  30;
let max = Number.MAX_VALUE;
let badfiles = [];

async function urlContentToDataUri(url){
    const response = await fetch(url);
	const blob = await response.blob();
	return await new Promise(callback => {
		let reader = new FileReader();
		reader.onload = function () { callback(this.result); };
		reader.readAsDataURL(blob);
	});
}

async function rotatePictures() {	
	let rotId = (id++) % max;
	let imgContent = localStorage.getItem(rotId);
	if( imgContent === null ){
		let url = `/img/rotation/PIC${ (rotId).toString().padStart(2,'0')}.jpg`;
		imgContent = await urlContentToDataUri(url);
		console.log( url, imgContent )
		if( imgContent !== null ) localStorage.setItem(rotId,imgContent);
	}
	console.log( rotId, max, imgContent === null );
	if( imgContent === null ){
		max = id-2;
	}else{
		document.querySelector('#profile > img').setAttribute('src', imgContent );
	}
}

function changePix( evt ) {
	console.log( evt );
	img = evt.target;
}

function skipPix( evt ){
	badfiles.push( id );
	max = id-1;
	id = 1;
}

let pictures = [];
async function loadPictures(){
	for( let i = 1; i <= MAX_PICTURES; i++)
	{
		let url = `/img/rotation/PIC${ (i).toString().padStart(2,'0')}.jpg`;
		let imageContent = await urlContentToDataUri( url );
		if( imageContent )
			pictures.push( imageContent );
		console.log( i, imageContent );
	}
}

//(async ()=> setInterval(await rotatePictures, (SECONDS * 1000) ))();
//loadPictures();












// //DAD, just update to the new number of the highest PIC##.jpg
// var number_of_pictures = 50;
// var SECONDS = 3;
// var badfiles = [];
// var cur = 1;
// var image;

// function rotatePictures()
// {
// 	if( badfiles.indexOf(cur) >= 0 )
// 	{
// 		cur++;
// 		rotatePictures();
// 	}
// 	else
// 	{
// 		if(  cur == number_of_pictures )
// 			cur = 1;

// 		image = new Image();
// 		image.onload = changePix;
// 		image.onerror = skipPix;
// 		image.src = "/img/rotation/PIC" + ((cur < 10 ) ? "0" + cur : cur) + ".jpg";
// 	}
// }

// function changePix(){
//     //console.log(image.src);
//     $("#profile > div.portrate.hidden-xs").css('background-image', 'url(' + image.src + ')');
// 	//document["rotateImage"].src = image.src;
// 	cur++;
// 	setTimeout(rotatePictures, (SECONDS * 1000) );
// }

// function skipPix(){
// 	badfiles.push( cur++ );
// 	rotatePictures();
// }

// $(function(){
//     setTimeout(rotatePictures, (SECONDS * 1000) );
// });
