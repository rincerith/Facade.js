module.exports = function (grunt) {

    'use strict';

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        jslint: {

            client: {
                src: ['facade.js', 'tests/**/*.js'],
                directives: {
                    browser: true,
                    globals: {
                        'define': true,
                        'module': true,
                        'require': true
                    },
                    nomen: true
                }
            }

        },

        uglify: {

            my_target: {
                options: {
                    mangle: true,
                    report: 'gzip',
                    banner: '/*!\n * <%= pkg.name %> v<%= pkg.version %> <%= grunt.template.today("isoDateTime") %>\n * https://github.com/facadejs/facade.js\n * \n * Copyright (c) <%= grunt.template.today("yyyy") %> Scott Doxey\n * Released under the MIT license.\n */\n'
                },
                files: {
                    'facade.min.js': ['facade.js']
                }
            }

        },

        casperjs: {

            files: ['tests/**/*.js']

        },

        shell: {

            docs: {

                command: './node_modules/doxdox/bin/doxdox facade.js --layout docs/template.hbs --output docs/index.html'

            },

            gzip: {

                command: 'gzip -9 < facade.min.js > facade.min.js.gzip'

            }

        },

        watch: {

            default: {
                files: ['facade.js', 'tests/**/*.js'],
                tasks: ['jslint', 'uglify', 'shell:docs', 'shell:gzip', 'casperjs']
            }

        }

    });

    grunt.registerTask('default', [ 'jslint', 'uglify', 'shell' ]);
    grunt.registerTask('test', [ 'casperjs' ]);

};
