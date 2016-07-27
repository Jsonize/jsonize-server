global.jsonize = function (json) {
	return JSON.parse(require("child_process").execSync(
        __dirname + "/../../bin/jsonize --instance",
        { input: JSON.stringify(json) }
    ).toString());
};