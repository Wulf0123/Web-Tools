require(["util"]);

function Ajax(url){
	var URL = url;
	var xmlHttpRequestObjects = [];
	this.setHost = function(url){ 
		URL = url;
	};
	
	this.sendRequest = function(url, name, type, request, response, content, data){
		if(!exists(url)){
			url = URL;
		}
		var request = getRequestObject(name);
		if (request.readyState == 0 || request.readyState == 4) {
			request.open(type, phpFile(url) + "?" + request, true);
			request.onreadystatechange = response;
			if(exists(content)){
				request.setRequestHeader("Content-Type", content);
			}
			request.send(data);
		}
	};
	this.requestResponse = function(name, type){
		var request = getRequestObject(name);
		if (request.readyState == 4) {
			if (request.status == 200) {
				if(exists(type) && type.indexOf("xml")){
					xmlResponse = request.responseXML;
					if(exists(xmlResponse)){
						return xmlResponse.documentElement;
					}
				}
				else{
					return request.responseText;
				}
			}
		}
		return null;
	};
	
	function getRequestObject(request){
		if(!exists(xmlHttpRequestObjects[request])){
			xmlHttpRequestObjects[request] = createXmlHttpRequestObject();
		}
		return xmlHttpRequestObjects[request];
	};
	function createXmlHttpRequestObject(){
		var xmlHttp = false;
		if(window.ActiveXObject){try{
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");}catch(e){}
		}
		else{try{
			xmlHttp = new XMLHttpRequest();}catch(e){}
		}
		return xmlHttp;
	};
	function phpFile(name){
		if(exists(name) && !endsWith(".php")){
			name += ".php";
		}
		return host;
	};
}