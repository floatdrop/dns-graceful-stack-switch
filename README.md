dns-gracefull-stack-switch 
========

[![Build Status](https://travis-ci.org/floatdrop/dns-gracefull-stack-switch.png?branch=master)](https://travis-ci.org/floatdrop/dns-gracefull-stack-switch) [![NPM version](https://badge.fury.io/js/dns-gracefull-stack-switch.png)](http://badge.fury.io/js/dns-gracefull-stack-switch)

Monkey patch DNS lookup method for node.js.

### Why?

If you used node.js with disabled IPv4 - you got exception (ENETUNREACH) in most of network operations, but ```ping6 address``` working fine. 

To fix this error with minimal amount of code (you still can use [```dns.resolve6```](http://nodejs.org/docs/v0.8.25/api/dns.html#dns_dns_resolve6_domain_callback) and get valid IPv6 addresses) - monkey patched lookup method was written.

### How?

```javascript
require('dns-gracefull-stack-switch')(6);
```

This module returns function, with one argument: default IP stack version. After executing dns.lookup will be loaded with ```require``` and ```lookup``` method will be replaced.

### Node.JS way

This bug was "[pathced](https://github.com/joyent/node/commit/edd2fcccf022c7014b374674012283422faa1bed)" in Node.js, but magic option in ```net.connect``` not released yet.

### To run the tests:

Unix/Macintosh:

    make test
