Scoped.define("jsonize:JsonizeInvocation", [
    "betajs:Class",
    "betajs:Events.EventsMixin",
    "betajs:Objs",
    "betajs:Types",
    "jsonize:JsonizeTaskRegistry"
], function (Class, EventsMixin, Objs, Types, TaskRegistry, scoped) {
	return Class.extend({scoped: scoped}, [EventsMixin, function (inherited) {
		return {
			
			constructor: function (session, payload) {
				inherited.constructor.call(this);
				this._session = session;
				this._payload = Types.is_array(payload) ? payload : [payload];
				this._running = false;
				this._finished = false;
				this._rollingBack = false;
				this._currentIndex = 0;
			},
			
			run: function () {
				if (this._running || this._finished)
					return;
				this._running = true;
				try {
					this._tasks = Objs.map(this._payload, function (task, index) {
						if (!task.task) {
							throw {
								"type": "malformed_request",
								"message": "Task attribute missing from task"
							};
						}
						var jsonizeTask = TaskRegistry.load(task.task);
						if (!jsonizeTask) {
							throw {
								"type": "unknown_task",
								"message": "The task '" + task.task + "' is unknown."
							};
						}
						this.auto_destroy(jsonizeTask);
						return {
							taskName: task.task,
							originalTask: task,
							originalPayload: task.payload,
							jsonizeTask: jsonizeTask,
							index: index,
							executed: false,
							rolledback: false,
							payload: null,
							result: null
						};
					}, this);
				} catch (e) {
					this._running = false;
					this._finished = true;
					this._error(e);
					return;
				}
				this._execute(0);
			},
			
			_execute: function (index) {
				this._currentIndex = index;
				if (index >= this._tasks.length) {
					this._running = false;
					this._finished = true;
					this._success(Objs.map(this._tasks, function (task) {
						return {
							payload: task.payload,
							result: task.result
						};
					}));
					return;
				}
				var current = this._tasks[index];
				current.payload = Objs.map(current.originalPayload, function (value, key) {
					return !Types.is_string(value) ? value : value.replace(/\$([\d+]?){([^}]+?)}/, function (match, i, expr) {
						try {
							return this._tasks.result[parseInt(i, 10)][expr];
						} catch (e) {
							return match;
						}
					});
				}, this);
				current.jsonizeTask.on("event", function (payload) {
					this._event({
						index: index,
						task: current.taskName,
						payload: payload
					});
				}, this);
				try {
                    current.jsonizeTask.run(current.payload).success(function (payload) {
                        this._running = false;
                        this._finished = true;
                        current.result = payload;
                        current.executed = true;
                        this._execute(index + 1);
                    }, this).error(function (error) {
                        current.error = error;
                        this.rollback();
                    }, this);
                } catch (e) {
					current.error = e;
					this.rollback();
				}
			},
			
			terminate: function () {
				if (this._running)
					this.rollback();
			},
			
			rollback: function () {
				this._rollingBack = true;
				this._tasks[this._currentIndex].jsonizeTask.abort().callback(function () {
					this._rollback(this._currentIndex);
				}, this);
			},
			
			_rollback: function (index) {
				if (index < 0) {
					this._running = false;
					this._finished = true;
					this._rollingBack = false;
					var current = this._tasks[this._currentIndex];
					this._error({
						index: current.index,
						task: current.taskName,
						payload: current.payload,
						error: current.error
					});
					return;
				}
				this._tasks[index].jsonizeTask.rollback().callback(function () {
					this._rollback(index - 1);
				}, this);
			},			

			_success: function (payload) {
				this.trigger("success", payload);
			},
			
			_error: function (payload) {
				this.trigger("error", payload);
			},
			
			_event: function (payload) {
				this.trigger("event", payload);
			}
				
		};
	}]);
});
