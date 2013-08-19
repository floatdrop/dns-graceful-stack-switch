var dns = require('dns');
var _ = require('lodash');
var sync = require('sync');
var dnsSync = module.exports;

var methods = [
	"lookup",
	"resolve",
	"resolve4",
	"resolve6",
	"resolveM",
	"resolveTxt",
	"resolveSrv",
	"resolveNs",
	"resolveCname",
	"reverse"
];

_(methods).each(function(methodName) {
	dnsSync[methodName] = function() {
		return _(dns[methodName]).partial(arguments).sync();
	};
});
