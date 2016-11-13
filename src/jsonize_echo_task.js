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


