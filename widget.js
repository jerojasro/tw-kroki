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

/*
Render this widget into the DOM
*/
PlantumlWidget.prototype.render = function(parent,nextSibling) {
	this.parentDomNode = parent;
	this.execute();

	var server_url = $tw.wiki.getTiddler("$:/plugins/jerojasro/plantuml/config/plantuml_server_url").fields.text;

	var ct = $tw.wiki.getTiddler(this.getVariable("currentTiddler"));
	if (ct.fields.needs_update == "yes") {
		fetch(server_url + "/plantuml/svg", {
			"method": "POST",
			"body": ct.fields.text,
		})
		.then(function (response){console.log(response);return response.text()})
		.then(function(response_text) {
			var newTiddler = new $tw.Tiddler(
				$tw.wiki.getTiddler(ct.fields.title),
				{_prev_diag_text: null, needs_update: null, cached_svg: response_text}
			);
			$tw.wiki.addTiddler(newTiddler);
		});
	}

	if (ct.fields["draft.of"]) {
		if (ct.fields.text != ct.fields._prev_diag_text) {

			fetch(server_url + "/plantuml/svg", {
				"method": "POST",
				"body": ct.fields.text,
			})
			.then(function(response) {return response.text();})
			.then(function(response_text) {
				var newTiddler = new $tw.Tiddler(
					$tw.wiki.getTiddler(ct.fields.title),
					{needs_update: null, cached_svg: response_text, _prev_diag_text: ct.fields.text}
				);
				$tw.wiki.addTiddler(newTiddler);
			});
		}
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
