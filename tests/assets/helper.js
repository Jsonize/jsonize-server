global.jsonize = function (json) {
	return require("child_process").execSync(
        __dirname + "/../../bin/jsonize --instance",
        { input: JSON.stringify(json) }
    ).toString().trim().split("\n").map(JSON.parse, JSON);
};