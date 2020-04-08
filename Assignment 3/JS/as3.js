/*
Copyright (C) 2020 Sam Pickell
Last Updated: March 22, 2020
Filename: as3.js

This is the javascript file for
COMP 5460 Computer Graphics I Assignment 3
*/

// Canvas tutorial: https://www.w3schools.com/graphics/canvas_drawing.asp
var the_canvas = document.getElementById("my_canvas");

// Track Current Shape
var current_shape;

// Create the shapes
var my_line = the_canvas.getContext("2d");
var my_circle = the_canvas.getContext("2d");
var my_rectang = the_canvas.getContext("2d");
var my_triangle = the_canvas.getContext("2d");
var my_polygon = the_canvas.getContext("2d");
var my_clear = the_canvas.getContext("2d");

// Create default values for shape elements

// Line elements
var line_start_x = 10;
var line_start_y = 10;
var line_end_x = 10;
var line_end_y = 100;

// Circle elements
var circle_start_x = 30;
var circle_start_y = 30;
var circle_rad = 20;

// Rectangle elements
var rectangle_start_x = 10;
var rectangle_start_y = 10;
var rectangle_width = 100;
var rectangle_height = 200;

// Triangle Elements
var triangle_top_x = 100;
var triangle_top_y = 10;
var triangle_left_x = 50;
var triangle_left_y = 100;
var triangle_right_x = 150;
var triangle_right_y = 100;

// Polygon (Pentagon) Elements
var polygon_top_x = 100;
var polygon_top_y = 10;
var polygon_top_left_x = 50;
var polygon_top_left_y = 50;
var polygon_bottom_left_x = 75;
var polygon_bottom_left_y = 100;
var polygon_bottom_right_x = 125;
var polygon_bottom_right_y = 100;
var polygon_top_right_x = 150;
var polygon_top_right_y = 50;

// Track Scaling
var my_scale = 0;

// Draw shapes
function draw_line()
{
    // Draw
    my_line.beginPath();
    my_line.moveTo(line_start_x, line_start_y);
    my_line.lineTo(line_end_x, line_end_y);
    my_line.stroke();
}

function draw_circle()
{
    // Draw
    my_circle.beginPath();
    my_circle.arc(circle_start_x, circle_start_y, circle_rad, 0, (2*Math.PI));
    my_circle.stroke();
}

function draw_rectangle()
{
    // Draw
    my_rectang.beginPath();
    my_rectang.rect(rectangle_start_x, rectangle_start_y, rectangle_width, rectangle_height);
    my_rectang.stroke()
}

function draw_triangle()
{
    // Draw
    my_triangle.beginPath();
    my_triangle.moveTo(triangle_top_x, triangle_top_y);
    my_triangle.lineTo(triangle_left_x, triangle_left_y);
    my_triangle.lineTo(triangle_right_x, triangle_right_y);
    my_triangle.lineTo(triangle_top_x, triangle_top_y);
    my_triangle.stroke();
}

function draw_polygon()
{
    // Draw
    my_polygon.beginPath();
    my_polygon.moveTo(polygon_top_x, polygon_top_y);
    my_polygon.lineTo(polygon_top_left_x, polygon_top_left_y);
    my_polygon.lineTo(polygon_bottom_left_x, polygon_bottom_left_y);
    my_polygon.lineTo(polygon_bottom_right_x, polygon_bottom_right_y);
    my_polygon.lineTo(polygon_top_right_x, polygon_top_right_y);
    my_polygon.lineTo(polygon_top_x, polygon_top_y);
    my_polygon.stroke();
}

function canvas_clear()
{
    my_clear.clearRect(0, 0, the_canvas.width, the_canvas.height);
}

function draw_shape(callback)
{
    canvas_clear();

    // Reset Vars to defaults

    // Line elements
    line_start_x = 10;
    line_start_y = 10;
    line_end_x = 10;
    line_end_y = 100;

    // Circle elements
    circle_start_x = 30;
    circle_start_y = 30;
    circle_rad = 20;

    // Rectangle elements
    rectangle_start_x = 10;
    rectangle_start_y = 10;
    rectangle_width = 100;
    rectangle_height = 200;

    // Triangle Elements
    triangle_top_x = 100;
    triangle_top_y = 10;
    triangle_left_x = 50;
    triangle_left_y = 100;
    triangle_right_x = 150;
    triangle_right_y = 100;

    // Polygon (Pentagon) Elements
    polygon_top_x = 100;
    polygon_top_y = 10;
    polygon_top_left_x = 50;
    polygon_top_left_y = 50;
    polygon_bottom_left_x = 75;
    polygon_bottom_left_y = 100;
    polygon_bottom_right_x = 125;
    polygon_bottom_right_y = 100;
    polygon_top_right_x = 150;
    polygon_top_right_y = 50;

    // Fix Scaling
    var i;

    if(my_scale < 0)
    {
        for(i = 0; i > my_scale; i--)
        {
            // Increase shape size
            my_line.scale(1.15, 1.15);
            my_circle.scale(1.15, 1.15);
            my_rectang.scale(1.15, 1.15);
            my_triangle.scale(1.15, 1.15);
            my_polygon.scale(1.15, 1.15);
        }
    }
    else if(my_scale > 0)
    {
        for(i = 0; i < my_scale; i++)
        {
            // Decrease shape size
            my_line.scale(0.87, 0.87);
            my_circle.scale(0.87, 0.87);
            my_rectang.scale(0.87, 0.87);
            my_triangle.scale(0.87, 0.87);
            my_polygon.scale(0.87, 0.87);
        }
    }
    my_scale = 0;

    // Update Current Shape
    current_shape = callback;

    callback();
}

// Used to redraw a shape due to a transformation
function update_shape()
{
    canvas_clear();
    current_shape();
}

function move_up()
{
    // Decrease shape Y coords
    line_start_y -= 10;
    line_end_y -= 10;

    circle_start_y -= 10;

    rectangle_start_y -= 10;

    triangle_top_y -= 10;
    triangle_left_y -= 10;
    triangle_right_y -= 10;

    polygon_top_y -= 10;
    polygon_top_left_y -= 10;
    polygon_bottom_left_y -= 10;
    polygon_bottom_right_y -= 10;
    polygon_top_right_y -= 10;

    // Redraw
    update_shape();
}

function move_down()
{
    // Increase shape Y coords
    line_start_y += 10;
    line_end_y += 10;

    circle_start_y += 10;

    rectangle_start_y += 10;

    triangle_top_y += 10;
    triangle_left_y += 10;
    triangle_right_y += 10;

    polygon_top_y += 10;
    polygon_top_left_y += 10;
    polygon_bottom_left_y += 10;
    polygon_bottom_right_y += 10;
    polygon_top_right_y += 10;

    // Redraw
    update_shape();
}

function move_left()
{
    // Decrease shape X coords
    line_start_x -= 10;
    line_end_x -= 10;

    circle_start_x -= 10;

    rectangle_start_x -= 10;

    triangle_top_x -= 10;
    triangle_left_x -= 10;
    triangle_right_x -= 10;

    polygon_top_x -= 10;
    polygon_top_left_x -= 10;
    polygon_bottom_left_x -= 10;
    polygon_bottom_right_x -= 10;
    polygon_top_right_x -= 10;

    // Redraw
    update_shape();
}

function move_right()
{
    // Increase shape X coords
    line_start_x += 10;
    line_end_x += 10;

    circle_start_x += 10;

    rectangle_start_x += 10;

    triangle_top_x += 10;
    triangle_left_x += 10;
    triangle_right_x += 10;

    polygon_top_x += 10;
    polygon_top_left_x += 10;
    polygon_bottom_left_x += 10;
    polygon_bottom_right_x += 10;
    polygon_top_right_x += 10;

    // Redraw
    update_shape();
}

function scale_up_shape()
{
    // Increase shape size
    my_line.scale(1.15, 1.15);

    my_circle.scale(1.15, 1.15);

    my_rectang.scale(1.15, 1.15);

    my_triangle.scale(1.15, 1.15);

    my_polygon.scale(1.15, 1.15);

    // Track the size increase
    my_scale += 1;

    // Redraw
    update_shape();
}

function scale_down_shape()
{
    // Decrease shape size
    my_line.scale(0.87, 0.87);

    my_circle.scale(0.87, 0.87);

    my_rectang.scale(0.87, 0.87);

    my_triangle.scale(0.87, 0.87);

    my_polygon.scale(0.87, 0.87);

    // Track the size decrease
    my_scale -= 1;

    // Redraw
    update_shape();
}

function rotate_left()
{
    my_triangle.rotate(-20*(Math.PI/180));

    // Redraw
    update_shape();
}

function rotate_right()
{
    my_triangle.rotate(20*(Math.PI/180));

    // Redraw
    update_shape();
}
