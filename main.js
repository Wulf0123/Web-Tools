/*require(["util", "selector", "ajax"], function(){
	require(["initializer"]);
});*/

_(window).set("load", function(){
	var config = new Config();
	config.set("left-padding", 25);
	config.set("left-padding-offset", 10);
	var menu = new Menu(config);
	var rootNode = new MenuNode();
	rootNode.setValue("hello");
	rootNode.setID("identifier");
	rootNode.setClass("class1");
	var childNode = new MenuNode();
	childNode.setValue("world");
	childNode.setID("id 2");
	childNode.setClass("class2");
	var childNode2 = new MenuNode();
	childNode2.setValue("oh yeah!");
	childNode2.setID("last id");
	childNode2.setClass("class1");
	menu.add(rootNode);
	menu.add(rootNode);
	rootNode.addChild(childNode);
	menu.add(rootNode);
	childNode.addChild(childNode2);
	rootNode = new MenuNode();
	rootNode.setValue("junanji");
	rootNode.setID("identifierno");
	rootNode.setClass("class1");
	menu.add(rootNode);
	menu.set(_("body"));
	});