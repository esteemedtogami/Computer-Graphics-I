"use strict";

var gl;
var points;

var count = 0;
var NumPoints = 5000;



window.onload = async function init()
{
    var my_loop;
    //var my_size = 1.0;
    var my_red = 1.0, my_blue = 0.0, my_green = 0.0;
    var my_scale = 0.75;
    for(my_loop = 0; my_loop < 10; my_loop++)
    {
        document.getElementById("vertex-shader").innerHTML = "attribute vec4 vPosition; void main(){ gl_PointSize = 2.0; gl_Position = vPosition;}";

        //Change Size
        if(my_loop < 5)
        {

            my_scale = my_scale + 0.1;
        }
        else
        {

            my_scale = my_scale - 0.1;
        }

        //Change Color
        my_red = Math.random();
        my_green = Math.random();
        my_blue = Math.random();

        //To prevent white/invisible...
        if(my_red >= 1 && my_green >= 1 && my_blue >= 1)
        {
            my_green = 0;
            my_blue = 0;
        }

        document.getElementById("fragment-shader").innerHTML = "precision mediump float; void main() { gl_FragColor = vec4( "+my_red.toFixed(1)+", "+my_green.toFixed(1)+", "+my_blue.toFixed(1)+", 1.0 );}";

        //Change NumPoints
        NumPoints = NumPoints + 750;

        var canvas = document.getElementById( "gl-canvas" );

        gl = WebGLUtils.setupWebGL( canvas );
        if ( !gl ) { alert( "WebGL isn't available" ); }

        //
        //  Initialize our data for the Sierpinski Gasket
        //

        // First, initialize the corners of our gasket with three points.

        var vertices = [
            vec2( -my_scale, -my_scale ),
            vec2(  0,  my_scale ),
            vec2(  my_scale, -my_scale )
        ];

        // Specify a starting point p for our iterations
        // p must lie inside any set of three vertices

        var u = add( vertices[0], vertices[1] );
        var v = add( vertices[0], vertices[2] );
        var p = scale( 0.25, add( u, v ) );

        // And, add our initial point into our array of points

        points = [ p ];

        // Compute new points
        // Each new point is located midway between
        // last point and a randomly chosen vertex

        for ( var i = 0; points.length < NumPoints; ++i ) {
            var j = Math.floor(Math.random() * 3);
            p = add( points[i], vertices[j] );
            p = scale( 0.5, p );
            points.push( p );
        }

        //
        //  Configure WebGL
        //
        gl.viewport( 0, 0, canvas.width, canvas.height );
        gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

        //  Load shaders and initialize attribute buffers

        var program = initShaders( gl, "vertex-shader", "fragment-shader" );
        gl.useProgram( program );

        // Load the data into the GPU

        var bufferId = gl.createBuffer();
        gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
        gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

        // Associate out shader variables with our data buffer

        var vPosition = gl.getAttribLocation( program, "vPosition" );
        gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
        gl.enableVertexAttribArray( vPosition );

        render();


        console.log(my_loop+1);
        // Sleep function found here:
        // https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
        await new Promise(r => setTimeout(r, 1000));


    }
};


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.POINTS, 0, points.length );
    return;
}
