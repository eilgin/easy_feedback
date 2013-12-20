/*global module:false*/
module.exports = function(grunt) {

  var meta = {
    banner: '/*\n  <%= pkg.title || pkg.name %> <%= pkg.version %>' +
      '<%= pkg.homepage ? " <" + pkg.homepage + ">" : "" %>' + '\n' +
      '  Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>' +
      '\n\n  Released under <%= _.pluck(pkg.licenses, "type").join(", ") %> License\n*/\n',
    pre: '\n(function(window, document, undefined){\n\n',
    post: '\n})(window,document);'
  };

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    concat: {
      dist: {
        src: [
          'src/easy_feedback.js'
        ],
        dest: 'build/<%= pkg.name %>.js'
      },
      options:{
        banner: meta.banner + meta.pre,
        footer: meta.post
      }
    },
    uglify: {
      dist: {
        src: ['<%= concat.dist.dest %>'],
        dest: 'build/<%= pkg.name %>.min.js'
      },
      options: {
        banner: meta.banner
      }
    },
    jshint: {
      all: ['<%= concat.dist.dest %>'],
      options: grunt.file.readJSON('./.jshintrc')
    }
  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task.
  grunt.registerTask('build', ['concat', 'uglify']);
  grunt.registerTask('default', ['concat', 'jshint', 'uglify']);
};
