Scoped.define("jsonize:HttpServerJsonizeHandler", [
    "jsonize:AbstractJsonizeHandler"
], function (AbstractJsonizeHandler, scoped) {
	return AbstractJsonizeHandler.extend({scoped: scoped}, function (inherited) {
		return {
			
			constructor: function (port) {
				inherited.constructor.call(this);
				var Express = require('express');
                var express = Express();
                var self = this;
                express.use(function(request, response, next) {
                    response.header("Access-Control-Allow-Origin", "*");
                    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                    next();
                });
				express.post("", function (request, response) {
					response.status(200);
					self._newSession(request, response);
				});
                express.listen(port, function () {});
			}
			
		};
	});
});