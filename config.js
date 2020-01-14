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
