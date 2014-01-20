var xmlrpc = require('xmlrpc');

var magento = function(config) {

    return {

        client: xmlrpc.createClient(config),

        init: function(cb) {
            this._discover(cb);
            return this;
        },

        login: function(next) {
            var self = this;
            self.client.methodCall('login', [ config.login, config.pass ], function(err,sessionId) {
                if (err)
                    console.log("Login Error: " + err);
                else {
                    console.log('session-id:' + sessionId);
                    self.client.sessionId = sessionId;
                    next();
                }
            });
        },

        end: function(cb) {
            var client = this.client;
            client.methodCall('endSession', [ client.sessionId ], cb);
        },

        _xcall: function(api,apiargs) {
            var self = this;
            var client = self.client;
            var args = Array.prototype.slice.call(apiargs);
            var callback = args.pop();

            var next = function() {
                client.methodCall('call', [ client.sessionId, api, args ], function(err,res) {
                    if (err) {
                                        // try logging in again
                                        if (err.faultCode == 5 && client.sessionId) {
                                            client.sessionId = undefined;
                                            return self._xcall(api,apiargs);
                                        }
                                    }
                                    callback(err,res);
                                });
            }

            if (client.sessionId == undefined)
                self.login(next);
            else
                next();

        },


        _call: function(apiargs) {
            var args = Array.prototype.slice.call(apiargs);
            var callback = args.pop();
            var api = args.shift();
            var client = this.client;

            client.methodCall('call', [ client.sessionId, api, args ], callback);
        },

        _discover: function(cb) {
            var self = this;
            var client = self.client;
            var next = function() {
                client.methodCall('resources', [ client.sessionId ], function(err,resources) {
                    if (!err) {
                        for (var j =0; j < resources.length; j++) {
                            var resource = resources[j];
                            var methods = resource.methods;
                            self[resource.name] = {};
                            for (var i = 0; i < methods.length; i++) {
                                var method = methods[i];
                                self.define(method.path);
                            }
                        }
                        cb(null);
                    } else {
                        console.log("an error occured " + err);
                        cb(err);
                    }
                });
            }

            if (client.sessionId == undefined)
                self.login(next);
            else
                next();
        },

        call: function() {

            console.log("call called with arguments " + arguments);

            var self = this;
            var client = self.client;
            var apiargs = arguments;

            var next = function() {
                self._call(apiargs);
            }
            if (client.sessionId == undefined)
                self.login(next);
            else
                next();
        },

        define: function(apiname) {
            var obj = this;
            apis = apiname.split('.');
            if (obj[apis[0]] == undefined)
                obj[apis[0]] = {};
            obj[apis[0]][apis[1]] = function() {
                console.log('calling xcall for ' + apiname + '(' + arguments[0] + '...);');
                obj._xcall.call(obj, apiname, arguments );
            }
        }
    }
}

module.exports = magento;


