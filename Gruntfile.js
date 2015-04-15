var configureGrunt = function(grunt) {
    // Go through all Grunt tasks defined in package.json and load them all
    require('matchdep').filterDev(['grunt-*', '!grunt-cli']).forEach(grunt.loadNpmTasks);
    
    var cfg = {
        bower_concat: {
            all: {
                dest: 'build/js/vendor.js',
                cssDest: 'build/css/vendor.css',
                exclude: ['bourbon', 'neat']
            }
        },
        clean: ['build', 'prod'],
        concat_sourcemap: {
            dev: {
                src: ['src/js/*.js'],
                dest: 'build/js/main.js'
            }
        },
        copy: {
            assets: {
                expand: true,
                cwd: 'src/assets',
                src: ['*'],
                dest: 'build/assets/'
            },
            fonts: {
                expand: true,
                cwd: 'src/fonts',
                src: ['*'],
                dest: 'build/fonts/'
            },
            prod: {
                expand: true,
                cwd: 'build',
                src: ['assets/*', '*.html', 'css/*.css', 'fonts/*', 'pdf/*'],
                dest: 'prod'
            }
        },
        express: {
            dev: {
                options: {
                    script: 'index.js'
                }
            }
        },
        jade: {
            options: {
                client: false
            },
            web: {
                files: {
                    'build/': ['src/content/*.jade', '!src/content/layout.jade']
                },
                options: {
                    locals: function() {
                        return {
                            css: ['css/vendor.css', 'css/main.css'],
                            js: ['js/vendor.js', 'js/main.js']
                        };
                    }
                }
            },
            'resume-cv': {
                files: {
                    'build/': ['src/resume-cv/*.jade']
                }
            }
        },
        sass: {
            options: {
                style: 'compressed'
            },
            web: {
                files: {
                    'build/css/main.css': ['src/style/main.scss']
                }
            },
            'resume-cv': {
                files: {
                    'build/css/resume.css': ['src/resume-cv/resume.scss']
                }
            }
        },
        uglify: {
            prod: {
                files: [{
                    expand: true,
                    cwd: 'build/js',
                    src: '*.js',
                    dest: 'prod/js'
                }]
            }
        },
        watch: {
            options: {
                // Turning off spawning can drastically improve performance
                // For me, it reduces SASS compilation from 2.5 to 0.2 seconds
                spawn: false,
                livereload: true
            },
            jade: {
                files: ['src/content/*.jade'],
                tasks: ['jade:web']
            },
            sass: {
                files: ['src/style/*.scss'],
                tasks: ['sass:web']
            },
            js: {
                files: ['src/js/*.js'],
                tasks: ['app-js:dev']
            },
            assets: {
                files: ['src/assets/*'],
                tasks: ['copy:assets']
            }, 
            pdf_jade: {
                files: ['src/resume-cv/*.jade', 'src/resume-cv/*.md'],
                tasks: ['jade:resume-cv']
            },
            pdf_sass: {
                files: ['src/resume-cv/*.scss'],
                tasks: ['sass:resume-cv']
            }
        },
        wkhtmltopdf: {
            prod: {
                src: ['build/resume.html', 'build/cv.html'],
                dest: 'build/pdf/'
            }
        }
    };
    grunt.initConfig(cfg);
    
    grunt.registerTask('default', 'Default stuff', 
        ['bower_concat:all', 'app-js:dev', 'sass:web', 'jade:web', 'pdf', 'copy:assets', 'copy:fonts']);

    grunt.registerTask('app-js:dev', 'JavaScript stuff',
        ['concat_sourcemap:dev']);

    grunt.registerTask('dev', 'Dev stuff',
        ['default', 'express', 'watch']);

    grunt.registerTask('pdf', 'Build PDFs',
        ['jade:resume-cv', 'sass:resume-cv', 'wkhtmltopdf']);

    grunt.registerTask('prod', 'Build production',
        ['default', 'pdf', 'copy:prod', 'uglify:prod']);
};

module.exports = configureGrunt;

