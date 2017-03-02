/*
 After you have changed the settings under responsive_images
 run this with one of these options:
  "grunt" alone creates a new, completed images directory
  "grunt clean" removes the images directory
  "grunt responsive_images" re-processes images without removing the old ones
*/

module.exports = function(grunt) {

    grunt.initConfig({
        htmlmin: {                                     // Task
            dist: {                                      // Target
              options: {                                 // Target options
                removeComments: true,
                collapseWhitespace: true,
                minifyCSS: true,
                minifyJS: true
              },
              files: {                                   // Dictionary of files
                'index.html': 'index-critical.html',     // 'destination': 'source'
              }
            }
        },

        critical: {
            dist: {
              options: {
                base: './'
              },
              // The source file
              src: 'index-dev.html',
              // The destination file
              dest: 'index-critical.html'
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
            dev: {                         // Another target
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

        //  Clear out the images directory if it exists 
        clean: {
            dev: {
                src: ['images-opt'],
            },
        },

        // /* Generate the images directory if it is missing */
        mkdir: {
            dev: {
                options: {
                    create: ['images-opt']
                },
            },
        },

        // /* Copy the "fixed" images that don't go through processing into the images/directory */
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
    grunt.loadNpmTasks('grunt-critical');
    grunt.registerTask('default', ['clean', 'mkdir', 'copy', 'responsive_images', 'cssmin', 'imagemin', 'critical', 'htmlmin']);
    // grunt.registerTask('default', ['clean', 'mkdir', 'copy', 'responsive_images', 'cssmin', 'imagemin', 'htmlmin']);
};
