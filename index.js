var dns = require('dns');

/** old dns.lookup function - used to restore original function **/
var lookup;

/**
 * A module that monkeypatch dns.lookup for graceful
 * falling to another IP stack version.
 * @module dns-graceful-stack-switch
 */

/**
 * Monkeypatch function
 * @param {Number} defaultVersion - version of IP stack, that will be used first
 * @param {Boolean} remove - if true, removes monkeypatch
 */
module.exports = function (defaultVersion, remove) {

	if (remove && dns.lookup._wrapped) {
		dns.lookup = lookup;
		lookup = undefined;
		return;
	}

	/* check, that we won't wrap already wrapped function */
	if (dns.lookup._wrapped)
		return;

	/** default version of IP stack to lookup first */
	defaultVersion = defaultVersion || process.env.NODE_DNS_GRACEFUL_STACK_SWITCH_DEFAULT || 4;

	/** store original function, in case removing */
	lookup = dns.lookup;

	/**
	 * Patched function wrapper
	 * @param domain {String} - domain to lookup for
	 * @param family {Number} - version of IP stack to use first
	 * @param callback {Function} - callback function (signature: function(err, address, family))
	 */
	dns.lookup = function (domain, family, callback) {

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

		var requestedFamily = family || defaultVersion;

		lookup(domain, requestedFamily, function (err, address, family) {
			if (!err) {
				return callback(err, address, family);
			}

			/* store error for full output, in case next lookup fails */
			var prevError = "IPv" + requestedFamily + " " + err.message + "; ";

			/* choose other family, that was not used */
			var otherFamily = requestedFamily === 4 ? 6 : 4;

			lookup(domain, otherFamily, function (err, address, family) {
				if (err) {
					/* modify error to store previous lookup error */
					err.message = prevError + "IPv" + otherFamily + " " + err.message;
				}
				callback(err, address, family);
			});
		});
	};

	/** _wrapped - boolean flag to recognize patched functions between different versions of modules **/
	dns.lookup._wrapped = true;
};
