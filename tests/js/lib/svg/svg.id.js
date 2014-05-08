/*global SVG*/
SVG.extend(SVG.Element, {
	'id': function(id){
		if (id) {
			this.node.id = id;
			return this;
		} else {
			return this.node.id;
		}
	}
});