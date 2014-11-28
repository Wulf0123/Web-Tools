while(document.readyState !== "complete"){}
//run initialize
var test = _("*");
test.event("focus");
test.event("blur");
console.log(test.event("blur", function(){console.log("bye");}))