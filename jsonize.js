Scoped = require("betajs-scoped/dist/scoped.js");
BetaJS = require('betajs/dist/beta-noscoped.js');
Scoped.binding("betajs", "global:BetaJS");
Scoped.binding("jsonize", "global:Jsonize");
require(__dirname + "/src/abstract_jsonize_handler.js");
require(__dirname + "/src/abstract_jsonize_task.js");
require(__dirname + "/src/instance_jsonize_handler.js");
require(__dirname + "/src/jsonize_echo_task.js");
require(__dirname + "/src/jsonize_invocation.js");
require(__dirname + "/src/jsonize_session.js");
require(__dirname + "/src/jsonize_task_registry.js");
require(__dirname + "/src/server_jsonize_handler.js");
require(__dirname + "/src/http_server_jsonize_handler.js");

/*
opt = require('node-getopt').create([
    ["", "instance", "run as a single instance version"],
    ["", "server=PORT", "run as a server version"],
    ["", "task=TASK", "run as a particular task"],
    ["", "httpserver=PORT", "run as a http server version"],
    ["", "registry=FILE", "use registry"],
    ["", "register=FILES", "register files separated by comma"]
]).bindHelp().parseSystem().options;
*/
var opts = {};
for (var i = 2; i < process.argv.length; ++i) {
    var key = process.argv[i].substring(2);
    var value = true;
    if (i < process.argv.length -1 && process.argv[i+1].indexOf("-") !== 0) {
        ++i;
        value = process.argv[i];
    }
    opts[key] = value;
}
var keys = ["instance", "server", "task", "httpserver", "registry", "register", "single-result", "simple-result"];
var opt = {};
var custom = opts;
keys.forEach(function (key) {
    if (key in custom) {
        opt[key] = custom[key];
        delete custom[key];
    }
});


process.on('uncaughtException', function (err) { });

if (opt.registry)
	JSON.parse(require("fs").readFileSync(opt.registry)).forEach(require);

if (opt.register)
	opt.register.split(",").forEach(require);

var handler = null;

var handlerOpts = {
    singleResult: opt["single-result"],
    simpleResult: opt["simple-result"]
};

if (opt.server)
    handler = new Jsonize.ServerJsonizeHandler(parseInt(opt.server, 10), handlerOpts);
else if (opt.httpserver)
    handler = new Jsonize.HttpServerJsonizeHandler(parseInt(opt.httpserver, 10), handlerOpts);
else
	handler = new Jsonize.InstanceJsonizeHandler(opt.task, BetaJS.Types.is_empty(custom) ? null : custom, handlerOpts);

if (handler)
	handler.run();