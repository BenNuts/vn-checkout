// Generated on 2014-09-30 using generator-angular 0.9.8
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest,
	modRewrite   = require('connect-modrewrite'),
	appConfig    = {
		app : 'app',
		dist: 'dist'
	},
	PCIaaS       = {
		urlTestEnv: 'payments-qa.dev.volusion.com',
		urlProdEnv: 'pmts.volusion.com'
	};

module.exports = function (grunt) {

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// Define the configuration for all the tasks
	grunt.initConfig({

		// Project settings
		yeoman       : appConfig,

		// Environment variables
		ngconstant   : {
			// Options for all targets
			options    : {
				space: '  ',
				wrap : '\'use strict\';\n\n {%= __ngModule %}',
				name : 'VolusionCheckout.config'
			},
			// Environment targets
			// see "BUILD" task to add additional targets
			samplestore: {
				options  : {
					dest: '<%= yeoman.app %>/scripts/config.js'
				},
				constants: {
					ENV: {
						name      : 'samplestore',
						MerchantId: '3de067d8d96d407697da4a9559f99681',
						path      : '<%= grunt.option(\'PCIaaS.url\') %>'
					}
				}
			},
			mybox      : {
				options  : {
					dest: '<%= yeoman.app %>/scripts/config.js'
				},
				constants: {
					ENV: {
						name      : 'mybox',
						MerchantId: ''
					}
				}
			},
			production : {
				options  : {
					dest: '<%= yeoman.app %>/scripts/config.js'
				},
				constants: {
					ENV: {
						name      : 'production',
						MerchantId: ''
					}
				}
			}
		},

		// Watches files for changes and runs tasks based on the changed files
		watch        : {
			bower     : {
				files: ['bower.json'],
				tasks: ['wiredep']
			},
			js        : {
				files  : ['<%= yeoman.app %>/scripts/{,*/}*.js'],
				tasks  : ['newer:jshint:all'],
				options: {
					livereload: '<%= connect.options.livereload %>'
				}
			},
			jsTest    : {
				files: ['test/spec/{,*/}*.js'],
				tasks: ['newer:jshint:test', 'karma']
			},
			sass      : {
				files: ['<%= yeoman.app %>/styles/**/*.scss', '<%= yeoman.app %>/scripts/**/*.scss'],
				tasks: ['sass:server']
			},
			gruntfile : {
				files: ['Gruntfile.js']
			},
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files  : [
					'<%= yeoman.app %>/**/*.html',
					'.tmp/styles/{,*/}*.css',
					'<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
				]
			}
		},

		// The actual grunt server settings
		connect      : {
			options   : {
				port      : 9300,
				// Change this to '0.0.0.0' to access the server from outside.
				hostname  : 'localhost',
				livereload: 35730
			},
			rules     : [
				{
					from: '^/(bower_components|fonts|images|scripts|styles|translations|views)(/.*)$',
					to  : '/$1$2'
				},
				{
					from: '^/404.html',
					to  : '/404.html'
				},
				{
					from: '^/(.*)$',
					to  : '/index.html'
				}
			],
			livereload: {
				options: {
					open      : true,
					middleware: function (connect) {
						return [
							proxySnippet,
							modRewrite([
								'^/paymentsv1_4/cards/(.*)$ https://' + grunt.option('PCIaaS.url') + '/paymentsv1_4/cards/$1 [P]',
								'^/paymentsv1_4/cards$ https://' + grunt.option('PCIaaS.url') + '/paymentsv1_4/cards [P]',
								'^[^\\.]*$ /index.html [L]']),
							connect.static('.tmp'),
							connect().use(
									'/bower_components',
									connect.static('./bower_components')
							),
							connect.static(appConfig.app)
						];
					}
				}
			},
			proxies   : [
				{
					context     : '/paymentsv1_4/cards/*',
					host        : '<%= grunt.option(\'PCIaaS.url\') %>',
					port        : 443,
					https       : true,
					xforward    : false,
					changeOrigin: true
				}
			],
			test      : {
				options: {
					port: 9301,
					base: [
						'.tmp',
						'test',
						'<%= yeoman.app %>'
					]
				}
			},
			dist      : {
				options: {
					base: '<%= yeoman.dist %>'
				}
			}
		},

		// Make sure code styles are up to par and there are no obvious mistakes
		jshint       : {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			},
			all    : {
				src: [
					'Gruntfile.js',
					'<%= yeoman.app %>/scripts/{,*/}*.js'
				]
			},
			test   : {
				options: {
					jshintrc: 'test/.jshintrc'
				},
				src    : ['test/spec/{,*/}*.js']
			}
		},

		// Empties folders to start fresh
		clean        : {
			dist     : {
				files: [{
					dot: true,
					src: [
						'.tmp',
						'<%= yeoman.dist %>/{,*/}*',
						'!<%= yeoman.dist %>/.git*'
					]
				}]
			},
			configure: {
				files: [
					{
						dot: true,
						src: [
							'<%= yeoman.app %>/scripts/config.js'
						]
					}
				]
			},
			server   : '.tmp'
		},

		// Add vendor prefixed styles
		autoprefixer : {
			options: {
				browsers: ['last 1 version']
			},
			dist   : {
				files: [{
					expand: true,
					cwd   : '.tmp/styles/',
					src   : '{,*/}*.css',
					dest  : '.tmp/styles/'
				}]
			}
		},

		// Automatically inject Bower components into the app
		wiredep      : {
			app : {
				src       : ['<%= yeoman.app %>/index.html'],
				ignorePath: /\.\.\//
			},
			sass: {
				src       : ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}', '<%= yeoman.app %>/scripts/**/*.scss'],
				ignorePath: /(\.\.\/){1,2}bower_components\//
			}
		},

		// Compiles Sass to CSS and generates necessary files if requested
		sass         : {
			options: {
				includePaths: [
					'bower_components'
				]
			},
			dist   : {
				files: [
					{
						expand: true,
						cwd   : '<%= yeoman.app %>/styles',
						src   : ['*.scss'],
						dest  : '.tmp/styles',
						ext   : '.css'
					}
				]
			},
			server : {
				files: [
					{
						expand: true,
						cwd   : '<%= yeoman.app %>/styles',
						src   : ['*.scss'],
						dest  : '.tmp/styles',
						ext   : '.css'
					}
				]
			}
		},

		// Renames files for browser caching purposes
		filerev      : {
			dist: {
				src: [
					'<%= yeoman.dist %>/scripts/{,*/}*.js',
					'<%= yeoman.dist %>/styles/{,*/}*.css',
					'<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
					'<%= yeoman.dist %>/fonts/*'
				]
			}
		},

		// Reads HTML for usemin blocks to enable smart builds that automatically
		// concat, minify and revision files. Creates configurations in memory so
		// additional tasks can operate on them
		useminPrepare: {
			html   : '<%= yeoman.app %>/index.html',
			options: {
				dest: '<%= yeoman.dist %>',
				flow: {
					html: {
						steps: {
							js : ['concat', 'uglifyjs'],
							css: ['cssmin']
						},
						post : {}
					}
				}
			}
		},

		// Performs rewrites based on filerev and the useminPrepare configuration
		usemin       : {
			html   : ['<%= yeoman.dist %>/{,*/}*.html'],
			css    : ['<%= yeoman.dist %>/styles/{,*/}*.css'],
			options: {
				assetsDirs: ['<%= yeoman.dist %>', '<%= yeoman.dist %>/images']
			}
		},

		// The following *-min tasks will produce minified files in the dist folder
		// By default, your `index.html`'s <!-- Usemin block --> will take care of
		// minification. These next options are pre-configured if you do not wish
		// to use the Usemin blocks.
		// cssmin: {
		//   dist: {
		//     files: {
		//       '<%= yeoman.dist %>/styles/main.css': [
		//         '.tmp/styles/{,*/}*.css'
		//       ]
		//     }
		//   }
		// },
		// uglify: {
		//   dist: {
		//     files: {
		//       '<%= yeoman.dist %>/scripts/scripts.js': [
		//         '<%= yeoman.dist %>/scripts/scripts.js'
		//       ]
		//     }
		//   }
		// },
		// concat: {
		//   dist: {}
		// },

		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd   : '<%= yeoman.app %>/images',
					src   : '{,*/}*.{png,jpg,jpeg,gif}',
					dest  : '<%= yeoman.dist %>/images'
				}]
			}
		},

		svgmin: {
			dist: {
				files: [{
					expand: true,
					cwd   : '<%= yeoman.app %>/images',
					src   : '{,*/}*.svg',
					dest  : '<%= yeoman.dist %>/images'
				}]
			}
		},

		htmlmin   : {
			options: {
				collapseWhitespace       : true,
				conservativeCollapse     : true,
				collapseBooleanAttributes: true,
				removeCommentsFromCDATA  : true,
				removeOptionalTags       : true
			},
			dist   : {
				files: [{
					expand: true,
					cwd   : '<%= yeoman.dist %>',
					src   : ['*.html', 'views/{,*/}*.html', 'scripts/{,*/}*.html'],
					dest  : '<%= yeoman.dist %>'
				}]
			},
			server : {
				files: [
					{
						expand: true,
						cwd   : '<%= yeoman.app %>',
						src   : ['*.html', 'views/{,*/}*.html', 'scripts/{,*/}*.html'],
						dest  : '.tmp'
					}
				]
			}
		},

		// ng-annotate tries to make the code safe for minification automatically
		// by using the Angular long form for dependency injection.
		ngAnnotate: {
			dist: {
				files: [{
					expand: true,
					cwd   : '.tmp/concat/scripts',
					src   : ['*.js', '!oldieshim.js'],
					dest  : '.tmp/concat/scripts'
				}]
			}
		},

		// Replace Google CDN references
		cdnify    : {
			dist: {
				html: ['<%= yeoman.dist %>/*.html']
			}
		},

		// Copies remaining files to places other tasks can use
		copy      : {
			dist  : {
				files: [{
					expand: true,
					dot   : true,
					cwd   : '<%= yeoman.app %>',
					dest  : '<%= yeoman.dist %>',
					src   : [
						'*.{ico,png,txt}',
						'.htaccess',
						'*.html',
						'views/{,*/}*.html',
						'images/{,*/}*.{webp}',
						'fonts/*'
					]
				}, {
					expand: true,
					cwd   : '.tmp/images',
					dest  : '<%= yeoman.dist %>/images',
					src   : ['generated/*']
				}, {
					expand: true,
					cwd   : '.',
					src   : 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*',
					dest  : '<%= yeoman.dist %>'
				}]
			},
			styles: {
				expand: true,
				cwd   : '<%= yeoman.app %>/styles',
				dest  : '.tmp/styles/',
				src   : '{,*/}*.css'
			}
		},

		// Run some tasks in parallel to speed up the build process
		concurrent: {
			server: [
				'sass:server'
			],
			test  : [
				'sass'
			],
			dist  : [
				'sass:dist',
				'imagemin',
				'svgmin'
			]
		},

		// Test settings
		karma     : {
			unit: {
				configFile: 'test/karma.conf.js',
				singleRun : true
			}
		}
	});

	grunt.registerTask('configure', function (target) {

		// Add additional targets according to environment variables
		if (target === undefined || target === 'undefined' || target === '' || target === 'samplestore') {
			//default build
			grunt.option('PCIaaS.url', PCIaaS.urlTestEnv);
			grunt.log.writeln('**********************************************************************');
			grunt.log.writeln('PMNT path:' + grunt.option('PCIaaS.url'));
			grunt.log.writeln('**********************************************************************');

			grunt.task.run(['ngconstant:samplestore']);
			grunt.log.writeln('**********************************************************************');
			grunt.log.writeln('TARGET is set to [SAMPLESTORE]');
			grunt.log.writeln('**********************************************************************');
		} else {
			//specific build
			grunt.option('PCIaaS.url', PCIaaS.urlProdEnv);
			grunt.log.writeln('**********************************************************************');
			grunt.log.writeln('PMNT path:' + grunt.option('PCIaaS.url'));
			grunt.log.writeln('**********************************************************************');

			grunt.task.run(['ngconstant:' + target]);
			grunt.log.writeln('**********************************************************************');
			grunt.log.writeln('TARGET is set to [' + target + ']');
			grunt.log.writeln('**********************************************************************');
		}
	});


	grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
		if (target === 'dist') {
			return grunt.task.run(['build', 'connect:dist:keepalive']);
		}

		if (!grunt.file.exists('<%= yeoman.dist %>')) {
			grunt.log.writeln('**********************************************************************');
			grunt.log.writeln('** DIST folder is missing. Building for default target ...  ');
			grunt.log.writeln('**********************************************************************');
			grunt.task.run(['build']);
		}

		grunt.task.run([
			'clean:server',
			'wiredep',
			'concurrent:server',
			'autoprefixer',
			'htmlmin:server',
			'connect:livereload',
			'watch'
		]);
	});

	grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
		grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
		grunt.task.run(['serve:' + target]);
	});

	grunt.registerTask('test', [
		'clean:server',
		'concurrent:test',
		'autoprefixer',
		'connect:test',
		'karma'
	]);

	grunt.registerTask('build', function (target) {
		grunt.task.run([
			'clean:dist',
			'clean:configure',
			'newer:jshint:all',
			'configure:' + target,
			'test',
			'wiredep',
			'useminPrepare',
			'concurrent:dist',
			'autoprefixer',
			'concat',
			'ngAnnotate',
			'copy:dist',
			//'cdnify',
			'cssmin',
			'uglify',
			'filerev',
			'usemin',
			'htmlmin'
		]);
	});

	grunt.registerTask('default', [
		'build:samplestore'		// set your default target
	]);
};
