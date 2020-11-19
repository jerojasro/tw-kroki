/*\
title: $:/plugins/jerojasro/plantuml/wrapper.js
type: application/javascript
module-type: parser

Wraps up the remarkable parser for use as a Parser in TiddlyWiki

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var r = require("$:/plugins/jerojasro/plantuml/remarkable.js");

var Remarkable = r.Remarkable,
	linkify = r.linkify,
	utils = r.utils;

///// Set up configuration options /////
function parseAsBoolean(tiddlerName) {
	return $tw.wiki.getTiddlerText(tiddlerName).toLowerCase() === "true";
}
var pluginOpts = {
	linkNewWindow: parseAsBoolean("$:/config/plantuml/linkNewWindow"),
	renderWikiText: parseAsBoolean("$:/config/plantuml/renderWikiText"),
	renderWikiTextPragma: $tw.wiki.getTiddlerText("$:/config/plantuml/renderWikiTextPragma").trim()
};
var remarkableOpts = {
	breaks: parseAsBoolean("$:/config/plantuml/breaks"),
	quotes: $tw.wiki.getTiddlerText("$:/config/plantuml/quotes"),
	typographer: parseAsBoolean("$:/config/plantuml/typographer")
};
var accumulatingTypes = {
	"text": true,
	"softbreak": true
};

var md = new Remarkable(remarkableOpts);

if (parseAsBoolean("$:/config/plantuml/linkify")) {
	md = md.use(linkify);
}

var MarkdownParser = function(type, text, options) {
	//this.tree = [{"type": "raw", "html": req.responseText}];

	this.tree = [{"type": "plantuml", "html": "<h1>holi</h1>"}];
};

exports["text/x-markdown"] = MarkdownParser;

})();
