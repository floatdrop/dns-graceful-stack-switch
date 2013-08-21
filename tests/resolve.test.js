var expect = require('chai').expect;
var dns = require('dns');

var ipv4;
var ipv6;

describe("Test resolving", function() {

	it('resolve4 should resolve yandex.ru into same address as dns module', function(done) {
		require('..')(4);
		dns.resolve4('www.yandex.ru', function(err, addresses) {
			addresses.sort();
			expect(addresses).to.eql(ipv4);
			done(err);
		});		
	});

	it('resolve6 yandex.ru into same address as dns module', function(done) {
		require('..')(6);
		dns.resolve6('www.yandex.ru', function(err, addresses) {
			addresses.sort();
			expect(addresses).to.eql(ipv6);
			done(err);
		});		
	});

	before(function(done) {
		var tasks = 2;

		dns.resolve4('www.yandex.ru', function(err, addresses) {
			ipv4 = addresses;
			ipv4.sort();
			tasks -= 1;
			if (!tasks) done();
		});

		dns.resolve6('www.yandex.ru', function(err, addresses) {
			ipv6 = addresses;
			ipv6.sort();
			tasks -= 1;
			if (!tasks) done();
		});
	});

});
