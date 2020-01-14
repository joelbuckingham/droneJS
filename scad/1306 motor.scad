

//setup mounting holes
//some hole patterns have 2 radii
holeOffset1 = 12;
holeOffset2 = 12;
holeWidth = 2;
holeDepth = 3;

//propeller shaft
shaftWidth = 4;
shaftHeight = 27.4;

//lower shaft
lowerShaftWidth = 2;
lowerShaftHeight = 2;

//bell housing collar
collarWidth = 8;
collarHeight = 14.5;

//build motor

//start with body, with mounting holes
difference() {

    color("red")
        cylinder(h=12.5,d=17.7,center=false,$fn=100);

    translate([ holeOffset1/2,0,-1])
        color("yellow")
            cylinder(h=holeDepth+1,d=holeWidth,center=false,$fn=100);

    translate([-holeOffset1/2,0,-1])
        color("yellow")
            cylinder(h=holeDepth+1,d=holeWidth,center=false,$fn=100);

    translate([0,holeOffset1/2,-1])
        color("yellow")
            cylinder(h=holeDepth+1,d=holeWidth,center=false,$fn=100);

    translate([0,-holeOffset1/2,-1])
        color("yellow")
            cylinder(h=holeDepth+1,d=holeWidth,center=false,$fn=100);
}

//prop shaft
color("gray")
    cylinder(h=shaftHeight,d=shaftWidth,center=false,$fn=100);

//collar
color("gray")
    cylinder(h=collarHeight,d=collarWidth,center=false,$fn=100);

//lower shaft (typically with C-clamp)
translate([0,0,-lowerShaftHeight])
    color("gray")
        cylinder(h=lowerShaftHeight,d=lowerShaftWidth,center=false,$fn=100);



