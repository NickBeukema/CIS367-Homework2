const NUM_CIRCLE_POINTS = 12;

function main() {
    let canvas = document.getElementById("my-canvas");

    // setupWebGL is defined in webgl-utils.js, it returns a WebGLRenderingContext
    let gl = WebGLUtils.setupWebGL(canvas);

    // Load the shader pair. 2nd arg is vertex shader, 3rd arg is fragment shader
    ShaderUtils.loadFromFile(gl, "vshader.glsl", "fshader.glsl")
        .then( (prog) => {

            gl.useProgram(prog);

            // Use black RGB=(0,0,0) for the clear color
            gl.clearColor(0.0, 0.0, 0.0, 1.0);

            gl.viewport(0, 0, canvas.width, canvas.height);

            // clear the color buffer
            gl.clear(gl.COLOR_BUFFER_BIT);

            // Hexagon

            let vertices = [];

            let rad = 0.5;
            let yCoord = rad * Math.sin(Math.PI/3);

            vertices.push (rad/2, yCoord);   // Vert A
            vertices.push (rad, 0.0);        // Vert B
            vertices.push (0.0, 0.0);        // Origin

            vertices.push (rad, 0.0);        // Vert B
            vertices.push (rad/2, -yCoord);  // Vert C
            vertices.push (0.0, 0.0);        // Origin

            vertices.push (rad/2, -yCoord);  // Vert C
            vertices.push (-rad/2, -yCoord); // Vert D
            vertices.push (0.0, 0.0);        // Origin

            vertices.push (-rad/2, -yCoord); // Vert D
            vertices.push (-rad, 0.0);       // Vert E
            vertices.push (0.0, 0.0);        // Origin

            vertices.push (-rad, 0.0);       // Vert E
            vertices.push (-rad/2, yCoord);  // Vert F
            vertices.push (0.0, 0.0);        // Origin

            vertices.push (-rad/2, yCoord);  // Vert F
            vertices.push (rad/2, yCoord);   // Vert A
            vertices.push (0.0, 0.0);        // Origin


            let triangleBuff = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, triangleBuff);

            // copy the vertices data
            gl.bufferData(gl.ARRAY_BUFFER, Float32Array.from(vertices), gl.STATIC_DRAW);


            // Larger Circle

            let circVertices = [];
            let circleRad = 0.8;
            for (let k = 0; k < NUM_CIRCLE_POINTS; k++) {
                let angle = 2 * k * Math.PI / NUM_CIRCLE_POINTS;
                circVertices.push(circleRad * Math.cos(angle), circleRad * Math.sin(angle));
            }

            let circleBuff = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, circleBuff);
            gl.bufferData(gl.ARRAY_BUFFER, Float32Array.from(circVertices), gl.STATIC_DRAW);



            // Smaller Circle

            let smallerCirclVertices = [];
            let smallerCircleRad = 0.6;
            for (let k = 0; k < NUM_CIRCLE_POINTS; k++) {
                let angle = 2 * k * Math.PI / NUM_CIRCLE_POINTS;
                smallerCirclVertices.push(smallerCircleRad * Math.cos(angle), smallerCircleRad * Math.sin(angle));
            }

            let smallerCircleBuff = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, smallerCircleBuff);
            gl.bufferData(gl.ARRAY_BUFFER, Float32Array.from(smallerCirclVertices), gl.STATIC_DRAW);





            let posAttr = gl.getAttribLocation(prog, "vertexPos");
            gl.enableVertexAttribArray(posAttr);

            gl.bindBuffer(gl.ARRAY_BUFFER, triangleBuff);
            gl.vertexAttribPointer(posAttr,
                2,         /* number of components per attribute, in our case (x,y) */
                gl.FLOAT,  /* type of each attribute */
                false,     /* does not require normalization */
                0,         /* stride: number of bytes between the beginning of consecutive attributes */
                0);        /* the offset (in bytes) to the first component in the attribute array */
            gl.drawArrays(gl.TRIANGLES,
                0,  /* starting index in the array */
                18   /* we are drawing four vertices */
            );

            gl.bindBuffer(gl.ARRAY_BUFFER, circleBuff);
            gl.vertexAttribPointer(posAttr,
                2,        /* number of components per attribute, in our case (x,y) */
                gl.FLOAT, /* type of each attribute */
                false,    /* does not require normalization */
                0,        /* stride: number of bytes between the beginning of consecutive attributes */
                0       /* the offset (in bytes) to the first component in the attribute array */
            );
            gl.drawArrays(gl.POINTS, 0, NUM_CIRCLE_POINTS);




            gl.bindBuffer(gl.ARRAY_BUFFER, smallerCircleBuff);
            gl.vertexAttribPointer(posAttr,
                2,        /* number of components per attribute, in our case (x,y) */
                gl.FLOAT, /* type of each attribute */
                false,    /* does not require normalization */
                0,        /* stride: number of bytes between the beginning of consecutive attributes */
                0       /* the offset (in bytes) to the first component in the attribute array */
            );
            gl.drawArrays(gl.POINTS, 0, NUM_CIRCLE_POINTS);
        });
}