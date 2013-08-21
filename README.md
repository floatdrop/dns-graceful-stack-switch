dns-sync [![Build Status](https://travis-ci.org/floatdrop/dns-sync.png?branch=master)](https://travis-ci.org/floatdrop/dns-sync)
========

Synchronous DNS for node.js.

### Why?

If you used node dns module with disabled IPv4 - you got exception (ENETUNREACH), but ```ping6 __address__``` working fine. In most cases __address__ was stored in configs (like config.js):

```javascript
{
	// ...
	database: "hostname.that.resolves.in.ipv6.net"	
	// ...
}
```

To fix this error with minimal amount of code (you still can use [```dns.resolve6```](http://nodejs.org/docs/v0.8.25/api/dns.html#dns_dns_resolve6_domain_callback) and get valid IPv6 addresses, but asynchronous way) - synchronous dns binding was created.

```javascript
{
	// ...
	database: require('dns-sync').resolve("hostname.that.resolves.in.ipv6.net")	
	// ...
}
```

### To build:

Prerequisites (Unix only):

    * GCC 4.2 or newer
    * Python 2.6 or 2.7
    * GNU Make 3.81 or newer
    * libexecinfo (FreeBSD and OpenBSD only)

Unix/Macintosh:

    ./configure
    make
    make install

If your python binary is in a non-standard location or has a
non-standard name, run the following instead:

    export PYTHON=/path/to/python
    $PYTHON ./configure
    make
    make install

### To run the tests:

Unix/Macintosh:

    make test
