

        document.addEventListener('pointerlockchange', changeCallback, false);
        document.addEventListener('mozpointerlockchange', changeCallback, false);
        document.addEventListener('webkitpointerlockchange', changeCallback, false);


var utils={
    deltaTime:0,
    time:0
    
}

var controls = {
    cameraX:0,
    cameraY:0,
    sensitivityX:1,
    sensitivityY:1,
    xAxis:0,
    zAxis:0,
    speed:0.005
}
var keys = {
    w:false,
    a:false,
    s:false,
    d:false
}

function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
}
var mouseListener;

function movementLoop(cam){
    var X=0,Y=0
    if(keys.a){
        controls.xAxis--
       }
    if(keys.d){
        controls.xAxis++ 
    }
    if(keys.s){
        controls.zAxis++
       }
    if(keys.w){
        controls.zAxis-- 
    }
  
    
    var vector = new THREE.Vector3(controls.xAxis,0,controls.zAxis)
    vector = vector.normalize()
    //cam.translateX(vector.x*utils.deltaTime*controls.speed)
    
    
    var matrix = new THREE.Matrix4();
matrix.extractRotation( camera.matrix );

var directionX = new THREE.Vector3( 1, 0, 0 );
    
    directionX.applyMatrix4(matrix)
    directionX.multiplyScalar(controls.xAxis)
    
    directionX.y=0;
    
    //directionX.multiplyScalar(utils.deltaTime*controls.speed*controls.xAxis)
    
    
var directionZ = new THREE.Vector3( 0, 0, 1 );

    
directionZ.applyMatrix4(matrix)
    directionZ.y=0;
    
    directionZ.multiplyScalar(controls.zAxis)
    //directionZ.multiplyScalar(utils.deltaTime*controls.speed*controls.zAxis)
    
var direction = directionX.add(directionZ).normalize().multiplyScalar(utils.deltaTime*controls.speed)
    
    cam.position.add(direction)
    
    controls.zAxis=0;
    controls.xAxis=0;
    
    
    
    
}

function keyUp(event){
    var h = false
    
    switch(event.key){
        case "w":keys.w=false
            break
        case "a":keys.a=false
            break
        case "s":keys.s=false
            break
        case "d":keys.d=false
            break
           }
    
    
    
    
}

function keyDown(event){
    var h = true
    
    switch(event.key){
        case "w":keys.w=h
            break
        case "a":keys.a=h 
            break
        case "s":keys.s=h
            break
        case "d":keys.d=h
            break
           }
    
    
}

function mouseMove(event){
        var x = event.movementX;
        var y = event.movementY;
        
        x = x*180/Math.PI;
        x /= 100000
        x *=controls.sensitivityX;
    
        x *=utils.deltaTime/16
        
         y = y*180/Math.PI;
        y /= 100000
        y *=controls.sensitivityY;
    
        y *=utils.deltaTime/16
        
        var vectorX =  new THREE.Vector3(1,0,0)
        //camera.worldToLocal(vectorX)
        var vectorY = new THREE.Vector3(0,1,0)
         //camera.worldToLocal(vectorY)
     //  camera.rotateOnAxis(vectorX,-y)
       // camera.rotateOnAxis(vectorY,-x)
        
        camera.rotation.order = "ZYX"
        
        var newX = clamp(camera.rotation.x-y,-Math.PI/2,Math.PI/2)
        var newY = camera.rotation.y-x
        
    
        camera.rotation.set(newX,newY,0)

        
        
        
        
    }

function changeCallback(e){
    
    
}






            var scene = new THREE.Scene();
			var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

			var renderer = new THREE.WebGLRenderer({antialias:true});
			renderer.setSize( document.body.offsetWidth, document.body.offsetHeight );
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
camera.translateY(1)
//var light = new THREE.PointLight( 0xffffff, 1, 1000 );
//light.position.set( 50, 50, 50 );
//scene.add( light );


console.log(camera.position)
var video = document.createElement("video");

var loader = new THREE.ObjectLoader();

loader.load(
	// resource URL
	"scene.json",

	// onLoad callback
	// Here the loaded data is assumed to be an object
	function ( obj ) {
		// Add the loaded object to the scene
		scene.add( obj );
        obj.name = "marco"
        
        obj.position.x=6
        
        obj.translateY(1.6)
        
        obj.scale.multiplyScalar(7)
        console.log(obj)
	},

	// onProgress callback
	function ( xhr ) {
		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
	},

	// onError callback
	function ( err ) {
		console.error( 'An error happened' );
	}
);


// Alternatively, to parse a previously loaded JSON structure






			

 var r = new XMLHttpRequest();



r.onload = function() {
    video.src = URL.createObjectURL(r.response);
    document.title="ready bruh"
    
    renderer.domElement.addEventListener("click",function(){
        
       
       renderer.domElement.requestPointerLock = renderer.domElement.requestPointerLock ||
                    renderer.domElement.mozRequestPointerLock ||
                    renderer.domElement.webkitRequestPointerLock;
       renderer.domElement.requestPointerLock();
        
        
    })
   renderer.domElement.onclick=function(){
       video.play();
       var width = video.videoWidth;
       var height = video.videoHeight;
       var aspectRatio = width/height;
       
       var geom = new THREE.PlaneGeometry(5*aspectRatio,5)
       var mat = new THREE.MeshBasicMaterial()
       mat.map=new THREE.VideoTexture( video )
       mat.map.minFilter = THREE.NearestFilter;
       mat.map.magFilter = THREE.NearestFilter;
       
       mat.side=THREE.DoubleSide
			var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
			var plane = new THREE.Mesh( geom, mat );
			scene.add( plane );
       plane.translateY(1)
       
       
       geom = new THREE.PlaneGeometry(100,100)
       mat= new THREE.MeshStandardMaterial();
       mat.color= new THREE.Color(255,255,255)
       //mat.emissive= new THREE.Color(255,0,0)
       mat.side=THREE.DoubleSide
       plane2 = new THREE.Mesh(geom,mat)
       scene.add(plane2)
       plane2.rotateX(-Math.PI/2)
       plane2.position.y-=1
       
       
       
       var light = new THREE.PointLight( 0xffffff, 2, 40,2);
       window.light=light;
       light.position.set(4, 1, 10 );
       scene.add(light)
       var h = 0;
       var animate = function () {
           h++
           
				requestAnimationFrame( animate );
           if(utils.time===0){
                utils.deltaTime=0;
               utils.time = new Date().getTime();
            
              }else{
                  var time = new Date().getTime();
                  utils.deltaTime=time-utils.time;
                 
              }
            movementLoop(camera)
				

				renderer.render( scene, camera );
           
           utils.time=time||new Date().getTime();
           
			};

			animate();
       renderer.domElement.addEventListener("mousemove",mouseMove)
       document.addEventListener("keydown",keyDown)
       document.addEventListener("keyup",keyUp)
        renderer.domElement.onclick=function(){}
   }
};


 r.open("GET", "flash2.mp4");
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

