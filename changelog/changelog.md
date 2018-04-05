## Changelog

* 1.3.0
  * Supporting StandardJS
  * Package upgrading
  * Added new grunt task (obfuscation)
  * Improved file architecture

* 1.2.0
	* Added `secrets.seedRNG()` function to allow seeding the SJCL RNG instantly via Browser or Node.js RNG's or with entropy from an external server.

* 1.1.0
	* Added `grunt watch` task to auto-run tests and minification on every JavaScript file save.
	* Minified file now contains name, version and author comments automatically.
	* Configured basic `grunt` tasks for minification, Node.js testing with Jasmine, jshint, eslint. Removed Karma test runner and manual minification and testing steps. Just run `grunt`.
	* [Bugfix] calling `secrets.init()` now actually resets *all* internal state back to the default settings. Previously `init()` only reset some internal values. `init()` now calls a new private function `reset()` to accomplish this.
	* [Enhancement] If the [Stanford Javascript Crypto Libarary (SJCL)](https://bitwiseshiftleft.github.io/sjcl/) is loaded in the browser it can be used as a fallback, or explicitly selected, CSPRNG for those browsers that don't support `crypto.getRandomValues()`. It uses the Fortuna RNG and collects additional entropy from mouse movements continually. The downside is that it requires mouse movements initially before `secrets.random()` can be called.  `secrets.random()` will throw an Error if called when SJCL is not fully seeded. Currently set to use the maximum SJCL 'paranoia' level of 10. An enhancement to this might be to call out to retrieve one or more external sources of entropy (and mixing them together) to pre-seed the RNG when the library is loaded.
	* [Enhancement] You can now pass a string to `init()` or `setRNG()` which forces loading of a specific RNG (whether it will work or not in your current env!)
	* Re-factored how `getRNG()` works internally. Now it returns small focused functions, not a giant function with detection conditionals. If SJCL is loaded the RNG tests are skipped since they would always initially fail due to the entropy pool being initally empty. This should be OK for this 'trusted' RNG.


* 1.0.0
	* Packaging cleanup and ready for 1.0.0 release on Bower and NPM.
	* [Enhancement] Now supports the Javascript Universal Module Definition [UMDJS](https://github.com/umdjs/umd) for loading this module in the Browser with a `secrets` global, using an AMD Module loader like require.js, or in Node.js apps.
	* Refactor getRNG() to no longer have embedded `require` now that crypto is included on module load with the UMDJS change.
	* Updated README.md with info about this fork of secret-sharing.js.
	* Added some simple examples of usage to the examples folder.

* 0.2.0
	* [Enhancement] Extend the output of getConfig() to include the `radix` and `maxShares` properties.
	* [Security] Zero-pad all secrets in multiples of 128 bits (instead of 0) by default.
	* [Performance] Massive (100x) speed optimization to padLeft() private function (the second most frequently called block of code internally).
	* [Testing] Added a full jasmine test suite and Karma test runner. Karma runs will also generate code coverage HTML reports. Code coverage is currently >90%.
	* [Testing] Expose all private functions as Underscore (_) prefixed functions to allow direct unit testing.
	* [Security] Removed Math.random fallback random number generator. Should always fail safe, even if it means not working. `secrets.getConfig().unsafePRNG` will always result in undefined now as it is no longer ever set.
	* Refactored away need to know anything about `global` var.
	* [Testing] jslint.com, jshint.com, and eslint CLI warnings for code and style now clean.
	* Beautify code.
* 0.1.8: bugfix release
* 0.1.7: added config.unsafePRNG reset when supplying a new PRNG
* 0.1.6:
	* Removed JSBN dependency, support for arbitrary radices, and the `convertBase()` function, with attendant 50% file size reduction.
	* Fixed bug where leading zeros were dropped.
	* Renamed string conversion functions.
* 0.1.5: getConfig() returns information about PRNG
* 0.1.4: new share format
