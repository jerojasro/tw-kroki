/*\
title: $:/plugins/jerojasro/plantuml/widget.js
type: application/javascript
module-type: widget

TODO FIXME: renders from a given field

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var Widget = require("$:/core/modules/widgets/widget.js").widget;

var PlantumlWidget = function(parseTreeNode,options) {
	this.initialise(parseTreeNode,options);
};

PlantumlWidget.prototype = new Widget();

/*
Render this widget into the DOM
*/
PlantumlWidget.prototype.render = function(parent,nextSibling) {
	this.parentDomNode = parent;
	this.execute();

	var ct = $tw.wiki.getTiddler(this.getVariable("currentTiddler"));
	var encodedDiagramText = $tw.utils.plantuml.encodePlantUML(ct.fields.text);
	var req = new XMLHttpRequest();
	req.open("GET", "http://172.18.62.252:8080/plantuml/svg/" + encodedDiagramText, false);
	req.send(null);

	var div = this.document.createElement("div");
	div.innerHTML=req.responseText;
	parent.insertBefore(div,nextSibling);
	this.domNodes.push(div);
};

PlantumlWidget.prototype.execute = function() {
};

PlantumlWidget.prototype.refresh = function(changedTiddlers) {
	return false;
};

exports.plantuml = PlantumlWidget;

})();
