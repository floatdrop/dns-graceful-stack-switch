var expect = require('chai').expect;
var _ = require('lodash');

describe('dns-sync', function() {
	it('should load module with methods, same as in dns', function() {
		var dnsSync = require('..');
		var dns = require('dns');
		expect(_.difference(_(dnsSync).methods(), _(dns).methods())).to.eql([]);
	});
});
