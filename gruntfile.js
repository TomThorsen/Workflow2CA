const mozjpeg = require('imagemin-mozjpeg');

module.exports = function(grunt) {
    grunt.initConfig({
       pkg: grunt.file.readJSON('package.json'),
       sass: {
           dist: {
               files: {
                   'dist/css/styles.css' : 'sass/styles.scss'
               }
           }
       },
       imagemin: {
           dynamic: {
               files: [{
                   expand: true,
                   cwd: 'img/',
                   src: ['**/*.{png,jpg,gif}'],
                   dest: 'dist/img'
               }]
           }
       },
       watch: {
           css: {
               files: ['sass/*.scss'],
               files: ['sass/partials/*.scss'],
               tasks: ['sass','imagemin','cssmin'],
               options: {
                   spawn: false,
               }
           }
       },
       browserSync: {
           dev: {
               bsFiles: {
                   src : [
                       'dist/css/style.css',
                       'dist/*.html'
                   ]
               },
               options: {
                   watchTask: true,
                   server: './dist'
               }
           }
       },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'dist/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist/css',
                    ext: '.min.css'
                }]
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.registerTask('default', ['imagemin','cssmin','browserSync','watch']);
}