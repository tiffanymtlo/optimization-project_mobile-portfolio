/*
 Run this with one of these options:
  "grunt" runs all the options to create new, compressed images in the appropriate directories, and minified all files
  "grunt htmlmin" minifies index-dev.html
  "grunt cssmin" minifies print.css
  "grunt imagemin" compresses all images and store them in images-opt
  "grunt responsive_images" compresses images to desired width and quality and store them in images-opt
  "grunt clean" cleans the directory for storing compressed images 
  "grunt mkdir" makes the directory for storing compressed images 
  "grunt copy" copies the images that do not need compression to the appropriate directory
*/

module.exports = function(grunt) {

    grunt.initConfig({
        htmlmin: {                                     
            dist: {                                      
              options: {                                 
                removeComments: true,
                collapseWhitespace: true,
                minifyCSS: true,
                minifyJS: true
              },
              files: {                                   
                'index.html': 'index-dev.html',     // 'destination': 'source'
              }
            }
        },

        cssmin: {
            dev: {
                files: [{
                  expand: true,
                  cwd: 'css/',
                  src: ['*.css', '!*.min.css'],
                  dest: 'release/css',
                  ext: '.min.css'
                }]
            }
        },

        imagemin: {
            dev: {                         
              files: [{
                expand: true,
                    src: ['*.{gif,jpg,png}'],
                    cwd: 'images-opt/',
                    dest: 'images-opt/'
              }]
            }
        },

        responsive_images: {
            dev: {
                options: {
                    engine: 'im',
                    sizes: [{
                        width: 70,
                        suffix: '_compressed',
                        quality: 40
                    }, {
                        width: 100, 
                        suffix: '_compressed',
                        quality: 40
                    }]
                },

                files: [{
                    expand: true,
                    src: ['*.{gif,jpg,png}'],
                    cwd: 'img/',
                    dest: 'images-opt/'
                }]
            }
        },

        //  Clear out the images-opt/ directory if it exists 
        clean: {
            dev: {
                src: ['images-opt'],
            },
        },

        // /* Generate the images-opt/ directory if it is missing */
        mkdir: {
            dev: {
                options: {
                    create: ['images-opt']
                },
            },
        },

        // /* Copy the "fixed" images that don't go through processing into the images-opt/ */
        copy: {
            dev: {
                files: [{
                    expand: true,
                    src: ['img/fixed/*.{gif,jpg,png}'],
                    dest: 'images-opt/',
                    flatten: true,
                }]
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-responsive-images');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.registerTask('default', ['clean', 'mkdir', 'copy', 'responsive_images', 'cssmin', 'imagemin', 'htmlmin']);
};
