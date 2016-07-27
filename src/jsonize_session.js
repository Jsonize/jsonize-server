Scoped.define("jsonize:JsonizeSession", [
    "betajs:Class",
    "jsonize:JsonizeInvocation"
], function (Class, JsonizeInvocation, scoped) {
	return Class.extend({scoped: scoped}, function (inherited) {
		return {
			
			constructor: function (handler, readStream, writeStream) {
				inherited.constructor.call(this);
				this._openTransactions = {};
				this._handler = handler;
				this._readStream = readStream;
				this._writeStream = writeStream;
				var readline = require('readline');
				var rl = readline.createInterface({
			  	    input: readStream,
				    output: null,
				    terminal: false
				});				
				var self = this;
				rl.on('line', function (line) {
					self._read(JSON.parse(line));
				});
			},
			
			_write: function (transactionId, type, payload) {
				this._writeStream.write(JSON.stringify({
					transaction: transactionId,
					type: type,
					payload: payload
				}) + "\n");
			},
			
			_read: function (json) {
				if (json.type === 'invoke')
					this._cmdInvoke(json.transaction, json.payload);
				else if (json.type === 'terminate')
					this._cmdTerminate(json.transaction);
			},
			
			_cmdInvoke: function (transactionId, payload) {
				if (this._openTransactions[transactionId])
					return;
				var invocation = new JsonizeInvocation(this, payload);
				this._openTransactions[transactionId] = invocation;
				invocation.on("success", function (payload) {
					this._callbackSuccess(transactionId, payload);
				}, this);
				invocation.on("error", function (payload) {
					this._callbackError(transactionId, payload);
				}, this);
				invocation.on("event", function (payload) {
					this._callbackEvent(transactionId, payload);
				}, this);
				invocation.run();
			},
			
			_cmdTerminate: function (transactionId) {
				if (!this._openTransactions[transactionId])
					return;
				this._openTransactions[transactionId].terminate();
				delete this._openTransactions[transactionId];
			},
			
			_callbackSuccess: function (transactionId, payload) {
				if (!this._openTransactions[transactionId])
					throw "Unknown transaction " + transactionId;
				this._write(transactionId, "success", payload);
				this._openTransactions[transactionId].weakDestroy();
				delete this._openTransactions[transactionId];
			},
			
			_callbackError: function (transactionId, payload) {
				if (!this._openTransactions[transactionId])
					throw "Unknown transaction " + transactionId;
				this._write(transactionId, "error", payload);
				this._openTransactions[transactionId].weakDestroy();
				delete this._openTransactions[transactionId];
			},

			_callbackEvent: function (transactionId, payload) {
				if (!this._openTransactions[transactionId])
					throw "Unknown transaction " + transactionId;
				this._write(transactionId, "event", payload);
			}

		};
	});
});
