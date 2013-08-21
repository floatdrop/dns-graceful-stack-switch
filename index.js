var dns = require('dns');
var lookup;

module.exports = function(defaultVersion, remove) {

	if (remove && lookup) { 
		dns.lookup = lookup;
		lookup = undefined;
		return;
	}

	if (lookup)
		return;

	defaultVersion = defaultVersion || 4;
	
	lookup = dns.lookup;

	dns.lookup = function(domain, family, callback) {
		if (arguments.length === 2) {
			callback = family;
			family = 0;
		} else if (!family) {
			family = 0;
		} else {
			family = +family;
			if (family !== 4 && family !== 6) {
				throw new Error('invalid argument: `family` must be 4 or 6');
			}
		}

		lookup(domain, family || defaultVersion, function(err, address, family) {
			if (err) {
				lookup(domain, family === 4 ? 6 : 4, callback);
			} else {
				callback(err, address, family);
			}
		});
	};
};
