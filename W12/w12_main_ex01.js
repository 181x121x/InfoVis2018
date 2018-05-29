var streamline = new KVS.Streamline();
var screen = new KVS.THREEScreen();
var volume = new KVS.CreateTornadoData( 64, 64, 64 );

function DebugPrint(str)
{
    var out = document.getElementById("debug");
    if (!out) return;
    out.value += str;
}

function InitSlideBar(AxisData)
{
    var range = document.getElementById('x-seed');
    var val = document.getElementById('x-output');
    range.max = AxisData-1.01;
    range.min = 0;
    range.step = 0.01;
    range.value = (AxisData-1)/2;
    val.value = (AxisData-1)/2;
    
    range = document.getElementById('y-seed');
    val = document.getElementById('y-output');
    range.max = AxisData-1.01;
    range.min = 0;
    range.step = 0.01;
    range.value = (AxisData-1)/2;
    val.value = (AxisData-1)/2;
    
    range = document.getElementById('z-seed');
    val = document.getElementById('z-output');
    range.max = AxisData-1.01;
    range.min = 0;
    range.step = 0.01;
    range.value = (AxisData-1)/2;
    val.value = (AxisData-1)/2;
}

function ApplyClicked()
{
    //alert('clicked');
    var xval = document.getElementById('x-output');
    var yval = document.getElementById('y-output');
    var zval = document.getElementById('z-output');
    

    streamline.setSeedPoint( new KVS.Vec3(xval,yval,zval) );
        
    var line2 = KVS.ToTHREELine( streamline.exec( volume ) );
    screen.scene.add( line2 );
    screen.draw();
}

function main()
{
    var defaultAxisData = 64;
    //var volume = new KVS.CreateTornadoData( 64, 64, 64 );
    //var screen = new KVS.THREEScreen();
    InitSlideBar(defaultAxisData);
    
    screen.init( volume, {
        width: window.innerWidth * 0.6,
        height: window.innerHeight,
        targetDom: document.getElementById('display'), 
        enableAutoResize: false
    } );
    setup();
    screen.loop();

    function setup()
    {
        var color = new KVS.Vec3( 0, 0, 0 );
        var box = new KVS.BoundingBox();
        box.setColor( color );
        box.setWidth( 2 );

        //var seed_point = volume.objectCenter();
        var seed_point = new KVS.Vec3(31.5,31.5,31.5); 
        //var streamline = new KVS.Streamline();
        streamline.setIntegrationStepLength( 0.5 );
        streamline.setIntegrationTime( 800 );
        streamline.setIntegrationMethod( KVS.RungeKutta4 );
        streamline.setIntegrationDirection( KVS.ForwardDirection );
        streamline.setLineWidth( 5 );
        streamline.setSeedPoint( seed_point );
        
        var line1 = KVS.ToTHREELine( box.exec( volume ) );
        var line2 = KVS.ToTHREELine( streamline.exec( volume ) );
        screen.scene.add( line1 );
        screen.scene.add( line2 );
        screen.draw();
        //screen.camera.position.set(0,0,12);
        document.addEventListener( 'mousemove', function() {
            screen.light.position.copy( screen.camera.position );
        });
        window.addEventListener('resize', function() {
            screen.resize([ window.innerWidth * 0.6, window.innerHeight ]);
        });
    }
}
