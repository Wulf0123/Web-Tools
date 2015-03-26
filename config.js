function Config(){
	var config = [];
	
	this.set = function(target, value){
		config[target] = value;
	}
	this.get = function(target){
		return config[target];
	}
	this.contains = function(target){
		return exists(config[target]);
	}
}