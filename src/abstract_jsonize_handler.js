Scoped.define("jsonize:AbstractJsonizeHandler", [
    "betajs:Class",
    "jsonize:JsonizeSession"
], function (Class, JsonizeSession, scoped) {
	return Class.extend({scoped: scoped}, {

		run: function () {
			this._run();
		},
		
		_run: function () {},
		
		_newSession: function (readStream, writeStream) {
			return new JsonizeSession(this, readStream, writeStream);
		}
			
	});
});