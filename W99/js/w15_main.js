function main()
{
    var volume = new KVS.LobsterData();
    var screen = new KVS.THREEScreen();

    screen.init( volume, {
        width: window.innerWidth,
        height: window.innerHeight,
        enableAutoResize: false
    });

    var bounds = Bounds( volume );
    screen.scene.add( bounds );
    var isovalue = 128;
    var surfaces = Isosurfaces( volume, isovalue );
    screen.scene.add( surfaces );

    document.addEventListener( 'mousemove', function() {
        screen.light.position.copy( screen.camera.position );
    });

    window.addEventListener( 'resize', function() {
        screen.resize( [ window.innerWidth, window.innerHeight ] );
    });
    
    screen.loop();
    
    var sampleSquare = function() {
  this.color = "#ff0000";
  this.isovalue = 128;
  this.apply = function(){
    screen.scene.remove( surfaces );
    surfaces = Isosurfaces( volume, isovalue, Color );
    screen.scene.add( surfaces );
	}
  this.Lambertian = function(){
    screen.scene.remove( light );
  }
  this.Phong = function(){
    screen.scene.add( light );

    var geometry = new THREE.Geometry();
    var material = new THREE.ShaderMaterial({
        vertexColors: THREE.VertexColors,
        vertexShader: document.
            getElementById('gouraud2.vert').text,
        fragmentShader: document.getElementById('gouraud2.frag').text,
	uniforms: {
	    light_position: {type: 'v3', value: light.position}
	}
    });
  }
  this.Box = true;
};    
    
    
    window.onload = function() {
    square = new sampleSquare();
    var gui = new dat.GUI();
    gui.addColor(square, 'color').onChange(setValue);
    gui.add(square, 'isovalue', 0, 255).step(1).onChange(setValue);
    gui.add(square, 'apply');
    gui.add(square, 'Lambertian');
    gui.add(square, 'Phong');
    gui.add(square, 'Box').onChange(setValue);
    };
    function setValue() {
    }
}
