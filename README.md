# droneJS
Build a Drone using ShapeJS


This is an attempt to build a quadcopter that can be easily printed on a standard desktop 3D printer. The Shapeways IDE requires all code to be pasted (or typed) into a single text field an then executed. It doesn't take long for this type of development to outgrow a single text field. The separate files are an attempt to break the functionality up into more logical components.

The main files are:
* **QuadBody.js** - Constructs the body of the drone. The 'main' method required by ShapeJS is here.
* **shape.js** - Wrapper to help simplify some of the https://abfab3d.com/ interface and simplify some of the bounding box complexities.
* **config.js** - All frequently used values go here. Also defines the user-defined parameters.
* **build.bat** - Batch file to automate the condensing of all files into one and then copies the result to the clipboard for quick updates to the IDE.
* **drone.js(compiled)** - 


Goal: Build a robot using JavaScript, that runs JavaScript

* Using ShapeJS, design and print the robot.
* Using johnie-five.io to run ardruino or pi (nodebot)


## Run Script
1. **Build single JS file** by running the build.bat (or copy contents of drone.js)
2. **Load Shapeways IDE** by going to [http://shapejs.shapeways.com/ide]
3. **Run Script** Paste the code and click **Generate**

