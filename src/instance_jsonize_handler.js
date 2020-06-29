Scoped.define("jsonize:InstanceJsonizeHandler", [
    "jsonize:AbstractJsonizeHandler"
], function (AbstractJsonizeHandler, scoped) {
	return AbstractJsonizeHandler.extend({scoped: scoped}, function (inherited) {
		return {

			constructor: function (task, payload, options) {
				inherited.constructor.call(this, options);
				this._task = task;
				this._payload = payload;
			},

            _run: function () {
                this._newSession(
					this._options.inJson ? require('stream').Readable.from(this._options.inJson) : process.stdin,
					this._options.outFile ? require("fs").createWriteStream(this._options.outFile) : process.stdout,
					this._task,
					this._payload
				);
            }

		};
	});
});