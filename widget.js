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

$tw.hooks.addHook("th-saving-tiddler", function(tiddler) {
	if (tiddler.fields.type != "text/x-plantuml") {
		return tiddler;
	}

	return new $tw.Tiddler(tiddler, {needs_update: "yes"});
});

var Widget = require("$:/core/modules/widgets/widget.js").widget;

var PlantumlWidget = function(parseTreeNode,options) {
	this.initialise(parseTreeNode,options);
};

PlantumlWidget.prototype = new Widget();


PlantumlWidget.prototype.updateDiagram = function(currTiddler, prevDiagText) {
	var server_url=$tw.wiki.getTiddler("$:/plugins/jerojasro/plantuml/config/plantuml_server_url").fields.text;

	fetch(server_url + "/plantuml/svg", {
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
PlantumlWidget.prototype.render = function(parent,nextSibling) {
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

PlantumlWidget.prototype.execute = function() {
};

PlantumlWidget.prototype.refresh = function(changedTiddlers) {
	return false;
};

exports.plantuml = PlantumlWidget;

})();
