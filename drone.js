/*****************************************/
/************ Config.js ******************/
/*****************************************/

var config = {
	scene: {
		name:	"Quad Frame",
		bounds: {
			xMin: 0 * MM,
			xMax: 0 * MM,
			yMin: 0 * MM,
			yMax: 0 * MM,
			zMin: 0 * MM,
			zMax: 0 * MM,
			buffer: 1 * MM
		},
		voxelSize: 0.3*MM,
		dataset: new Union()
	},
	showHidden:	false,
	defaultBlend:	2 * MM,
	uiParams: [
		{
			name: "motorShellBottomOffset",
			desc: "Motor shell starting height",
			type: "double",
			rangeMin:2,
			rangeMax:9,
			step: 0.5,
			defaultVal: 6.5
		},
		{
			name: "motorShellThickness",
			desc: "Motor shell thickness ratio to motor",
			type: "double",
			rangeMin:0.65,
			rangeMax:1,
			step: 0.05,
			defaultVal: 0.8
		},
		{
			name: "motor",
			desc: "Moter Size",
			type: "enum",
			values: ["2206","1306"],
			defaultVal: "1306"
		},
		{
			name: "prop",
			desc: "Proppellor Size",
			type: "enum",
			values: ["5in","4in"],
			defaultVal: "4in"
		},
		{
			name: "showHidden",
			desc: "Show hidden structures",
			type: "enum",
			values: ["Yes","No"],
			defaultVal: "No"
		}
	],
	model: {
		motor:	{},
		motors: {
			"1306":{
				name: "1306",
				width: 17.7*MM,
				height: 12*MM,
				holeOffset1: 12*MM,
				holeOffset2: 12*MM,
				holeWidth: 2*MM,
				holeDepth: 3*MM,
				shaftWidth: 4*MM,
				shaftHeight: 27.4*MM,
				lowerShaftWidth: 2*MM,
				lowerShaftHeight: 2*MM,
				collarWidth: 8*MM,
				collarHeight: 14.5*MM
			},
			"2206":{
				name: "2206",
				width: 26*MM,
				height: 20.5*MM,
				holeOffset1: 19*MM,
				holeOffset2: 16*MM,
				holeWidth: 3*MM,
				holeDepth: 5*MM,
				shaftWidth: 2*MM,
				shaftHeight: 27.5*MM,
				lowerShaftWidth: 3*MM,
				lowerShaftHeight: 2*MM,
				collarWidth: 3*MM,
				collarHeight: 23.5*MM
			}
		},
		arms:	{
			xLength:	70*MM,
			yLength:	70*MM,
			zLength:	0*MM
		},
		body:	{},
		prop:	{},
		props:	{
			"5in":{
				name: "5 inch",
				diameter: 128*MM,
				height: 9*MM
			},
			"4in":{
				name: "4 inch",
				diameter: 102*MM,
				height: 9*MM
			}
		}
	}
};

//add pointers to config for easier code
var scene = config.scene;
var dataset = config.scene.dataset;
var uiParams = config.uiParams;
var model = config.model;
var motor = config.model.motor;
var arms = config.model.arms;
var body = config.model.body;
var prop = config.model.prop;
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

/*****************************************/
/************ Shape.js ******************/
/*****************************************/

var shape = {};

//create a new point
function pt( x, y, z )
{
	//create point
	var point = new Vector3d( x, y, z );

	//ensure bounds
	updateBoundsWithPoint( x, y, z );
	
	return point;
}

//create a new cylinder
function cyl( p1, p2, r1, r2 )
{
	//ensure radius 2
	r2 = r2 ? r2 : r1;
	
	//create cylinder
	var cylinder = new Cylinder( p1, p2, r1, r2 );
	
	//ensure bounds for first circle (use diagnal points)
	updateBoundsWithPoint( p1.x + r1, p1.y + r1, p1.z );
	updateBoundsWithPoint( p1.x - r1, p1.y - r1, p1.z );
	
	//ensure bounds for second circle (use diagnal points)
	updateBoundsWithPoint( p2.x + r2, p2.y + r2, p2.z );
	updateBoundsWithPoint( p2.x - r2, p2.y - r2, p2.z );
	
	return cylinder;
}

//create a new sphere
function sph( origin, radius )
{
	//create sphere
	var sphere = new Sphere( origin, radius );
	
	//ensure bounds for sphere (use diagnal points)
	updateBoundsWithPoint( origin.x + radius, origin.y + radius, origin.z + radius );
	updateBoundsWithPoint( origin.x - radius, origin.y - radius, origin.z - radius );
	
	return sphere;
}

//create a box
function box( x, y, z, cx, cy, cz, cornerRadius )
{
	//create box
	var boxValue = cornerRadius ? new Box( x, y, z, cx, cy, cz, cornerRadius ) : new Box( x, y, z, cx, cy, cz );
	
	//ensure bounds (use diagnal points)
	updateBoundsWithPoint( x + (cx/2), y + (cy/2), z + (cz/2) );
	updateBoundsWithPoint( x - (cx/2), y - (cy/2), z - (cz/2) );
	
	return boxValue;
}

function hollowBox( body, hollow, x, y, z, width, depth, hieght, cornerRadius, thickness )
{
	print( "hollow box" );
	
	if( typeof cornerRadius === undefined )
	{
		cornerRadius = hieght / 2;
	}
	
	if( typeof thickness === undefined )
	{
		cornerRadius = 2*MM;
	}
	
	var innerRadius = cornerRadius - thickness;
	var innerWidth = width - ( 2 * thickness );
	var innerDepth = depth - ( 2 * thickness );
	var innerHieght = hieght - ( 2 * thickness );
	
	//rounded box
	body.add(   new Box( x, y, z, width, depth, hieght, cornerRadius ) );
	
	//cut out center
	hollow.add( new Box( x, y, z, innerWidth, innerDepth, innerHieght, innerRadius ) );
}



//create a vertical slot
function vslot( p1, p2, slotWidth, depth )
{
	var radius = slotWidth / 2;
	
	//build endcaps
	var end1 = cyl( p1, pt( p1.x, p1.y, p1.z + depth ), radius );
	dataset.add( end1 );
	var end2 = cyl( p2, pt( p2.x, p2.y, p2.z + depth ), radius );
	dataset.add( end2 );
	
	//fill in space between
	var width = p2.x - p1.x;
	var length = p2.y - p1.y;
	var height = p2.z - p1.z;
	var x = p1.x + ( width ) / 2;
	var y = p1.y + ( length ) / 2;
	var z = p1.z + ( height ) / 2;
	var b = box( x, y, z, width, length, height );
	dataset.add( b );
}

//update bounding box to ensure it includes this point
function updateBoundsWithPoint( x, y, z )
{
	//x
	if( x > config.scene.bounds.xMax )
	{
		config.scene.bounds.xMax = x + config.scene.bounds.buffer;
	}
	else if( x < config.scene.bounds.xMin )
	{
		config.scene.bounds.xMin = x - config.scene.bounds.buffer;
	}
	
	//y
	if( y > config.scene.bounds.yMax )
	{
		config.scene.bounds.yMax = y + config.scene.bounds.buffer;
	}
	else if( y < config.scene.bounds.yMin )
	{
		config.scene.bounds.yMin = y - config.scene.bounds.buffer;
	}
			
	//z
	if( z > config.scene.bounds.zMax )
	{
		config.scene.bounds.zMax = z + config.scene.bounds.buffer;
	}
	else if( z < config.scene.bounds.zMin )
	{
		config.scene.bounds.zMin = z - config.scene.bounds.buffer;
	}
	
}

shape.pt = pt;
shape.updateBoundsWithPoint = shape.updateBoundsWithPoint;

