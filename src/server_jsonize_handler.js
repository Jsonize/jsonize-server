Scoped.define("jsonize:ServerJsonizeHandler", [
    "jsonize:AbstractJsonizeHandler"
], function (AbstractJsonizeHandler, scoped) {
	return AbstractJsonizeHandler.extend({scoped: scoped}, function (inherited) {
		return {
			
			constructor: function (port, options) {
				inherited.constructor.call(this, options);
				var net = require('net');
				var self = this;
				net.createServer(function(socket) {
					self._newSession(socket, socket);
				}).listen(port, "localhost");
			}
			
		};
	});
});