SHELL := /bin/bash
m = "Updating version"

test:
	@mocha -R spec

hint:
	@jshint index.js test.js package.json

# UglifyJS v1.3.4
min:
	@echo -n ';' > da.min.js; uglifyjs -nc da.js >> da.min.js;

all:
	make hint;
	make test;
	make min;

commit:
	make test; if [ ! $$? -eq 0 ] ; then exit $$? ; fi
	make hint; if [ ! $$? -eq 0 ] ; then exit $$? ; fi
	make min; if [ ! $$? -eq 0 ] ; then exit $$? ; fi
	git add -A;
	git commit -a -m "$m";
	git push origin master;
	npm publish;

.PHONY: test hint min commit all
