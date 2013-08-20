var expect = require('chai').expect;
var _ = require('lodash');
var dnsSync = require('..');
var dns = require('dns');

describe('resolve', function() {
	it('should resolve yandex.ru into same address as dns module', function(done) {
		dns.resolve('www.yandex.ru', function(err, addresses) {
			var our = dnsSync.resolve('www.yandex.ru');	
			expect(our).to.eql(addresses);
		});		
	});
});

describe('resolve4', function() {
	it('should resolve yandex.ru into same address as dns module', function(done) {
		dns.resolve4('www.yandex.ru', function(err, addresses) {
			var our = dnsSync.resolve4('www.yandex.ru');	
			expect(our).to.eql(addresses);
		});		
	});
});

describe('resolve6', function() {
	it('should resolve yandex.ru into same address as dns module', function(done) {
		dns.resolve6('www.yandex.ru', function(err, addresses) {
			var our = dnsSync.resolve6('www.yandex.ru');	
			expect(our).to.eql(addresses);
		});		
	});
});
