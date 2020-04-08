/*
Copyright (C) 2020 Sam Pickell
Last Updated: April 3, 2020
Filename: as5.js

This is the javascript file for
COMP 5460 Computer Graphics I Assignment 5
*/

// Canvas code from my AS3
var the_canvas = document.getElementById("my_canvas");

var my_line = the_canvas.getContext("2d");
var my_clear = the_canvas.getContext("2d");

function canvas_clear()
{
    my_clear.clearRect(0, 0, the_canvas.width, the_canvas.height);
}

//DD A Function for line generation, converted from provided sample code
function DDA()
{
    canvas_clear();

    my_line.save();
    my_line.translate(400, 250);

    var x;

    // Pull the numbers from the textboxes
    var x0 = parseFloat(document.getElementById("DDA_x0").value);
    var y0 = parseFloat(document.getElementById("DDA_y0").value);
    var x1 = parseFloat(document.getElementById("DDA_x1").value);
    var y1 = parseFloat(document.getElementById("DDA_y1").value);

    var dy = y1 - y0;
    var dx = x1 - x0;
    var m = dy / dx;
    var y = y0;

    my_line.beginPath();
    for (x = x0; x <= x1; x++)
    {
        if(x === x0)
        {
            my_line.moveTo(x, y)
            y = y - m;
        }
        else
        {
            my_line.lineTo(x, y)
            y = y - m;
        }
        my_line.stroke();

    }

    my_line.restore();
}

// Circle functions, converted from provided sample code
function CirclePoints(x, y)
{
    my_line.beginPath();
    my_line.moveTo(x, y);
    my_line.lineTo(y, x);
    my_line.lineTo(y, -x);
    my_line.lineTo(x, -y);
    my_line.lineTo(-x, -y);
    my_line.lineTo(-y, -x);
    my_line.lineTo(-y, x);
    my_line.lineTo(-x, y);
    my_line.lineTo(x, y);
    my_line.stroke();
}

function MidpointCircle()
{
    canvas_clear();

    my_line.save();
    my_line.translate(400, 250);

    // Modified so that x, y, and radius are input values, per the pdf
    var x = parseInt(document.getElementById("Cir_x").value);
    var y = parseInt(document.getElementById("Cir_y").value);
    var radius = parseInt(document.getElementById("Cir_rad").value);
    var d = 1 - radius;

    CirclePoints(x, y);

    while (y > x) {
        if (d < 0) {
            d = d + 2 * x + 3;
        }
        else {
            d = d + 2 * (x - y) + 5;
            y-=1;
        }
        x+=1;
        CirclePoints(x, y);
    }

    my_line.restore();
}

// Ellipse functions, converted from provided sample code
function EllipsePoints(x, y)
{
    my_line.beginPath();
    my_line.moveTo(x, y);
    my_line.lineTo(-x, y);
    my_line.lineTo(x, -y);
    my_line.lineTo(-x, -y);
    my_line.lineTo(x, y);
    my_line.stroke();
}

function MidpointEllipse()
{
    canvas_clear();

    my_line.save();
    my_line.translate(400, 250);

    var a = parseFloat(document.getElementById("Ell_a").value);
    var b = parseFloat(document.getElementById("Ell_b").value);
    var d2;
    var x = 0;
    var y = b;
    var d1 = (b*b) - (a*a*b) + (0.25*a*a);

    EllipsePoints(x, y);

    while (((a*a)*(y-0.5)) > ((b*b)*(x+1))) {
        if (d1 < 0) {
            d1 = d1 + ((b*b)*(2*x+3));
        }
        else {
            d1 = d1 + ((b*b)*(2*x+3)) + ((a*a)*(-2*y+2));
            y-=1;
        }
        x+=1;
        EllipsePoints(x, y);
    }

    d2 = ((b*b)*(x+0.5)*(x+0.5))+((a*a)*(y-1)*(y-1))-(a*a*b*b);
    while (y > 0) {
        if (d2 < 0) {
            d2 = d2 + ((b*b)*(2*x+2)) + ((a*a)*(-2*y+3));
            x+=1;
        }
        else {
            d2 = d2 + ((a*a)*(-2*y+3));
        }
        y-=1;
        EllipsePoints(x, y);
    }

    my_line.restore();
}

// Midpoint Line functions, converted from provided sample code
function MidpointLine()
{
    canvas_clear();

    my_line.save();
    my_line.translate(400, 250);

    // User Input
    var x0 = parseFloat(document.getElementById("Line_x0").value);
    var y0 = parseFloat(document.getElementById("Line_y0").value);
    var x1 = parseFloat(document.getElementById("Line_x1").value);
    var y1 = parseFloat(document.getElementById("Line_y1").value);

    // Additional variable setup
    var dx = x1 - x0;
    var dy = y1 - y0;
    var d = dy * 2 - dx;
    var incrE = dy * 2;
    var incrSE = (dy - dx) * 2;
    // (Additional Slopes)
    var incrS = dx * 2;
    var incrSW = (dy + dx) * 2;
    var incrW = dy / 2;
    var incrNW = (dy - dx) / 2;
    var incrN = dx / 2;
    var incrNE = (dy + dx) / 2;

    var x = x0;
    var y = y0;

    my_line.beginPath();
    my_line.moveTo(x, y);

    if(x < x1)
    {
        while(x < x1)
        {
            if(d < 0)
            {
                if(y1 < 0)
                {
                    d += incrSE;
                    x += 1;
                    y += 1;
                }
                else
                {
                    d += incrE;
                    x += 1;
                }
            }
            else
            {
                d += incrNE;
                x += 1;
                y -= 1;
            }
            my_line.lineTo(x, y);
        }
        my_line.stroke();
    }
    else if(x > x1)
    {
        while(x > x1)
        {
            if(d < 0)
            {
                if(y1 <= 0)
                {
                    d += incrSW;
                    x -= 1;
                    y += 1;
                }
            }
            else
            {
                if(y1 > 0)
                {
                    d += incrNW;
                    x -= 1;
                    y -= 1;
                }
                else
                {
                    d += incrW;
                    x -= 1;
                }
            }
            my_line.lineTo(x, y);
        }
        my_line.stroke();
    }
    else if(x == x1)
    {
        var i = y0;
        if(y0 < y1)
        {
            for(i; i < y1; i++)
            {
                y -= 1; //North
                my_line.lineTo(x, y);
            }
            my_line.stroke();
        }
        else
        {
            for(i; i > y1; i--)
            {
                y += 1; //South
                my_line.lineTo(x, y);
            }
            my_line.stroke();
        }
    }

    my_line.restore();
}
