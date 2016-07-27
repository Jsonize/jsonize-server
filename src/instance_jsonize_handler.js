Scoped.define("jsonize:InstanceJsonizeHandler", [
    "jsonize:AbstractJsonizeHandler"
], function (AbstractJsonizeHandler, scoped) {
	return AbstractJsonizeHandler.extend({scoped: scoped}, {
			
		_run: function () {
			this._newSession(process.stdin, process.stdout);			
		}
	
	});
});