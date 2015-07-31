var expect = require('chai').expect;
var dns = require('dns');

var host = "unknown host";

var ipv4;
var ipv6;

describe("Test error reporting", function () {

	it('Error should contain IPv4 and IPv6 errors', function (done) {
		require('..')(6);
		dns.lookup(host, function (err, address, family) {
			expect(err.message).to.include("IPv4");
			expect(err.message).to.include("IPv6");
			done();
		});
	});

});
