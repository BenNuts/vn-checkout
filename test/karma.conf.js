// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2014-09-30 using
// generator-karma 0.8.3

module.exports = function (config) {
	'use strict';

	config.set({
		// enable / disable watching file and executing tests whenever any file changes
		autoWatch : true,

		// base path, that will be used to resolve files and exclude
		basePath  : '../',

		// testing framework to use (jasmine/mocha/qunit/...)
		frameworks: ['jasmine'],

		// list of files / patterns to load in the browser
		files     : [
			'bower_components/angular/angular.js',
			'bower_components/angular-mocks/angular-mocks.js',
			'bower_components/angular-animate/angular-animate.js',
			'bower_components/angular-cookies/angular-cookies.js',
			'bower_components/angular-resource/angular-resource.js',
			'bower_components/angular-route/angular-route.js',
			'bower_components/angular-sanitize/angular-sanitize.js',
			'bower_components/angular-touch/angular-touch.js',
			'bower_components/angular-ui-bootstrap-bower/ui-bootstrap.js',
			'bower_components/angular-translate/angular-translate.js',
			'bower_components/angular-translate-loader-partial/angular-translate-loader-partial.js',
			'bower_components/messageformat/messageformat.js',
			'bower_components/angular-translate-interpolation-messageformat/angular-translate-interpolation-messageformat.js',
			'bower_components/angular-translate-loader-partial/angular-translate-loader-partial.js',
			'bower_components/angular-translate-storage-cookie/angular-translate-storage-cookie.js',
			'bower_components/angular-translate-storage-local/angular-translate-storage-local.js',
			'bower_components/vn-toolbox-common/dist/vn-toolbox-common.js',
			'app/scripts/**/*.js',
			'test/mock/**/*.js',
			'test/spec/**/*.js'
		],

		// list of files / patterns to exclude
		exclude   : [],

		ngHtml2JsPreprocessor: {
			// strip this from the file path
			stripPrefix: 'app/scripts',
			// prepend this to the
			prependPrefix: '',

			// or define a custom transform function
			//cacheIdFromPath: function(filepath) {
			//	return cacheId;
			//},

			// setting this option will create only a single module that contains templates
			// from all the files, so you can load them all with module('foo')
			moduleName: 'Volusion.Checkout.templates'
		},

		preprocessors: {
			'app/scripts/**/*.html': ['ng-html2js']
		},

		// web server port
		port      : 8080,

		// Start these browsers, currently available:
		// - Chrome
		// - ChromeCanary
		// - Firefox
		// - Opera
		// - Safari (only Mac)
		// - PhantomJS
		// - IE (only Windows)
		browsers  : [
			'PhantomJS'
		],

		// Which plugins to enable
		plugins   : [
			'karma-phantomjs-launcher',
			'karma-jasmine'
		],

		// Continuous Integration mode
		// if true, it capture browsers, run tests and exit
		singleRun : false,

		colors  : true,

		// level of logging
		// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
		logLevel: config.LOG_INFO,

		// Uncomment the following lines if you are using grunt's server to run the tests
		// proxies: {
		//   '/': 'http://localhost:9000/'
		// },
		// URL root prevent conflicts with the site root
		// urlRoot: '_karma_'
	});
};
