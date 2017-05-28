Scoped.define("jsonize:AbstractJsonizeHandler", [
    "betajs:Class",
    "jsonize:JsonizeSession"
], function (Class, JsonizeSession, scoped) {
	return Class.extend({scoped: scoped}, function (inherited) {
		return {

            constructor: function (options) {
                inherited.constructor.call(this);
                this._options = options || {};
            },

            run: function () {
                this._run();
            },

            _run: function () {
            },

            _newSession: function (readStream, writeStream, task, payload) {
                return new JsonizeSession(this, readStream, writeStream, task, payload, this._options);
            }

        };
	});
});