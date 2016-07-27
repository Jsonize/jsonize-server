test("echo task", function() {
	QUnit.deepEqual(jsonize({
		"type" : "invoke",
		"transaction" : 123,
		"payload" : {
			"task" : "echo",
			"payload" : {
				"foobar" : 42
			}
		}
	}), {
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
