module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jsbeautifier: {
      modify: {
        src: ['Gruntfile.js', 'lib/**/*.js', 'db/**.js', 'passport/**.js', 'conf/*.js', "static/*", "routes/**/*.js"],
        options: {
          config: '.jsbeautifyrc'
        }
      },
      verify: {
        src: ['Gruntfile.js', 'lib/**/*.js', 'db/**.js', 'passport/**.js', 'tests/**.js', 'example/*.js', "routes/**/*.js"],
        options: {
          mode: 'VERIFY_ONLY',
          config: '.jsbeautifyrc'
        }
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'lib/**/*.js', 'test/**.js', 'example/*.js']
    }
  });

  grunt.loadNpmTasks("grunt-jsbeautifier");
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('modify', [
    'jsbeautifier:modify',
    'jshint'
  ]);

  grunt.registerTask('verify', [
    'jsbeautifier:verify',
    'jshint'
  ]);
  // Default task(s).
  grunt.registerTask('default', ['verify']);

};
