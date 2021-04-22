/*\
title: $:/plugins/jerojasro/kroki/wrapper.js
type: application/javascript
module-type: parser

Generates a new type of parse node, kroki, to be processed by the kroki
widget: $:/plugins/jerojasro/kroki/widget.js

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var KrokiParser = function(type, text, options) {
	this.tree = [{"type": "kroki", "html": "<h1>placeholder</h1>"}];
};

exports["text/x-plantuml"] = KrokiParser;
exports["text/x-pikchr"] = KrokiParser;
exports["text/x-graphviz"] = KrokiParser;
exports["text/x-blockdiag"] = KrokiParser;
exports["text/x-bpmn"] = KrokiParser;
exports["text/x-bytefield"] = KrokiParser;
exports["text/x-seqdiag"] = KrokiParser;
exports["text/x-actdiag"] = KrokiParser;
exports["text/x-nwdiag"] = KrokiParser;
exports["text/x-packetdiag"] = KrokiParser;
exports["text/x-rackdiag"] = KrokiParser;
exports["text/x-ditaa"] = KrokiParser;
exports["text/x-erd"] = KrokiParser;
exports["text/x-excalidraw"] = KrokiParser;
exports["text/x-mermaid"] = KrokiParser;
exports["text/x-nomnoml"] = KrokiParser;
//exports["text/x-svgbob"] = KrokiParser;  // this diagram messed up the tiddlywiki icons, disabled for now
exports["text/x-vega"] = KrokiParser;
exports["text/x-vegalite"] = KrokiParser;
exports["text/x-wavedrom"] = KrokiParser;

})();
