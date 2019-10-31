			var scene = new THREE.Scene();
			var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

			var renderer = new THREE.WebGLRenderer();
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );
/*
			var geometry = new THREE.BoxGeometry( 1, 1, 1 );
			var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
			var cube = new THREE.Mesh( geometry, material );
			scene.add( cube );
*/
var geometry = new THREE.BoxGeometry( 1, 1, 1 );
			var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );




			camera.translateZ( 10 );
//var light = new THREE.PointLight( 0xffffff, 1, 1000 );
//light.position.set( 50, 50, 50 );
//scene.add( light );
var video = document.createElement("video");





			

 var r = new XMLHttpRequest();
var video = document.createElement("video");


r.onload = function() {
    video.src = URL.createObjectURL(r.response);
    document.title="ready bruh"
   renderer.domElement.onclick=function(){
       video.play();
       var width = video.videoWidth;
       var height = video.videoHeight;
       var aspectRatio = width/height;
       
       var geom = new THREE.PlaneGeometry(5*aspectRatio,5)
       var mat = new THREE.MeshStandardMaterial()
       mat.emissiveMap=new THREE.VideoTexture( video )
       mat.emissive= new THREE.Color("white")
       mat.metalness = 0;
       mat.roughness = 0;
       
			var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
			var plane = new THREE.Mesh( geom, mat );
			scene.add( plane );
       
       var animate = function () {
				requestAnimationFrame( animate );

				plane.rotation.x += 0.01;
				plane.rotation.y += 0.01;

				renderer.render( scene, camera );
			};

			animate();
   }
};


 r.open("GET", "https://comic-flash.github.io/flash2/flash2.mp4?raw=1");
    r.responseType = "blob";
r.send();

r.onloadstart = function(){
    
    
    
    
}
r.onprogress = function(e){
    var str = ((e.loaded/e.total)*100).toFixed()+"%"
    console.log(str)

    
}
r.onabort = function(){
    console.log("abort")
    
}
r.onerror=function(){
    console.log("error")

}
r.ontimeout=function(){
    console.log("timeout")
    
}