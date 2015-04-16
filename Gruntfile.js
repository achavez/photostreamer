module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Copy FontAwesome files to the fonts/ directory
    copy: {
      fonts: {
        src: [
          'src/font/fonts/**'
        ],
        dest: 'dist/fonts/',
        flatten: true,
        expand: true
      }
    },

    // Delete files before running a build
    clean: {
      css: ['fonts', 'dist/client.css'],
      js: ['static/*.js*', 'build/*.js']
    },

    // Compile LESS
    less: {
      client: {
        options: {
          cleancss: true
        },
        files: {
          "dist/styles.css": "src/less/styles.less"
        }
      }
    },

    // Lint JavaScript
    jshint: {
      client: ['src/js/**/*.js']
    },

    // Build client bundle with r.js optimizer
    /*
    requirejs: {
      client: {
        options: {
          baseUrl: 'client/js',
          mainConfigFile: 'client/js/config.js',
          out: 'static/client.js',
          optimize: 'uglify2',
          include: ['config', 'main'],
          name: '../../bower_components/almond/almond',
          generateSourceMaps: true,
          preserveLicenseComments: false
        }
      }
    },
    */

    // Watch client-side code for changes and re-build as needed
    watch: {
      js: {
        files: ['src/js/**/*.js'],
        tasks: ['build:js']
      },
      less: {
        files: ['src/less/**/*.less'],
        tasks: ['build:css']
      },
      // Only livereload when restart/build is complete
      livereload: {
        files: ['dist/*.css', 'dist/*.js'],
        options: {
          livereload: true
        }
      }
    }

  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-less');
  //grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Tasks
  //grunt.registerTask('build:js', ['jshint:client', 'clean:js', 'requirejs']);
  grunt.registerTask('build:css', ['clean:css', 'copy', 'less']);
  grunt.registerTask('build', ['build:js', 'build:css']);

  grunt.registerTask('default', ['build', 'watch']);

};
