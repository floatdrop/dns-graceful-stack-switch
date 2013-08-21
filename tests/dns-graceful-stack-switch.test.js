var expect = require('chai').expect;
var _ = require('lodash');

describe('dns-gracefull-stack-switch', function() {
	it('should load module with function', function() {
		var dnsPatcher = require('..');
		expect(_.isFunction(dnsPatcher));
	});
});
