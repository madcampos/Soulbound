/*global alert, FileReader, window*/
var Persist = {
	/**
	 * Show modal panel with JSON string
	 * @param {String} file The JSON object to be stringifyed
	 * @param {String} header A header to the modal panel
	 */
	saveFile : function(file, header, subtitle){
		var modalPanel = document.getElementById('modalPanel');
		modalPanel.children[1].textContent = header;
		modalPanel.children[2].textContent = subtitle;
		modalPanel.children[3].children[0].textContent = JSON.stringify(file, null, ' ');
		modalPanel.style.display = 'block';
	},
	/**
	 * Loads a file and parse as a JSON object
	 * @param {HTMLElement} fileNode The source of the file name
	 * @returns {Object} A JSON Object parsed form the file
	 */
	loadFile : function(fileNode){
		var file = document.getElementById(fileNode).files;
		if (!file.length) {
			alert('Please select a file!');
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
