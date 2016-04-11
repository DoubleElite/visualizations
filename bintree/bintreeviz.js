// These are defaults.  Client can override.
var nodeColor = "#8090A0";
var txtColor = "#000000";

// By default, nodes are orange.  This won't last long though.
BinaryTree.prototype.color = 'orange';

// Code to display a node and its children on the screen.

BinaryTree.prototype.displayNode = function(node,height,level,x,y,xsize,ysize,context) {
  // Draw the node itself
  if (!node) return;
  context.beginPath();
  context.rect(x,y,xsize-2,ysize);
  node.ulX = x; node.ulY = y; node.lrX = x+xsize-2; node.lrY = y+ysize;
  context.fillStyle = node.color;
  context.fill();
  context.lineWidth = 2;
  context.strokeStyle = 'black';
  context.stroke();
  context.beginPath();

  // This is the default pointsize.  Adjusted below if too large
  // for the given data
  var pointsize = Math.min(Math.floor(xsize/3),ysize-4);
  context.font = ''+pointsize+'pt Calibri';
  var metrics = context.measureText(node.data1);
  var width = metrics.width;
  context.fillStyle = txtColor;

  // Loop and decrement pointsize until we have one that fits.
  // But, don't go below 10 point.
  while (width > xsize-2 && pointsize > 10) {
    pointsize--;
    context.font = ''+pointsize+'pt Calibri';
    metrics = context.measureText(node.data1);
    width = metrics.width;
  }
  // Display the nodes data
  context.fillText(node.data1,x+(xsize-width)/2, y+ysize/2+pointsize/2);

  // Figure out the relative x and y offset for children of this node
  var xdiff = Math.floor((xsize/2)*Math.pow(2,(height-level)));
  var ydiff = Math.floor((canvasHeight-ysize-10)/height);
  // Recursively display the left and right children of this node.
  if (node.children[0]) {
    this.displayNode(node.children[0], height, level+1, x-xdiff, y+ydiff, xsize, ysize, context);
    context.beginPath();
    context.moveTo(x+xsize/2,y+ysize);
    context.lineTo(x-xdiff+xsize/2,y+ydiff);
    context.stroke();
  }
  if (node.children[1]) {
    this.displayNode(node.children[1], height, level+1, x+xdiff, y+ydiff, xsize, ysize, context);
    context.beginPath();
    context.moveTo(x+xsize/2,y+ysize);
    context.lineTo(x+xdiff+xsize/2,y+ydiff);
    context.stroke();
  }
};

// This code recursively looks at each node in the tree (if the
// node parameter is not set) to determine whether an x and y value
// is within the boundaries of the node.  It returns the node containing
// the x and y coordinate.  If no such node exists, null is returned.
BinaryTree.prototype.findNode = function(x,y,node) {
  if (!node) node = this.tree;
  window.console && console.log(x+" "+y+" ulX:"+node.ulX+" ulY:"+node.ulY+" lrX:"+node.lrX+" lrY:"+node.lrY);
  if (x >= node.ulX && y>= node.ulY && x <= node.lrX && y <= node.lrY)
    return node;
  var left_var = node.children[0] ? this.findNode(x,y,node.children[0]) : null;
  var right_var = node.children[1] ? this.findNode(x,y,node.children[1]) : null;
  if (left_var == null) return right_var;
  return left_var;
}

// Display the entire binary tree.  This code just sets up the
// appropriate x and y size for the node based on tree height
// then calls displayNode to do the actual display.
BinaryTree.prototype.displayTree = function(context) {
  var height = this.treeHeight();
  var xsize;
  var ysize;

  if (height == 0 || height == 1) {
    xsize = Math.floor(canvasWidth * .25);
    ysize = Math.floor(canvasHeight *.25);
  }
  else {
    xsize = Math.floor(canvasWidth-Math.pow(2,height+1))/Math.pow(2,height);
    ysize = Math.floor(canvasHeight-Math.pow(2,height+1))/Math.pow(2,height);
  }
  modxsize = xsize*(1+zoomFactor/100);
  modysize = ysize*(1+zoomFactor/100);
  context.clearRect(0, 0, canvas.width, canvas.height);
  if (this.tree == null) return;
  this.displayNode(this.tree,height,1,canvasWidth/2-Math.floor(xsize/2),
		   5,modxsize,modysize,context);
};

// Given a node, highlight the node.  The highlight color is the
// 'opposite' color on the color wheel from the nodes current color.
BinaryTree.prototype.highlight = function(node) {
  var highlightColor = (0xffffff - parseInt('0x'+nodeColor.substring(1))).toString(16);
  var pad = "000000";
  var result = (pad+highlightColor).slice(-pad.length);
  node.color = '#'+result;
  return;
}
