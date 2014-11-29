require(["util"]);

function _(value){
	if(value === "window"){
		return new SelectedHTML(window);
	}
	else if(value === "document"){
		return new SelectedHTML(document);
	}
	else if(value === "body"){
		return new SelectedHTML(document.body);
	}
	if(typeof value === "string"){
		return new SelectedHTML(document.body.querySelectorAll(value));
	}
	else{
		return new SelectedHTML(value);
	}
}

function SelectedHTML(selected){
	var collection = normalize(selected);
	this.length = collection.length;
	this.tmp = collection;
	
	this.get = function(target){
		if(exists(target)){
			switch(target){
				case("class"): return this.className();
					break;
				case("id"): return this.id();
					break;
				case("tag"): return this.tag();
					break;
				case("html"): return this.html();
					break;
				case("parent"): return this.parent();
					break;
				case("children"): return this.children();
					break;
				case("title"): 
				case("disabled"): 
				case("height"): 
				case("width"): 
				case("display"):
				case("value"):
				case("background-color"):
				case("font-color"):
				case("src"):
				case("cursor"):
				case("overflow"):
				case("overflow-y"):
				case("top"):
				case("left"):
				case("placeholder"):
				case("border-color"):
					return this.attribute(target);
					break;
				case("focus"):
				case("blur"):
					return this.event(target);
			}
		}
	}
	this.set = function(target, value){
		if(exists(target)){
			switch(target){
				case("class"): return this.className(value);
					break;
				case("addClass"): return this.className(value, "add");
					break;
				case("removeClass"): return this.className(value, "remove");
					break;
				case("toggleClass"): return this.className(value, "toggle");
					break;
				case("id"): return this.id(value);
					break;
				case("html"): return this.html(value);
					break;
				case("title"): 
				case("disabled"): 
				case("height"): 
				case("width"): 
				case("display"):
				case("value"):
				case("background-color"):
				case("font-color"):
				case("src"):
				case("cursor"):
				case("overflow"):
				case("overflow-y"):
				case("top"):
				case("left"):
				case("scroll-top"):
				case("scroll-view"):
				case("placeholder"):
				case("border-color"):
					return this.attribute(target, value);
				case("load"):
				case("click"):
				case("change"):
				case("oncut"):
				case("onpaste"):
				case("double-click"):
				case("hover"):
				case("hovering"):
				case("touch"):
				case("focus"):
				case("blur"):
				case("keyup"):
				case("keydown"):
					return this.event(target, value);
			}
		}
	}
	this.className = function(value, setting){
		var classname = [];
		for(var i = 0; i < collection.length; i++){
			if(exists(value)){
				if(exists(setting)){
					switch(setting){
						case("add"): 
							if(!collection[i].className.contains(value)){
								collection[i].className = (collection[i].className + " " + value).trim();
							}
							break;
						case("remove"): 
							collection[i].className = collection[i].className.replace(value, "");
							break;
						case("toggle"): 
							if(collection[i].className.contains(value)){
								collection[i].className = collection[i].className.replace(value, "");
							}
							else{
								collection[i].className = (collection[i].className + " " + value).trim();
							}
							break;
					}
				}
				else{
					collection[i].className = value;
				}
			}
			var names = collection[i].className.split(" ");
			for(var j = 0; j < names.length; j++){
				if(!isEmpty(names[j]) && !classname.contains(names[j])){
					classname.push(names[j]);
				}
			}
		}
		return classname;
	}
	this.id = function(value){
		var id = [];
		if(exists(value)){
			if(collection.length == 1){
				collection[0].id = value;
			}
		}		
		for(var i = 0; i < collection.length; i++){
			if(!isEmpty(collection[i].id)){
				id.push(collection[i].id);
			}
		}
		return id;
	}
	this.tag = function(){
		var tag = [];
		for(var i = 0; i < collection.length; i++){
			if(!tag.contains(collection[i].tagName)){
				tag.push(collection[i].tagName);
			}
		}
		return tag;
	}
	this.html = function(value){
		var html = [];
		for(var i = 0; i < collection.length; i++){
			if(exists(value)){
				collection[i].innerHTML = value;
			}
			if(!html.contains(collection[i].innerHTML)){
				if(!isEmpty(collection[i].innerHTML)){
					html.push(collection[i].innerHTML);
				}
			}
		}
		return html;
	}
	
	this.focused = function(){
		return document.activeElement;
	}
	this.parent = function(){
		var parent = [];
		for(var i = 0; i < collection.length; i++){
			var parentNode = collection[i].parentNode;
			if(!parent.contains(parentNode)){
				parent.push(parentNode);
			}
		}
		return parent;
	}
	this.children = function(){
		var children = [];
		for(var i = 0; i < collection.length; i++){
			var tmpChildren = collection[i].children;
			for(var j = 0; j < tmpChildren.length; j++){
				children.push(tmpChildren[j]);
			}
		}
		return children;
	}
	this.attribute = function(target, value){
		if(exists(target)){
			switch(target){
				case("title"): return title(value);
				case("disabled"): return disabled(value);
				case("height"): return height(value);
				case("width"): return width(value);
				case("display"): return display(value);
				case("value"): return values(value);
				case("background-color"): return backgroundColor(value);
				case("font-color"): return fontColor(value);
				case("src"): return source(value);
				case("cursor"): return cursor(value);
				case("overflow"): return overflow(value);
				case("overflow-y"): return overflow(value, "y");
				case("overflow-x"): return overflow(value, "x");
				case("top"): return position(value, "top");
				case("left"): return position(value, "left");
				case "scroll-top": object.scrollTop = 0; break;
				case "scroll-view": object.scrollIntoView(true); break;
				case("placeholder"): return placeholder(value);case("border-color"): return borderColor(value);
			}
		}
	}
	this.event = function(event, eventFunction){
		if(exists(event)){
			switch(event){
				case("load"):
				case("click"):
				case("change"):
				case("cut"):
				case("paste"):
				case("keyup"):
				case("keydown"):
					addEvent(event, eventFunction);
					break;
				case("double-click"):
					addEvent("dblclick", eventFunction);
					break;
				case("hover"):
					hover(eventFunction);
					break;
				case("hovering"):
					addEvent("mouseover", eventFunction);
					break;
				case("touch"):
					addEvent("touchstart", eventFunction);
					break;
				case("focus"):
					focus(eventFunction);
					break;
				case("blur"):
					blur(eventFunction);
					break;
			}
		}
	}
	
	function normalize(selected){
		var items = [];
		if(exists(selected)){
			if(!isEmpty(selected.length)){
				for(var i = 0; i < selected.length; i++){
					items[i] = selected[i];
				}
			}
			else{
				items[0] = selected;
			}
		}
		return items;
	}
	
	function display(value){
		var display = [];
		for(var i = 0; i < collection.length; i++){
			if(exists(value)){
				collection[i].style.display = value;
			}
			var render = getComputedStyle(collection[i], null).display;
			if(!display.contains(render)){
				display.push(render);
			}
		}
		return display;
	}
	
	function values(value){
		var values = [];
		for(var i = 0; i < collection.length; i++){
			if(exists(value)){
				collection[i].value = value;
			}
			if(exists(collection[i].value) && !values.contains(collection[i].value)){
				values.push(collection[i].value);
			}
		}
		return values;
	}
		
	function backgroundColor(value){
		var color = [];
		for(var i = 0; i < collection.length; i++){
			if(exists(value)){
				collection[i].style.backgroundColor = value;
			}
			var render = getComputedStyle(collection[i], null).backgroundColor;
			if(!color.contains(render)){
				color.push(render);
			}
		}
		
		return color;
	}
	
	function fontColor(value){
		var color = [];
		for(var i = 0; i < collection.length; i++){
			if(exists(value)){
				collection[i].style.color = value;
			}
			var render = getComputedStyle(collection[i], null).color;
			if(!color.contains(render)){
				color.push(render);
			}
		}
		
		return color;
	}
	
	function borderColor(value){
		var color = [];
		for(var i = 0; i < collection.length; i++){
			if(exists(value)){
				collection[i].style.borderColor = value;
			}
			var render = [];
			render.push(getComputedStyle(collection[i], null).borderBottomColor);
			render.push(getComputedStyle(collection[i], null).borderLeftColor);
			render.push(getComputedStyle(collection[i], null).borderRightColor);
			render.push(getComputedStyle(collection[i], null).borderTopColor);
			if(!color.contains(render)){
				color.push(render);
			}
		}
		return color;
	}
	
	function source(value){
		var source = [];
		for(var i = 0; i < collection.length; i++){
			if(exists(value)){
				collection[i].src = value;
			}
			if(exists(collection[i].src) && !source.contains(collection[i].src)){
				source.push(collection[i].src);
			}
		}
		
		return source;
	}
	
	function cursor(value){
		var cursor = [];
		for(var i = 0; i < collection.length; i++){
			if(exists(value)){
				collection[i].style.cursor = value;
			}
			var render = getComputedStyle(collection[i], null).cursor;
			if(!cursor.contains(render)){
				cursor.push(render);
			}
		}
		return cursor;
	}
	
	function title(value){
		var title = [];
		for(var i = 0; i < collection.length; i++){
			if(exists(value)){
				collection[i].title = value;
			}
			if(!title.contains(collection[i].title)){
				if(!isEmpty(collection[i].title)){
					title.push(collection[i].title);
				}
			}
		}
		return title;
	}
	
	function disabled(value){
		var disabled = [];
		if(exists(value)){
			if(typeof value === "string"){
				if(value.toLowerCase() === "true"){
					value = true;
				}
				else if(!isNaN(value)){
					value = !!parseInt(value);
				}
				else{
					value = false;
				}
			}
			else if(typeof value !== "boolean"){
				value = !!value;
			}
		}
		for(var i = 0; i < collection.length; i++){
			if(exists(value)){
				collection[i].disabled = value;
			}
			if(collection[i].disabled){
				if(!disabled.contains(true)){
					disabled.push(true);
				}
			}
			else{
				if(!disabled.contains(false)){
					disabled.push(false);
				}
			}
		}
		return disabled;
	}
	
	function height(value){
		var height = [];
		for(var i = 0; i < collection.length; i++){
			if(exists(value)){
				collection[i].style.height = value + "px";
			}
			height.push(collection[i].clientHeight);
		}
		return height;
	}
	
	function width(value){
		var width = [];
		for(var i = 0; i < collection.length; i++){
			if(exists(value)){
				collection[i].style.width = value + "px";
			}
			width.push(collection[i].clientWidth);
		}
		return width;
	}
	
	function overflow(value, type){
		var overflow = [];
		for(var i = 0; i < collection.length; i++){
			var rendered;
			if(type === "y"){
				if(exists(value)){
					collection[i].style.overflowY = value;
				}
				rendered = (getComputedStyle(collection[i], null).overflowY);
			}
			else if(type === "x"){
				if(exists(value)){
					collection[i].style.overflowX = value;
				}
				rendered = (getComputedStyle(collection[i], null).overflowX);
			}
			else{
				if(exists(value)){
					collection[i].style.overflow = value;
				}
				rendered =(getComputedStyle(collection[i], null).overflow);
			}
			if(!overflow.contains(rendered)){
				overflow.push(rendered);
			}
		}
		return overflow;
	}
	
	function position(value, type){
		var position = [];
		if(type === "top"){
			for(var i = 0; i < collection.length; i++){
				if(exists(value)){
					collection[i].style.top = value + "px";
				}
				var rendered =(getComputedStyle(collection[i], null).top);
				if(!position.contains(rendered)){
					position.push(rendered);
				}
			}
		}
		else if(type === "left"){
			for(var i = 0; i < collection.length; i++){
				if(exists(value)){
					collection[i].style.left = value + "px";
				}
				var rendered =(getComputedStyle(collection[i], null).left);
				if(!position.contains(rendered)){
					position.push(rendered);
				}
			}
		}
		return position;
	}
	
	function placeholder(value){
		var placeholder = [];
		for(var i = 0; i < collection.length; i++){
			if(exists(value)){
				collection[i].placeholder = value;
			}
			if(!placeholder.contains(collection[i].placeholder)){
				placeholder.push(collection[i].placeholder);
			}
		}
		return placeholder;
	}
	
	function addEvent(target, setting){
		for(var i = 0; i < collection.length; i++){
			collection[i].addEventListener(target, setting);
		}
	}
	
	function hover(hoverFunction){
		for(var i = 0; i < collection.length; i++){
			if(hoverFunction.length == 2){
				collection[i].addEventListener("mouseenter", hoverFunction[0]);
				collection[i].addEventListener("mouseleave", hoverFunction[1]);
			}
			else{
				if(hoverFunction.length == 0){
					collection[i].addEventListener("mouseenter", hoverFunction);
				}
				else{
					collection[i].addEventListener("mouseenter", hoverFunction[0]);
				}
			}
		}
	}
	
	function focus(eventFunction){
		if(exists(eventFunction)){
			addEvent("focus", eventFunction);
		}
		else{
			for(var i = 0; i < collection.length; i++){
				collection[i].focus();
			}
		}
	}
	
	function blur(eventFunction){
		if(exists(eventFunction)){
			addEvent("blur", eventFunction);
		}
		else{
			for(var i = 0; i < collection.length; i++){
				collection[i].blur();
			}
		}
	}
}