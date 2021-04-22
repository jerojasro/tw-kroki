/*\
title: $:/plugins/jerojasro/kroki/widget.js
type: application/javascript
module-type: widget

TODO FIXME: renders from a given field

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var contentTypes = {
	"text/x-plantuml":   "/plantuml/svg",
	"text/x-pikchr":     "/pikchr/svg",
	"text/x-graphviz":   "/graphviz/svg",
	"text/x-blockdiag":  "/blockdiag/svg",
	"text/x-bpmn":       "/bpmn/svg",
	"text/x-bytefield":  "/bytefield/svg",
	"text/x-seqdiag":    "/seqdiag/svg",
	"text/x-actdiag":    "/actdiag/svg",
	"text/x-nwdiag":     "/nwdiag/svg",
	"text/x-packetdiag": "/packetdiag/svg",
	"text/x-rackdiag":   "/rackdiag/svg",
	"text/x-ditaa":      "/ditaa/svg",
	"text/x-erd":        "/erd/svg",
	"text/x-excalidraw": "/excalidraw/svg",
	"text/x-mermaid":    "/mermaid/svg",
	"text/x-nomnoml":    "/nomnoml/svg",
	//"text/x-svgbob":     "/svgbob/svg",  // this diagram messed up the tiddlywiki icons, disabled for now
	"text/x-vega":       "/vega/svg",
	"text/x-vegalite":   "/vegalite/svg",
	"text/x-wavedrom":   "/wavedrom/svg",
};

$tw.hooks.addHook("th-saving-tiddler", function(tiddler) {
	if (!contentTypes[tiddler.fields.type]) {
		return tiddler;
	}

	return new $tw.Tiddler(tiddler, {needs_update: "yes"});
});

var Widget = require("$:/core/modules/widgets/widget.js").widget;

var KrokiWidget = function(parseTreeNode,options) {
	this.initialise(parseTreeNode,options);
};

KrokiWidget.prototype = new Widget();


KrokiWidget.prototype.updateDiagram = function(currTiddler, prevDiagText) {
	var server_url=$tw.wiki.getTiddler("$:/plugins/jerojasro/kroki/config/kroki_server_url").fields.text;

	fetch(server_url + contentTypes[currTiddler.fields.type], {
		"method": "POST",
		"body": currTiddler.fields.text,
	})
	.then(function (response){return response.text()})
	.then(function(responseText) {
		var newTiddler = new $tw.Tiddler(
			$tw.wiki.getTiddler(currTiddler.fields.title),
			{_prev_diag_text: prevDiagText, needs_update: null, cached_svg: responseText}
		);
		$tw.wiki.addTiddler(newTiddler);
	});
}

/*
Render this widget into the DOM
*/
KrokiWidget.prototype.render = function(parent,nextSibling) {
	this.parentDomNode = parent;
	this.execute();

	var ct=$tw.wiki.getTiddler(this.getVariable("currentTiddler"));
	if (ct.fields.needs_update == "yes") {
		this.updateDiagram(ct, null);
	} else if (ct.fields["draft.of"] && ct.fields.text != ct.fields._prev_diag_text) {
		this.updateDiagram(ct, ct.fields.text);
	}

	var div = this.document.createElement("div");
	if (ct.fields.cached_svg) {
		div.innerHTML=ct.fields.cached_svg;
	}
	parent.insertBefore(div,nextSibling);
	this.domNodes.push(div);
};

KrokiWidget.prototype.execute = function() {
};

KrokiWidget.prototype.refresh = function(changedTiddlers) {
	return false;
};

exports.kroki = KrokiWidget;

})();
