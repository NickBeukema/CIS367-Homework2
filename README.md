# Assignment 2

## Part 1 - [Jump](https://github.com/NickBeukema/CIS367-Homework2/tree/part-1)

1. Modify the program so it also shows two diagonals (the final graphics will show 4 lines)

## Part 2 - [Current Commit](#)

1. Modify the program
	* Change the triangle to a hexagon
	* Add a second circle of dots at a different radius so the final graphics show the triangle (or hexagon) surrounded by two circle of dots

2. Explain what happens when you replace `gl.POINTS` at line 70 to
	* (a) `gl.LINES`
		* This change took pairs of points and turned them into individual lines. For example, if given `(0,1), (1,0), (0,-1), (-1,0)`, it would result in two lines from `(0,1), (1,0)` and `(0,-1),(-1,0)`.
	* (b) `gl.LINE_STRIP`
		* This drawing mode would result in one line starting at the first point, and ending at the last point given. If using the points given in the example above, it would result in a line starting at `(0,1)` and ending at `(-1,0)`, while hitting each point in between with straight lines.
	* (c) `gl.LINE_LOOP`
		* The `LINE_LOOP` configuration does everything the above mode does (`LINE_STRIP`), except it connects the first point and last point, resulting in a shape with the given points, fully connected.