SHELL := /bin/bash

test:
	@mocha -R spec

hint:
	@jshint index.js test.js package.json

# UglifyJS v1.3.4
min:
	@echo -n ';' > da.min.js; uglifyjs -nc da.js >> da.min.js;

.PHONY: test hint min
