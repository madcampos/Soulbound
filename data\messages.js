/*global window*/
var lang = 'en-us';
if (window.navigator.language.toLowerCase != 'en-us' || window.navigator.userLanguage.toLowerCase != 'en-us'){
	lang = window.navigator.language.toLowerCase() || window.navigator.userLanguage.toLowerCase();
}

var messages = {
	'en-us' : {
		DROP_IMAGE : 'Please, drop an image.',
		IMG_SIZE : 'Image size must be less than 45kb.',
		SELECT_FILE : 'Please, select a file.',
		CAL_DAY_LABELS : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		CAL_MONTH_LABELS : ['January', 'February', 'March', 'April',
			'May', 'June', 'July', 'August',
			'September', 'October', 'November', 'December'],
		TODAY : 'Today'
	},
	'pt-br' : {
		DROP_IMAGE : 'Por favor, arraste uma imágem.',
		IMG_SIZE : 'O tamanho da imagem deve ser menos que 45kb.',
		SELECT_FILE : 'Por favor, selecione um arquivo.',
		CAL_DAY_LABELS : ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
		CAL_MONTH_LABELS : ['Janeiro', 'Fevereiro', 'Março', 'Abril',
			'Maio', 'Junho', 'Julho', 'Agosto',
			'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
		TODAY : 'Hoje'
	}
};