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
            gl.lineWidth(3);
            gl.viewport(0, 0, canvas.width, canvas.height);

            // clear the color buffer
            gl.clear(gl.COLOR_BUFFER_BIT);

            let verticies = [];
            verticies.push (-0.8, 0.0);
            verticies.push (+0.8, 0.0);
            verticies.push (0.0, -0.8);
            verticies.push (0.0, +0.8);
            verticies.push (-0.8, +0.8);
            verticies.push (+0.8, -0.8);
            verticies.push (-0.8, -0.8);
            verticies.push (+0.8, +0.8);

            let vertexBuff = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuff);

            // copy the verticies data
            gl.bufferData(gl.ARRAY_BUFFER, Float32Array.from(verticies), gl.STATIC_DRAW);

            let posAttr = gl.getAttribLocation(prog, "vertexPos");
            gl.enableVertexAttribArray(posAttr);
            gl.vertexAttribPointer(posAttr,
                2,         /* number of components per attribute, in our case (x,y) */
                gl.FLOAT,  /* type of each attribute */
                false,     /* does not require normalization */
                0,         /* stride: number of bytes between the beginning of consecutive attributes */
                0);        /* the offset (in bytes) to the first component in the attribute array */
            gl.drawArrays(gl.LINES,
                0,  /* starting index in the array */
                8   /* we are drawing four vertices */
            );
        });
}