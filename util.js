function exists(value){
	return (value !== null && value !== undefined);
}
function isEmpty(value){
	return !value;
}
String.prototype.endsWith = function(extension){
	return ((this.indexOf(extension) + extension.length) === this.length);
}
String.prototype.contains = function(token){
	return (this.indexOf(token) !== -1);
}
Array.prototype.contains = function (obj) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}