//collapsed, expanded, selected, leaf
//display none or inherit
function Menu(config){
	var nodes = [];
	var config = initialize(config);
	
	this.html = function(){
		var html = '<div class="menu-js">';
		for(var i = 0; i < nodes.length; i++){
			html += nodes[i].html(config.get("left-padding"), config.get("left-padding-offset"));
		}
		html += '</div>';
		return html;
	}
	this.getConfig = function(){
		return config;
	}
	this.add = function(node){
		if(node instanceof MenuNode){
			nodes.push(node);
		}
	}
	this.add = function(node, parentNode){
		if(node instanceof MenuNode){
			if(exists(parentNode)){
				if(parentNode instanceof MenuNode){
					parentNode.addChild(node);
				}
			} else{
				nodes.push(node);
			}
		}
	}
	this.getNodes = function(){
		return nodes;
	}
	
	this.set = function(container){
		if(container instanceof SelectedHTML){	
			container.html(this.html());
			container.set("click", menuClick);
		}
	}
	
	function initialize(config){
		if(exists(config)){
			return config;
		}
		else{
			return new Config;
		}
	}
	
	function menuClick(data){
		data = _(data);
		_(".selected").set("removeClass", "selected");
		var parent = _(data.parent()[0]);
		parent.set("addClass", "selected");
		var children = parent.children();
		for(var i = 0; i < children.length; i++){
			toggleChild(children[i]);
		}
	}
	
	function toggleChild(child){
		child = _(child);
		var classes = child.get("class");
		if(!classes.contains("menu-js-value")){
			child.set("toggleClass", "expanded");
			var display = child.get("display");
			if(display == "none"){
				child.set("display", "inherit");
			} else{
				child.set("display", "none");
			}
		}
	}
}

function MenuNode(){
	var value;
	var id;
	var className;
	var parent;
	var children = [];
	
	this.getValue = function(){
		return value;
	}
	this.getID = function(){
		return id;
	}
	this.getClass = function(){
		return className;
	}
	this.getParent = function(){
		return parent;
	}
	this.getChildren = function(){
		return children;
	}
	
	this.setValue = function(newValue){
		value = newValue;
	}
	this.setID = function(newID){
		id = newID;
	}
	this.setClass = function(newClassName){
		className = newClassName;
	}
	this.setParent = function(newParent){
		parent = newParent;
	}
	this.setChildren = function(newChildren){
		children = newChildren;
	}
	
	this.addChild = function(child){
		child.setParent(this);
		children.push(child);
	}
	this.html = function(leftPadding, leftPaddingOffset){
		var display = "inherit";
		var classes = "collapsed expanded";
		if(exists(parent)){
			display = "none";
			classes = "collapsed";
		}
		classes += " " + className + "  menu-js-option";
		if(children.length == 0){
			classes += " leaf";
		}
		if(!exists(leftPadding)){
			leftPadding = 0;
		}
		if(!exists(leftPaddingOffset)){
			leftPaddingOffset = 20;
		}
		var html = '<div id="' + id + '" class="' + classes + '" style="display: ' + display + '; padding-left: ' + leftPadding + 'px;">';
		html += '<div class="menu-js-value">' + value + '</div>';

		for(var i = 0; i < children.length; i++){
			html += children[i].html(leftPadding + leftPaddingOffset);
		}
		
		html += '</div>';
		return html;
	}
}