// Generated on 2014-03-09 using generator-webapp 0.4.8
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        config: {
            // Configurable paths
            app: 'app',
            dist: 'dist'
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['bowerInstall']
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
            htmlbuild: {
                files: ['<%= config.app %>/fixtures/**/*.html'],
                tasks: ['htmlbuild:app']
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '.tmp',
                        '<%= config.app %>'
                    ]
                }
            },
            test: {
                options: {
                    port: 9001,
                    base: [
                        '.tmp',
                        'test',
                        '<%= config.app %>'
                    ]
                }
            },
            dist: {
                options: {
                    open: true,
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
                browsers: ['last 1 version']
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
        bowerInstall: {
            app: {
                src: ['<%= config.app %>/index.html'],
                ignorePath: '<%= config.app %>/'
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
                assetsDirs: ['<%= config.dist %>', '<%= config.dist %>/images']
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

        // By default, your `index.html`'s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.
        // cssmin: {
        //     dist: {
        //         files: {
        //             '<%= config.dist %>/styles/main.css': [
        //                 '.tmp/styles/{,*/}*.css',
        //                 '<%= config.app %>/styles/{,*/}*.css'
        //             ]
        //         }
        //     }
        // },
        // uglify: {
        //     dist: {
        //         files: {
        //             '<%= config.dist %>/scripts/scripts.js': [
        //                 '<%= config.dist %>/scripts/scripts.js'
        //             ]
        //         }
        //     }
        // },
        // concat: {
        //     dist: {}
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
                        '.htaccess',
                        'images/{,*/}*.webp',
                        '{,*/}*.html',
                        'styles/fonts/{,*/}*.*'
                    ]
                }, {
                    expand: true,
                    cwd: '<%= config.app %>/bower_components/bootstrap/dist/fonts',
                    dest: '<%= config.dist %>/fonts/',
                    src: '{,*/}*.*'
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
            devFile: '<%= config.app %>/bower_components/modernizr/modernizr.js',
            outputFile: '<%= config.dist %>/scripts/vendor/modernizr.js',
            files: [
                '<%= config.dist %>/scripts/{,*/}*.js',
                '<%= config.dist %>/styles/{,*/}*.css',
                '!<%= config.dist %>/scripts/vendor/*'
            ],
            uglify: true
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
                src: '<%= config.app %>/fixtures/sections/css.html',
                dest: '<%= config.app %>/fixtures/css.html',
                options: {
                    sections: {
                        typography: '<%= config.app %>/fixtures/sections/css/typography.html',
                        tables: '<%= config.app %>/fixtures/sections/css/tables.html',
                        forms: '<%= config.app %>/fixtures/sections/css/forms.html',
                        buttons: '<%= config.app %>/fixtures/sections/css/buttons.html',
                        images: '<%= config.app %>/fixtures/sections/css/images.html',
                        helperClasses: '<%= config.app %>/fixtures/sections/css/helper_classes.html',
                        responsiveUtilities: '<%= config.app %>/fixtures/sections/css/responsive_utilities.html'
                    }
                }
            },
            components: {
                src: '<%= config.app %>/fixtures/sections/components.html',
                dest: '<%= config.app %>/fixtures/components.html',
                options: {
                    sections: {
                        glyphicons: '<%= config.app %>/fixtures/sections/components/glyphicons.html',
                        dropdowns: '<%= config.app %>/fixtures/sections/components/dropdowns.html',
                        buttonGroups: '<%= config.app %>/fixtures/sections/components/button_groups.html',
                        inputGroups: '<%= config.app %>/fixtures/sections/components/input_groups.html',
                        navs: '<%= config.app %>/fixtures/sections/components/navs.html',
                        navbar: '<%= config.app %>/fixtures/sections/components/navbar.html',
                        breadcrumbs: '<%= config.app %>/fixtures/sections/components/breadcrumbs.html',
                        pagination: '<%= config.app %>/fixtures/sections/components/pagination.html',
                        labels: '<%= config.app %>/fixtures/sections/components/labels.html',
                        jumbotron: '<%= config.app %>/fixtures/sections/components/jumbotron.html',
                        pageHeader: '<%= config.app %>/fixtures/sections/components/page_header.html',
                        thumbnails: '<%= config.app %>/fixtures/sections/components/thumbnails.html',
                        alerts: '<%= config.app %>/fixtures/sections/components/alerts.html',
                        progressBars: '<%= config.app %>/fixtures/sections/components/progress_bars.html',
                        mediaObject: '<%= config.app %>/fixtures/sections/components/media_object.html',
                        listGroup: '<%= config.app %>/fixtures/sections/components/list_group.html',
                        panels: '<%= config.app %>/fixtures/sections/components/panels.html',
                        wells: '<%= config.app %>/fixtures/sections/components/wells.html'
                    }
                }
            },
            javascript: {
                src: '<%= config.app %>/fixtures/sections/javascript.html',
                dest: '<%= config.app %>/fixtures/javascript.html',
                options: {
                    sections: {
                        modals: '<%= config.app %>/fixtures/sections/javascript/modals.html',
                        dropdowns: '<%= config.app %>/fixtures/sections/javascript/dropdowns.html',
                        tabs: '<%= config.app %>/fixtures/sections/javascript/tabs.html',
                        tooltips: '<%= config.app %>/fixtures/sections/javascript/tooltips.html',
                        popovers: '<%= config.app %>/fixtures/sections/javascript/popovers.html',
                        alerts: '<%= config.app %>/fixtures/sections/javascript/alerts.html',
                        buttons: '<%= config.app %>/fixtures/sections/javascript/buttons.html',
                        collapse: '<%= config.app %>/fixtures/sections/javascript/collapse.html',
                        carousel: '<%= config.app %>/fixtures/sections/javascript/carousel.html'
                    }
                }
            },
            app: {
                src: '<%= config.app %>/fixtures/index.html',
                dest: '<%= config.app %>/index.html',
                options: {
                    parseTag: 'buildapp',
                    sections: {
                        feature: '<%= config.app %>/fixtures/feature.html',
                        css: '<%= config.app %>/fixtures/css.html',
                        components: '<%= config.app %>/fixtures/components.html',
                        javascript: '<%= config.app %>/fixtures/javascript.html',
                        sidebar: '<%= config.app %>/fixtures/sidebar.html'
                    }
                }
            },
            dist: {
                src: '<%= config.app %>/index.html',
                dest: '<%= config.app %>/index.html',
                options: {
                    parseTag: 'builddist',
                    sections: {
                        githubRibbon: '<%= config.app %>/fixtures/sections/dist/github_ribbon.html',
                        footer: '<%= config.app %>/fixtures/sections/dist/footer.html'
                    }
                }
            }
        }
    });


    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
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
