while(document.readyState !== "complete"){}
//run initialize
var test = _("*");
test.event("focus");
console.log(test.focused());