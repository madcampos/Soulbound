/*global window */

/*
 * Main JS file, loads other files
 */
var Main = {
	configToogle : function(){
		var config = document.getElementById('configOptions');
		if (config.classList.length === 0) {
			config.classList.add('open');
		} else {
			config.classList.remove('open');
		}
	}
};