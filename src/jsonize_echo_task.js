Scoped.define("jsonize:JsonizeEchoTask", [
    "jsonize:AbstractJsonizeTask",
    "jsonize:JsonizeTaskRegistry",
    "betajs:Promise"
], function (Class, TaskRegistry, Promise, scoped) {
	var Cls = Class.extend({scoped: scoped}, {

		_run: function (payload) {
			return Promise.value(payload);
		}
			
	});
	
	TaskRegistry.register("echo", Cls);
	
	return Cls;
});



Scoped.define("jsonize:JsonizeEchoFailTask", [
    "jsonize:AbstractJsonizeTask",
    "jsonize:JsonizeTaskRegistry",
    "betajs:Promise"
], function (Class, TaskRegistry, Promise, scoped) {
	var Cls = Class.extend({scoped: scoped}, {

		_run: function (payload) {
			return Promise.error(payload);
		}
			
	});
	
	TaskRegistry.register("echofail", Cls);
	
	return Cls;
});


Scoped.define("jsonize:JsonizeEchoTimeoutTask", [
    "jsonize:AbstractJsonizeTask",
    "jsonize:JsonizeTaskRegistry",
    "betajs:Promise"
], function (Class, TaskRegistry, Promise, scoped) {
	var Cls = Class.extend({scoped: scoped}, {

		_run: function (payload) {
			var promise = Promise.create();
			setTimeout(function () {
				promise.asyncSuccess(payload);
			}, payload.delay);
			return promise;
		}
			
	});
	
	TaskRegistry.register("echotimeout", Cls);
	
	return Cls;
});


Scoped.define("jsonize:JsonizeEchoEventTask", [
	"jsonize:AbstractJsonizeTask",
	"jsonize:JsonizeTaskRegistry",
	"betajs:Promise"
], function (Class, TaskRegistry, Promise, scoped) {
	var Cls = Class.extend({scoped: scoped}, {

		_run: function (payload) {
			this._event(payload);
			return Promise.value(payload);
		}

	});

	TaskRegistry.register("echoevent", Cls);

	return Cls;
});


Scoped.define("jsonize:JsonizeSlowEchoEventTask", [
	"jsonize:AbstractJsonizeTask",
	"jsonize:JsonizeTaskRegistry",
	"betajs:Promise"
], function (Class, TaskRegistry, Promise, scoped) {
	var Cls = Class.extend({scoped: scoped}, {

		_run: function (payload) {
			var promise = Promise.create();
			var count = payload.count;
			var self = this;
			var intv = setInterval(function () {
				if (count > 0) {
					count--;
					self._event(payload);
					return;
				}
				clearInterval(intv);
				promise.asyncSuccess(payload);
			}, payload.delay);
			return promise;
		}

	});

	TaskRegistry.register("slowechoevent", Cls);

	return Cls;
});