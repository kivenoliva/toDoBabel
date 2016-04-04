module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({

        concat: {
            options: {
                separator: '\n;',
                process: false,
                stripBanners: {
                    block: true
                }
            },
            app: {
                src: [
                    'bower_components/moment/moment.js',
                    'bower_components/angular/angular.js',
                    'bower_components/angular-route/angular-route.js',
                    'bower_components/angular-sanitize/angular-sanitize.js',
                    'public/scripts/**/*.js',
                    'public/scripts/*.js'
                ],
                dest: 'public/dist/app.js'
            }
        },

        uglify: {
            options: {
                sourceMap: true
            },
            built: {
                files: {
                    'public/dist/app.min.js': ['public/dist/app.js']
                }
            }
        },

        less: {
            build: {
                files: {
                    "public/dist/style.css": "public/less/style.less",
                }
            }
        },

        watch: {
            js: {
                files: ['public/scripts/**/*.js', 'public/scripts/*.js'],
                tasks: ['concat']
            },
            styles:{
                files: ["public/less/*.less"], //observar cualquiera
                //cambios en archivos LESS
                tasks: ["less"], //ejecuta la compilación LESS
                options: {
                    spawn: false //para que no se quede tostado (creo)
                }
            }
        }

    });

    // plugins
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // default task(s).
    grunt.registerTask('default', ['less', 'concat', 'watch']);
    grunt.registerTask('prod', ['less', 'concat', 'uglify']);

};