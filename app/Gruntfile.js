//  Type `npm install` from this directory

module.exports = function(grunt) {
  'use strict';

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dist: {
        files: {
          'css/styles.css': 'sass/styles.scss'
        },
        options: {
          outputStyle: 'compact' // expanded, nested, compact or compressed
        },
      },
    },

    jshint: {
      src: ['js/scripts.js'],
    },

    watch: {
      options: {
        livereload: 23476,
      },
      sass: {
        files: ['sass/*.scss'],
        tasks: ['sass', 'notify:sass'],
        options: {
          livereload: false,
        },
      },
      grunt: {
        files: ['Gruntfile.js']
      },
      js: {
        files: ['js/*.js'],
        tasks: ['jshint', 'notify:js']
      },
      css: {
        files: ['css/*.css'],
      },
    },

    notify: {
      js: {
        options: {
          message: 'JSHint finished, no errors!',
        },
      },
      sass: {
        options: {
          message: 'SASS finished compiling!',
        }
      },
    },

  }); // end jSON

  // Load plugins
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-notify');

  // Default task(s)
  grunt.registerTask('default', ['sass', 'watch']);

};