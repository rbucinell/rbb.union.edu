document.addEventListener('DOMContentLoaded', async ()=> {
	
	const delay = 5000;

	let images = [];
	let foundMax = false;
	let cur = 1;
	let portrait = document.querySelector("#profile > div.portrate");

	//If there is a manifest, then preload the rotation images
	let manifest = await fetch( 'manifest.json' );
	if( manifest.status != 404 )
	{
		let manifestJSON = await manifest.json();
		for( let img of manifestJSON.images )
		{
			images.push( await fetch( `img/rotation/${img}`).then( response => response.blob() ) );
		}
		foundMax = true;
	}

	while( true )
	{
		if( !foundMax )
		{
			let imgResponse = await fetch( `img/rotation/PIC${((cur < 10 ) ? "0" + cur : cur)}.jpg` );
			if( imgResponse.status === 404 ) 
				foundMax = true;
			else
				images.push( await imgResponse.blob() );
		}
		portrait.style.backgroundImage =  `url(${URL.createObjectURL(images[(cur-1)%images.length])})`;
		await new Promise(resolve => setTimeout(resolve, delay));
		cur++;
	}
});