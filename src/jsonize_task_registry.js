Scoped.define("jsonize:JsonizeTaskRegistry", [
    "betajs:Class"
], function (Class, scoped) {
	return Class.extend({scoped: scoped}, {}, {
		
		classes: {},
		
		register: function (name, cls) {
			this.classes[name] = cls;
		},
		
		load: function (name) {
			return this.classes[name] ? new this.classes[name] : null;
		}
			
	});
});