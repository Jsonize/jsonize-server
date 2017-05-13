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

opt = require('node-getopt').create([
    ["", "instance", "run as a single instance version"],
    ["", "server=PORT", "run as a server version"],
    ["", "httpserver=PORT", "run as a http server version"],
    ["", "registry=FILE", "use registry"],
    ["", "register=FILES", "register files separated by comma"]
]).bindHelp().parseSystem().options;


process.on('uncaughtException', function (err) { });

if (opt.registry)
	JSON.parse(require("fs").readFileSync(opt.registry)).forEach(require);

if (opt.register)
	opt.register.split(",").forEach(require);

var handler = null;

if (opt.instance)
	handler = new Jsonize.InstanceJsonizeHandler();
else if (opt.server)
	handler = new Jsonize.ServerJsonizeHandler(parseInt(opt.server, 10));
else if (opt.httpserver)
    handler = new Jsonize.HttpServerJsonizeHandler(parseInt(opt.httpserver, 10));

if (handler)
	handler.run();