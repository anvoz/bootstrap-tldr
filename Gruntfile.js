'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all subfolders, use:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Configurable paths
  var config = {
    app: 'app',
    dist: 'dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    config: config,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= config.app %>/scripts/{,*/}*.js'],
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      },
      jstest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['test:watch']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      styles: {
        files: ['<%= config.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= config.app %>/images/{,*/}*'
        ]
      },
      htmlbuildCSS: {
        files: [
          '<%= config.app %>/contents/sections/css/*.html',
          '<%= config.app %>/contents/sections/css.html'
        ],
        tasks: ['htmlbuild:css']
      },
      htmlbuildComponents: {
        files: [
          '<%= config.app %>/contents/sections/components/*.html',
          '<%= config.app %>/contents/sections/components.html'
        ],
        tasks: ['htmlbuild:components']
      },
      htmlbuildJavascript: {
        files: [
          '<%= config.app %>/contents/sections/javascript/*.html',
          '<%= config.app %>/contents/sections/javascript.html'
        ],
        tasks: ['htmlbuild:javascript']
      },
      htmlbuild: {
        files: ['<%= config.app %>/contents/*.html'],
        tasks: ['htmlbuild:app']
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        open: true,
        livereload: 35729,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect().use('/bower_components', connect.static('./bower_components')),
              connect.static(config.app)
            ];
          }
        }
      },
      test: {
        options: {
          open: false,
          port: 9001,
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use('/bower_components', connect.static('./bower_components')),
              connect.static(config.app)
            ];
          }
        }
      },
      dist: {
        options: {
          base: '<%= config.dist %>',
          livereload: false
        }
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= config.dist %>/*',
            '!<%= config.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= config.app %>/scripts/{,*/}*.js',
        '!<%= config.app %>/scripts/vendor/*',
        'test/spec/{,*/}*.js'
      ]
    },

    // Mocha testing framework configuration options
    mocha: {
      all: {
        options: {
          run: true,
          urls: ['http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html']
        }
      }
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the HTML file
    wiredep: {
      app: {
        ignorePath: /^\/|\.\.\//,
        src: ['<%= config.app %>/index.html'],
        exclude: ['bower_components/bootstrap/dist/js/bootstrap.js']
      }
    },

    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%= config.dist %>/scripts/{,*/}*.js',
            '<%= config.dist %>/styles/{,*/}*.css',
            '<%= config.dist %>/images/{,*/}*.*',
            '<%= config.dist %>/styles/fonts/{,*/}*.*',
            '<%= config.dist %>/*.{ico,png}'
          ]
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      options: {
        dest: '<%= config.dist %>'
      },
      html: '<%= config.app %>/index.html'
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      options: {
        assetsDirs: [
          '<%= config.dist %>',
          '<%= config.dist %>/images',
          '<%= config.dist %>/styles'
        ]
      },
      html: ['<%= config.dist %>/{,*/}*.html'],
      css: ['<%= config.dist %>/styles/{,*/}*.css']
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/images',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: '<%= config.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= config.dist %>/images'
        }]
      }
    },

    // By default, your `index.html`'s <!-- Usemin block --> will take care
    // of minification. These next options are pre-configured if you do not
    // wish to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= config.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css',
    //         '<%= config.app %>/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= config.dist %>/scripts/scripts.js': [
    //         '<%= config.dist %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>',
          dest: '<%= config.dist %>',
          src: [
            '*.{ico,png,txt}',
            'images/{,*/}*.webp',
            '{,*/}*.html',
            'styles/fonts/{,*/}*.*'
          ]
        }, {
          expand: true,
          dot: true,
          cwd: 'bower_components/bootstrap/dist',
          src: 'fonts/*',
          dest: '<%= config.dist %>'
        }]
      },
      styles: {
        expand: true,
        dot: true,
        cwd: '<%= config.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    // Generates a custom Modernizr build that includes only the tests you
    // reference in your app
    modernizr: {
      dist: {
        devFile: 'bower_components/modernizr/modernizr.js',
        outputFile: '<%= config.dist %>/scripts/vendor/modernizr.js',
        files: {
          src: [
            '<%= config.dist %>/scripts/{,*/}*.js',
            '<%= config.dist %>/styles/{,*/}*.css',
            '!<%= config.dist %>/scripts/vendor/*'
          ]
        },
        uglify: true
      }
    },

    // Run some tasks in parallel to speed up build process
    concurrent: {
      server: [
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'copy:styles',
        'imagemin',
        'svgmin'
      ]
    },

    // Append html partials
    htmlbuild: {
      css: {
        src: '<%= config.app %>/contents/sections/css.html',
        dest: '<%= config.app %>/contents/css.html',
        options: {
          sections: {
            typography: '<%= config.app %>/contents/sections/css/typography.html',
            tables: '<%= config.app %>/contents/sections/css/tables.html',
            forms: '<%= config.app %>/contents/sections/css/forms.html',
            buttons: '<%= config.app %>/contents/sections/css/buttons.html',
            images: '<%= config.app %>/contents/sections/css/images.html',
            helperClasses: '<%= config.app %>/contents/sections/css/helper_classes.html',
            responsiveUtilities: '<%= config.app %>/contents/sections/css/responsive_utilities.html'
          }
        }
      },
      components: {
        src: '<%= config.app %>/contents/sections/components.html',
        dest: '<%= config.app %>/contents/components.html',
        options: {
          sections: {
            glyphicons: '<%= config.app %>/contents/sections/components/glyphicons.html',
            dropdowns: '<%= config.app %>/contents/sections/components/dropdowns.html',
            buttonGroups: '<%= config.app %>/contents/sections/components/button_groups.html',
            inputGroups: '<%= config.app %>/contents/sections/components/input_groups.html',
            navs: '<%= config.app %>/contents/sections/components/navs.html',
            navbar: '<%= config.app %>/contents/sections/components/navbar.html',
            breadcrumbs: '<%= config.app %>/contents/sections/components/breadcrumbs.html',
            pagination: '<%= config.app %>/contents/sections/components/pagination.html',
            labels: '<%= config.app %>/contents/sections/components/labels.html',
            jumbotron: '<%= config.app %>/contents/sections/components/jumbotron.html',
            pageHeader: '<%= config.app %>/contents/sections/components/page_header.html',
            thumbnails: '<%= config.app %>/contents/sections/components/thumbnails.html',
            alerts: '<%= config.app %>/contents/sections/components/alerts.html',
            progressBars: '<%= config.app %>/contents/sections/components/progress_bars.html',
            mediaObject: '<%= config.app %>/contents/sections/components/media_object.html',
            listGroup: '<%= config.app %>/contents/sections/components/list_group.html',
            panels: '<%= config.app %>/contents/sections/components/panels.html',
            wells: '<%= config.app %>/contents/sections/components/wells.html'
          }
        }
      },
      javascript: {
        src: '<%= config.app %>/contents/sections/javascript.html',
        dest: '<%= config.app %>/contents/javascript.html',
        options: {
          sections: {
            modals: '<%= config.app %>/contents/sections/javascript/modals.html',
            dropdowns: '<%= config.app %>/contents/sections/javascript/dropdowns.html',
            tabs: '<%= config.app %>/contents/sections/javascript/tabs.html',
            tooltips: '<%= config.app %>/contents/sections/javascript/tooltips.html',
            popovers: '<%= config.app %>/contents/sections/javascript/popovers.html',
            alerts: '<%= config.app %>/contents/sections/javascript/alerts.html',
            buttons: '<%= config.app %>/contents/sections/javascript/buttons.html',
            collapse: '<%= config.app %>/contents/sections/javascript/collapse.html',
            carousel: '<%= config.app %>/contents/sections/javascript/carousel.html'
          }
        }
      },
      app: {
        src: '<%= config.app %>/contents/index.html',
        dest: '<%= config.app %>/index.html',
        options: {
          parseTag: 'buildapp',
          sections: {
            feature: '<%= config.app %>/contents/feature.html',
            css: '<%= config.app %>/contents/css.html',
            components: '<%= config.app %>/contents/components.html',
            javascript: '<%= config.app %>/contents/javascript.html',
            sidebar: '<%= config.app %>/contents/sidebar.html'
          }
        }
      },
      dist: {
        src: '<%= config.app %>/index.html',
        dest: '<%= config.app %>/index.html',
        options: {
          parseTag: 'builddist',
          sections: {
            githubRibbon: '<%= config.app %>/contents/sections/extra/github_ribbon.html',
            footer: '<%= config.app %>/contents/sections/extra/footer.html',
            sidebarBanners: '<%= config.app %>/contents/sections/extra/sidebar_banners.html'
          }
        }
      }
    }
  });


  grunt.registerTask('serve', 'start the server and preview your app, --allow-remote for remote access', function (target) {
    if (grunt.option('allow-remote')) {
      grunt.config.set('connect.options.hostname', '0.0.0.0');
    }
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'wiredep',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run([target ? ('serve:' + target) : 'serve']);
  });

  grunt.registerTask('test', function (target) {
    if (target !== 'watch') {
      grunt.task.run([
        'clean:server',
        'concurrent:test',
        'autoprefixer'
      ]);
    }

    grunt.task.run([
      'connect:test',
      'mocha'
    ]);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'wiredep',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'cssmin',
    'uglify',
    'copy:dist',
    'modernizr',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
