test("echo task", function() {
	var input = {
		"type" : "invoke",
		"transaction" : 123,
		"payload" : {
			"task" : "echo",
			"payload" : {
				"foobar" : 42
			}
		}
	};
	var output = jsonize(input);
	QUnit.deepEqual(output[0], {
		transaction : 123,
		type : 'success',
		payload : [{
			payload : {
				"foobar" : 42
			},
			result : {
				"foobar" : 42
			}
		}]
	});
});

test("echo event task", function() {
	var input = {
		"type" : "invoke",
		"transaction" : 124,
		"payload" : {
			"task" : "echoevent",
			"payload" : {
				"foobar" : 42
			}
		}
	};
	var output = jsonize(input);
	QUnit.deepEqual(output[0], {
		transaction : 124,
		type : 'event',
		payload: {
			index: 0,
			task: 'echoevent',
			payload: {
				foobar: 42
			}
		}
	});
	QUnit.deepEqual(output[1], {
		transaction : 124,
		type : 'success',
		payload : [{
			payload : {
				"foobar" : 42
			},
			result : {
				"foobar" : 42
			}
		}]
	});
});
