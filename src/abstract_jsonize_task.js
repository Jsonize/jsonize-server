Scoped.define("jsonize:AbstractJsonizeTask", [
    "betajs:Class",
    "betajs:Events.EventsMixin",
    "betajs:Promise"
], function (Class, EventsMixin, Promise, scoped) {
	return Class.extend({scoped: scoped}, [EventsMixin, {

		run: function (payload) {
			return this._run(payload);
		},
		
		_event: function (payload) {
			this.trigger("event", payload);
		},
		
		rollback: function () {
			return this._rollback();
		},
		
		_run: function (payload) {
			return Promise.value(true);
		},
		
		_rollback: function () {
			return Promise.value(true);
		},
		
		abort: function () {
			return this._abort();
		},
		
		_abort: function () {
			return Promise.value(true);
		}
			
	}]);
});