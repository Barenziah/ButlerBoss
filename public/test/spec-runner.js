require.config({

	baseUrl: "../js",

	urlArgs: 'cb=' + Math.random(),

	paths: {
		// Libraries.
		jquery: "lib/jquery",								// has AMD built in
		underscore: "lib/lodash",							// has AMD built in (underscore doesn't but lodash does)
		backbone: "lib/backbone",							// shimmed below
		backbonemvc: "lib/backbonemvc",						// shimmed below
		marionette: "lib/backbone.marionette",				// has AMD built in
		// Marionette's extra dependencies
		"backbone.babysitter": "lib/backbone.babysitter",	// has AMD built in
		"backbone.eventbinder": "lib/backbone.eventbinder",	// has AMD built in
		"backbone.wreqr": "lib/backbone.wreqr",				// has AMD built in
		io: "lib/socket.io",								// shimmed below
		// RequireJS Plugins
		text: "lib/require.text",							// RequireJS plugin. No need to shim.
		tpl: "lib/require.tpl",								// RequireJS plugin. No need to shim.
		// jQuery ParseUrl Plugin
		parseUrl: "lib/jquery.parseurl",					// shimmed below
		bootstrap: "lib/bootstrap",							// shimmed below

		// Jasmine Testing: Folder Aliases
		spec: "../test/spec",
		helpers: "../test/helpers"
	},

	shim: {
		// Backbone library depends on lodash and jQuery.
		'backbone': {
			deps: ["jquery", "underscore"],
			exports: "Backbone"
		},

		// BackboneMVC needs Backbone
		// It also needs jQuery and Underscore, but Backbone `require`s them and they still attach
		// themselves to `window` so it'll work either way.
		'backbonemvc':  {
			deps: ["backbone"],
			exports: "BackboneMVC"
		},

		// Socket.io needs to export its library
		'io': {
			deps: [],
			exports: 'io'
		},

		// jQuery plugin. Can use the function returned directly or via `$.parseUrl`
		'parseUrl': {
			deps: ['jquery'],
			exports: "$.parseUrl"
		},

		// Multiple jQuery plugins. Do not export anything specific. It's all exposed through `$`
		'bootstrap': ['jquery']
	}

});



require(['underscore', 'jquery'], function(_, $){
	var jasmineEnv = jasmine.getEnv();
	var htmlReporter = new jasmine.HtmlReporter();

	jasmineEnv.addReporter(htmlReporter);

	// Add links to the spec files here
	var specs = [];
	specs.push('spec/lib/namedmultiregion_spec');
	specs.push('spec/utils/communicator_spec');
	specs.push('spec/utils/lazy-loader_spec');
	specs.push('spec/utils/specialized-loader_spec');
	specs.push('spec/utils/socket_spec');

	// Execute specs
	$(function(){
		require(specs, function(){
			jasmineEnv.execute();
		});
	});

});