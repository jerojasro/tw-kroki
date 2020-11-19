/*\
title: $:/plugins/jerojasro/plantuml/wrapper.js
type: application/javascript
module-type: parser

Generates a new type of parse node, plantuml, to be processed by the plantuml
widget: $:/plugins/jerojasro/plantuml/widget.js

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var PlantumlParser = function(type, text, options) {
	this.tree = [{"type": "plantuml", "html": "<h1>holi</h1>"}];
};

exports["text/x-plantuml"] = PlantumlParser;

})();
