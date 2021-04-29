# aruco_checkerboard

## arcuco checkerboard generation

Generate an A4 ready to print, usefuel for photogrammetry or 3D scanning work.

You can supply the starting number for the board with a URl parameter start.

An example [PDF output here](./assets/preview.pdf).

### URL Guide and Examples

* Generate a page of 63 markers from ID 0 to 63: [link](https://aruco-checkerboard.vercel.app/);
* Generate a page of 63 markers from ID 100 to 162: [link](https://aruco-checkerboard.vercel.app/?start=100) using start url GET param; 
* Generate a page of 63 markers, all with the same color from ID 53 to 115: [link](https://aruco-checkerboard.vercel.app/?start=53&color=false) using color url GET param.

### Credits
Originally inspired by: [**Plane Calibration Assignment**](http://mesh.brown.edu/3DP-2018/hw3/hw3.html).

![](./assets/preview.png)

