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
	this.tree = [{"type": "plantuml", "html": "<h1>placeholder</h1>"}];
};

exports["text/x-plantuml"] = PlantumlParser;
exports["text/x-pikchr"] = PlantumlParser;
exports["text/x-graphviz"] = PlantumlParser;
exports["text/x-blockdiag"] = PlantumlParser;
exports["text/x-bpmn"] = PlantumlParser;
exports["text/x-bytefield"] = PlantumlParser;
exports["text/x-seqdiag"] = PlantumlParser;
exports["text/x-actdiag"] = PlantumlParser;
exports["text/x-nwdiag"] = PlantumlParser;
exports["text/x-packetdiag"] = PlantumlParser;
exports["text/x-rackdiag"] = PlantumlParser;
exports["text/x-ditaa"] = PlantumlParser;
exports["text/x-erd"] = PlantumlParser;
exports["text/x-excalidraw"] = PlantumlParser;
exports["text/x-mermaid"] = PlantumlParser;
exports["text/x-nomnoml"] = PlantumlParser;
//exports["text/x-svgbob"] = PlantumlParser;  // this diagram messed up the tiddlywiki icons, disabled for now
exports["text/x-vega"] = PlantumlParser;
exports["text/x-vegalite"] = PlantumlParser;
exports["text/x-wavedrom"] = PlantumlParser;

})();
