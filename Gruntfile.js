
/* jshint node: true */
'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        reporter: require('jshint-stylish'),
      },
      'all': {
        src: 'lib/**/*.js',
      },
    },
    jscs: {
      'all': {
        options: {
          config: '.jscsrc',
        },
        src: 'lib/**/*.js',
      },
    },
    browserify: {
      src: {
        files: {
          'dist/angular-gf-sticky-footer.js': 'src/**/*.js',
        },
        options: {
          bundleOptions: {
            debug: true,
          },
        },
      },
    },
    uglify: {
      src: {
        files: {
          'dist/angular-gf-sticky-footer.browser.js': 'dist/angular-gf-sticky-footer.min.js',
        },
        options: {
          sourceMap: true,
          sourceMapIn: 'njcsite/static/dist/app.browser.js.map',
        },
      },
    },
    release: {
      options: {
        npm: false,
      },
    },
  });

  // Load the task plugins.
  require('load-grunt-tasks')(grunt);

  //
  // Installation
  //

  // install and process all resources
  grunt.registerTask('install', ['browserify:src', 'uglify:src']);

  // process all JS (for running with proxy)

  //
  // Releasing
  //

  grunt.registerTask('release', [
    'release:patch',
  ]);

  grunt.registerTask('release-minor', [
    'release:minor',
  ]);

  grunt.registerTask('release-major', [
    'release:major',
  ]);

  //
  // Default task
  //

  grunt.registerTask('default', [
    'watch',
  ]);

};
