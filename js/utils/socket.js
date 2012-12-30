define(
	['io', 'underscore'],
	function(io, _) {

		Socket = function(options) {
			var self = this;
			var socketOptions = {'auto connect': false};

			if (options.io.forceNewConnection) {
				socketOptions['force new connection'] = true;
			}

			this.vent = options.vent;
			this.socket = io.connect(options.appUrl + ':' + options.io.port, socketOptions).socket;
			
			this._listenTo(this.socket, {
				'connect': this.onConnect,
				'disconnect': this.onDisconnect
			});
		};

		_.extend(Socket.prototype, {
			isConnected: function() {
				return this.socket.connected;
			},

			on: function(event, handler, context) {
				this.socket.on(event, _.bind(handler, context));

				if (event === "connect" && this.connected) {
					handler.call(context);
				}
			},

			emit: function() {
				this.socket.emit.apply(this.socket, arguments);
			},

			connect: function() {
				this.socket.connect();
			},

			disconnect: function() {
				this.socket.disconnect();
			},

			onConnect: function() {
				this.vent.trigger('status:connected');
			},

			onDisconnect: function() {
				this.vent.trigger('status:disconnected');
			},

			_listenTo:function(obj, bindings) {
				var self = this;

				_.each(bindings, function(callback, event) {
					obj.on(event, _.bind(callback, self));
				});
			}
		});

		return Socket;
	}
);