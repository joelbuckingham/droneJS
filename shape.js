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

