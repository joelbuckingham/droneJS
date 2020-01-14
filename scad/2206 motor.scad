
//motor body
motorWidth = 26;
motorHeight = 20.5;

//setup mounting holes
//some hole patterns have 2 radii
holeOffset1 = 19;
holeOffset2 = 16;
holeWidth = 3;
holeDepth = 5;

//propeller shaft
shaftWidth = 2;
shaftHeight = 27.5;

//lower shaft
lowerShaftWidth = 3;
lowerShaftHeight = 2;

//bell housing collar
collarWidth = 3;
collarHeight = 23.5;

//build motor

//start with body, with mounting holes
difference() {

    color("red")
        cylinder(h=motorHeight,d=motorWidth,center=false,$fn=100);

    translate([ holeOffset1/2,0,-1])
        color("yellow")
            cylinder(h=holeDepth+1,d=holeWidth,center=false,$fn=100);

    translate([-holeOffset1/2,0,-1])
        color("yellow")
            cylinder(h=holeDepth+1,d=holeWidth,center=false,$fn=100);

    translate([0,holeOffset2/2,-1])
        color("yellow")
            cylinder(h=holeDepth+1,d=holeWidth,center=false,$fn=100);

    translate([0,-holeOffset2/2,-1])
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



