module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',

    meta: {
      banner: '/*!\n <%= pkg.name %>-<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd hh:MM:ss TT Z") %>\n' +
        ' Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> \n*/'
    },
    dirs: {
      latest: 'dist/latest',
      versioned: 'dist/<%= pkg.name %>-<%= pkg.version %>',
      examples: 'eg'
    },

    // style & quality
    lint: {
      all: ['grunt.js', 'src/**/*.js', 'spec/**/*.js']
    },
    jshint: {
      options: {
        browser: true
      }
    },

    // bundle and dist
    concat: {
      js: {
        src: [
          '<banner>', 
          '<file_template:src/_package.header>', 
          'src/models.js', 
          '<file_template:src/_package.footer>'
        ],
        dest: '<%= dirs.latest %>/<%= pkg.name %>.js'
      },
      css: {
        src: ['src/styles/**/*.css'],
        dest: '<%= dirs.latest %>/styles.css'
      }
    },

    // create versioned release
    // copy: { release: {'<%= dirs.versioned %>': '<%= dirs.latest %>'} }

    // optimize versioned release
    min: {
      js: {
        src: ['<banner>', '<%= dirs.versioned %>/<%= pkg.name %>.js'],
        dest: '<%= dirs.versioned %>/<%= pkg.name %>.min.js'
      }
    },

    // productivity
    server: {
      base: '<config:dirs.examples>'
    },
    watch: {
      files: '**/*',
      tasks: ['lint', 'concat:latest']
    }
  });

  // Default task.
  grunt.registerTask('default', 'lint concat');

  grunt.registerTask('develop', 'server watch');
};