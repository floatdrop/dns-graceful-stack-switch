#!/bin/bash

MOCHA=./node_modules/.bin/mocha
TESTS=$(shell find tests -name "*.test.js")

test:
	$(MOCHA) $(TESTS)
