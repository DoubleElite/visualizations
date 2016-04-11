function TreeData(d) {
  this.data1 = d;
  this.data2 = -1;
  this.special = 'none';
  this.zoom = 1;
  this.numchildren = 0;
  this.children = new Array();
  this.children[0] = undefined;
  this.children[1] = undefined;
  this.parent = null;
  this.ulX = 0;
  this.ulY = 0;
  this.lrX = 0;
  this.lrT = 0;
 };

function BinaryTree() {

/**
 * The "core" functionality of a binary tree.
 * One could build a heap on top of this I suppose.
*/
  this.tree = null;
  this.knownheight = false;
  this.height =0;
  this.preorder = [];
  this.postorder = [];
  this.inorder = [];
  this.traversals = false;

  /**
   * Return the left child of a given node.  null if it doesn't exist
   * node is an object of type TreeData
   */
  this.left = function(node) {
    if (node.numchildren > 0) {
      return node.children[0]; }
    else {
      return null; }
  };
  /**
   * Return the right childe of a given node.  null if it doesn't exist
   * node is an object of type TreeData
   */
  this.right = function(node) {
    if (node.numchildren > 1) {
      return node.children[1]; }
    else {
      return null; }
  };
  /**
   * Return the parent of a given node.
   * node is an object of type TreeData
   */
  this.parent = function(node) {
     return node.parent;
  };
 
   /**
   * Set 'parent's left child to child.
   * parent and child are of type TreeData
   */
  this.makeleft = function(parent,child) {
    this.knownheight = false;
    if (this.tree == null) this.tree = parent;
    parent.children[0] = child; // Set left-child of parent to be child
    parent.numchildren++;       
    child.parent = parent;      // Set the child's parent to be parent
    this.traversals = false; }

  /**
   * Set 'parent's right child to child.
   */
  this.makeright = function(parent,child) {
    this.knownheight = false;
    if (this.tree == null) this.tree = parent;
    parent.children[1] = child; 
    parent.numchildren++;
    child.parent = parent;
    this.traversals = false; }

  this.deleteNode = function(node) {
    this.knownheight = false;
    if (this.tree == node) {
      this.tree = null;
      return; }
    var parent = node.parent;
    if (parent.children[0] && parent.children[0]==node)
      parent.children[0] = undefined;
    if (parent.children[1] && parent.children[1]==node)
      parent.children[1] = undefined;
    parent.numchildren--;
    this.traversals = false; }
    
  this.dump = function() { this.renderTree(this.tree); }

  this.renderTree = function(node) {
    document.writeln(node.data1);
    if (node.children[0]) {
      this.renderTree(node.children[0]); }
    if (node.children[1]) {
      this.renderTree(node.children[1]); }
  }

  this.treeHeighthelper = function(node) {
    var l = -1;
    var r = -1;
    if (node && node.children) {
      if (!node.children[0] && !node.children[1]) return 0;
      if (node.children[0]) { l = this.treeHeighthelper(node.children[0])+1; }
      if (node.children[1]) { r = this.treeHeighthelper(node.children[1])+1; }
      if (l > r) return l;
      return r; }
    else
      { return 0; }
  }

  this.treeHeight = function() {
    if (this.knownheight == false) { this.height = this.treeHeighthelper(this.tree);
				this.knownheight = true; }
    return this.height;
  }

  this.buildtraversals = function(node) {
    if (!node) {
      if (this.traversals == true) { return; }
      else { 
	this.preorder = [];
	this.postorder = [];
	this.inorder = [];
	node = this.tree; }
    }
    this.preorder.push(node);
    if (node.children) {
      if (!node.children[0] && !node.children[1])
	{
	  this.postorder.push(node);
	  this.inorder.push(node);
	  return;
	}			      
      if (node.children[0]) {  // If the node has a left-child
	this.buildtraversals(node.children[0]); }
      this.inorder.push(node);
      if (node.children[1]) {  // If the node has a right-child
	this.buildtraversals(node.children[1]); }
      this.postorder.push(node);
    }
    else {
      this.postorder.push(node);
      this.inorder.push(node);
    }
    if (this.tree == node) 
    {
      this.traversals = true;
    }
    return;
  };
  
  this.nextPre = function(x) {
    this.buildtraversals();
    if (!x && typeof this.nextPre.counter == 'undefined')
      { this.nextPre.counter = 0;}
    if (x) { this.nextPre.counter = x; }
    if (this.nextPre.counter >= this.preorder.length)   // Return null and resest
      { this.nextPre.counter = 0; return null; }
    return(this.preorder[this.nextPre.counter++]);
  };
  this.nextPost = function(x) {
    this.buildtraversals();
    if (!x && typeof this.nextPost.counter == 'undefined')
      { this.nextPost.counter = 0;}
    if (x) { this.nextPost.counter = x; }
    if (this.nextPost.counter >= this.postorder.length)   // Return null and resest
      { this.nextPost.counter = 0; return null; }
    return(this.postorder[this.nextPost.counter++]);
  };
  this.nextIn = function(x) {
    this.buildtraversals();
    if (!x && typeof this.nextIn.counter == 'undefined')
      { this.nextIn.counter = 0;}
    if (x) { this.nextIn.counter = x; }
    if (this.nextIn.counter >= this.inorder.length)   // Return null and resest
      { this.nextIn.counter = 0; return null; }
    return(this.inorder[this.nextIn.counter++]);
  };
};
