/*global alert,FileReader,window,messages,lang*/

/**
 * Persistence module
 */
var Persist = {
	/**
	 * Method to create a JSON from the values of a list of nodes.
	 * @param {Array} nodesList A list of node ID's to look for values/value arrays.
	 * @returns {Object} A JSON Object with te node list's values.
	 */
	createJSON : function(nodesList) {
		var jsonObject = {};
		for (var key in nodesList) {
			if (nodesList.hasOwnProperty(key)){
				var node = document.getElementById(key);
				if (node.children.length === 0) {
					jsonObject[key] = node.value;
				}else{
					jsonObject[key] = [];
					for (var i in node.children) {
						if (node.children[i].children.length === 0){
							jsonObject[key][i] = node.children[i].value;
						}else{
							for (var j in node.children[i]){
								if (node.children[i].hasOwnProperty(j)){
									jsonObject[key][i][j] = node.children[i].children[j].value;
								}
							}
						}
					}
				}
			}
		}
		return jsonObject;
	},
	/**
	 * Method to load a JSON from a single-string file.
	 * @param {HTMLInputElement} fileInput A file input element.
	 * @returns {Object} A JSON Objcet from the string file.
	 */
	loadJSON : function(fileInput){
		var file = document.getElementById(fileInput).files;
		if (!file.length) {
			alert(messages[lang].SELECT_FILE);
			return;
		}
	
		var reader = new FileReader();
		reader.onloadend = function(evt){
			var e = evt || window.event;
			return JSON.parse(e.target.result);
		};
		reader.readAsBinaryString(file[0]);
	}
};
