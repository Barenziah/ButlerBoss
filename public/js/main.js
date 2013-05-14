require(
	['app', 'backbone', 'bootstrap-app', 'tb-plugins'],
	function(App, Backbone, bootstrap ) {

		var options = {
			mainContainer: '#AppContainer',
			host: window.location.protocol + "//" + window.location.hostname,
			vent: App.vent,
			io: {
				port: window.location.port,
				'auto connect': true
			}
		};

		App.addInitializer(bootstrap);

		App.addInitializer(function(options) {
			Backbone.history.start();
		});

		App.start(options);

		App.vent.on('all', function(){ console.log(arguments); });

	}
);