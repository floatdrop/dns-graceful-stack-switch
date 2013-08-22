var expect = require('chai').expect;
var dns = require('dns');

var host = "www.google.com";

var ipv4;
var ipv6;

describe("Test resolving", function() {

	it('resolve4 should resolve yandex.ru into same address as dns module', function(done) {
		require('..')(null, true);
		require('..')(4);
		dns.lookup(host, function(err, address) {
			expect(err).to.not.exist;
			expect(address).to.exist;
			expect(ipv4).to.include(address);
			done(err);
		});		
	});

	it('resolve6 yandex.ru into same address as dns module', function(done) {
		require('..')(null, true);
		require('..')(6);
		dns.lookup(host, function(err, address) {
			expect(err).to.not.exist;
			expect(address).to.exist;
			expect(ipv6).to.include(address);
			done(err);
		});		
	});

	before(function(done) {
		var tasks = 2;

		dns.resolve4(host, function(err, addresses) {
			if (err) done(err);
			ipv4 = addresses;
			ipv4.sort();
			tasks -= 1;
			if (!tasks) done();
		});

		dns.resolve6(host, function(err, addresses) {
			if (err) done(err);
			ipv6 = addresses;
			ipv6.sort();
			tasks -= 1;
			if (!tasks) done();
		});
	});

});
