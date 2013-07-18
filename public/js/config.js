require.config({

	deps: ["main"],

	paths: {
		// Libraries.
		jquery: "../components/jquery/jquery",
		underscore: "../components/lodash/lodash",
		backbone: "../components/backbone/backbone",
		marionette: "../components/backbone.marionette/lib/core/amd/backbone.marionette",
		"backbone.babysitter": "../components/backbone.babysitter/lib/amd/backbone.babysitter",
		"backbone.wreqr": "../components/backbone.wreqr/lib/amd/backbone.wreqr",
		io: "../components/socket.io-client/dist/socket.io",

		// RequireJS Plugins
		tpl: "../components/requirejs-tpl/tpl",

		// jQuery Plugins
		"twitter-bootstrap": "../components/bootstrap-css/js/bootstrap",

		// Path Aliases
		"templates": "../templates/"
	},

	shim: {
		// Backbone library depends on lodash and jQuery.
		"backbone": {
			deps: ["jquery", "underscore"],
			exports: "Backbone"
		},

		// Socket.io needs to export its library
		"io": {
			deps: [],
			exports: "io"
		},

		// jQuery plugins. Export $, since everything is exposed through jQuery
		"twitter-bootstrap": {
			deps: ["jquery"],
			exports: "$"
		}

	}

});