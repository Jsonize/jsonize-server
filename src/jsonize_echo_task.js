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