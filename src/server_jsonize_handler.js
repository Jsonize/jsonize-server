Scoped.define("jsonize:ServerJsonizeHandler", [
    "jsonize:AbstractJsonizeHandler"
], function (AbstractJsonizeHandler, scoped) {
	return AbstractJsonizeHandler.extend({scoped: scoped}, function (inherited) {
		return {
			
			constructor: function (port) {
				inherited.constructor.call(this);
				var net = require('net');
				var self = this;
				net.createServer(function(socket) {
					self._newSession(socket, socket);
				}).listen(port, "localhost");
			}
			
		};
	});
});