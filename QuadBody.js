
/*****************************************/
/************ QuadBody.js ****************/
/*****************************************/

var body = new Union();
function buildArm( x,y,z, body, hollow )
{
	print( "Add arm with motor " + motor.name + " at " + x + ", " + y + ", " + z );
	
	//setup
	var origin = pt( x, y, z );
	var sphereOrigin = pt( x, y, z + config.inputs.motorShellBottomOffset * MM );
	
	// var hollow = new Union();
	// hollow.setBlend( 0.1 * MM);
	
	//motor nacelle
	var nacelle = sph( sphereOrigin, motor.width * config.inputs.motorShellThickness );
	body.add( nacelle );

	//motor body (hollow out space 3x the height and widen top by 4mm)
	var motorCore = cyl( origin, pt( x, y, z + 2*motor.height ), motor.width / 2, motor.width / 2 + 4*MM );
	hollow.add(motorCore);
	
	//show blade displacement (don't add if they won't be shown, to keep down scene size)
	if( config.inputs.showHidden == "Yes" )
	{
		var bladeBottom = z + motor.collarHeight + 1*MM;
		var blades = cyl( pt( x, y, bladeBottom  ), pt( x, y, bladeBottom + prop.height ), prop.diameter / 2 );
		hollow.add( blades );
	}

	//lower shaft (typically with C-clamp)
	var lowerShaft = cyl( origin , pt( x, y, z - 2*motor.lowerShaftHeight ), motor.lowerShaftWidth );
	hollow.add( lowerShaft );
  
    //add arm
	hollow.add( cyl( pt( -0.01*x, -0.01*y, 5*MM), pt( x, y, (z+5*MM)), 5*MM ) );
	body.add( cyl( pt( 0, 0, 5*MM), pt( x, y, (z+5*MM)), 7*MM ) );
  
    //drill holes for screws
	var holes = new Union();
	var lf = cyl( pt( x+motor.holeOffset1 / 2,y,z+0.1*MM), pt(x+motor.holeOffset1 / 2,y,z-motor.holeDepth), motor.holeWidth / 2 );
	var lfShaft = cyl( pt(x+motor.holeOffset1 / 2,y,z-motor.holeDepth), pt(x+motor.holeOffset1 / 2,y,z-motor.holeDepth-13*MM), 3*MM );
	hollow.add( lf );
	hollow.add( lfShaft );
	var rf = cyl( pt( x-motor.holeOffset1 / 2,y,z+0.1*MM), pt(x-motor.holeOffset1 / 2,y,z-motor.holeDepth), motor.holeWidth / 2);
	var rfShaft = cyl( pt(x-motor.holeOffset1 / 2,y,z-motor.holeDepth), pt(x-motor.holeOffset1 / 2,y,z-motor.holeDepth-13*MM), 3*MM);
	hollow.add( rf );
	hollow.add( rfShaft );
	var lr = cyl( pt( x,y+motor.holeOffset2 / 2,z+0.1*MM), pt(x,y+motor.holeOffset2 / 2,z-motor.holeDepth), motor.holeWidth / 2 );
	var lrShaft = cyl( pt(x,y+motor.holeOffset2 / 2,z-motor.holeDepth), pt(x,y+motor.holeOffset2 / 2,z-motor.holeDepth-13*MM), 3*MM );
	hollow.add( lr );
	hollow.add( lrShaft );
	var rr = cyl( pt( x,y-motor.holeOffset2 / 2,z+0.1*MM), pt(x,y-motor.holeOffset2 / 2,z-motor.holeDepth), motor.holeWidth / 2 );
	var rrShaft = cyl( pt(x,y-motor.holeOffset2 / 2,z-motor.holeDepth), pt(x,y-motor.holeOffset2 / 2,z-motor.holeDepth-13*MM), 3*MM );
	hollow.add( rr );
	hollow.add( rrShaft );
}

function buildFrame( body, hollow)
{
	print( "Build quad frame" );
	
	//find specs of selected inputs
	model.motor = model.motors[ config.inputs.motor ];
	motor = model.motor;	//TODO: THIS SHOULDN'T BE NEEDED!

	model.prop = model.props[ config.inputs.prop ];
	prop = model.prop;	//TODO: THIS SHOULDN'T BE NEEDED!

	//add each arm
	buildArm( arms.xLength, -arms.yLength, arms.zLength, body, hollow );
	buildArm( arms.xLength, arms.yLength, arms.zLength, body, hollow );
	buildArm( -arms.xLength, -arms.yLength, arms.zLength, body, hollow );
	buildArm( -arms.xLength, arms.yLength, arms.zLength, body, hollow );

	//add body
	buildBody( body, hollow, body, hollow );
}


function buildBody( body, hollow )
{
	print( "Build quad body" );
	
	//rounded box
	hollowBox( body, hollow, 0*MM, 0*MM, 0*MM, 60*MM, 70*MM, 30*MM, 15*MM, 3*MM );
	
	//remove center on top and bottom
	hollow.add( new Box( 0*MM, 0*MM, -1*MM, 40*MM, 50*MM, 32*MM, 5*MM ) );
}



function main(args)
{
	print( "Building scene '" + scene.name + "' at " + new Date() );

	//capture co-creator parameters
	config.inputs = args;

	//prepare scene
	dataset = new Union();
	scene.dataset = dataset;
	dataset.setBlend( config.defaultBlend );

	var hollow = new Union();
	hollow.setBlend( 0.1 * MM);

	//build quad frame
	buildFrame( body, hollow );
	
		//combine all
	var result;
	if( config.inputs.showHidden == "Yes" )
	{
		//show hidden elements
		result = new Union( body, hollow );
		result.setBlend( 0*MM );
	}
	else
	{
		//only show final model
		result = new Subtraction( body, hollow );
		result.setBlend( 2*MM );
	}

	//finalize and return scene for processing
	var finalScene = new Scene( result, new Bounds(scene.bounds.xMin,scene.bounds.xMax,scene.bounds.yMin,scene.bounds.yMax,scene.bounds.zMin,scene.bounds.zMax), scene.voxelSize );
	finalScene.setName( scene.name );
	return finalScene;
}

