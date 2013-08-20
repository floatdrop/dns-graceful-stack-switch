var dns = require('dns');
var _ = require('lodash');
var sync = require('synchronize');
var dnsSync = module.exports;

var methods = [
	"lookup",
	"resolve",
	"resolve4",
	"resolve6",
	//"resolveM",
	"resolveTxt",
	"resolveSrv",
	"resolveNs",
	"resolveCname",
	"reverse"
];

_(methods).each(function(methodName) {
	dnsSync[methodName] = sync(dns, methodName);
	/*function() {
		var self = this;
		var args = arguments;
		var response;
		response = dns[methodName].sync(self, args[1]);
		return response;
	};*/
});
