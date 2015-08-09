module.exports = function (grunt) {

    require('time-grunt')(grunt);

    grunt.loadNpmTasks('grunt-banner');
    grunt.loadNpmTasks('grunt-closurecompiler');
		grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks("grunt-ts");

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        ts: {
            flow_pageStack: {
                src: ["src/flows/PageStack/**/*.ts"], out: "js/prostyle.flow.pageStack.js"
            },
            item_simpleBarChart: {
                src: ["src/items/SimpleBarChart/**/*.ts"], out: "js/prostyle.item.simpleBarChart.js"
            }
        },
        closurecompiler: {
            options: {
                "compilation_level": "SIMPLE_OPTIMIZATIONS",
                "language_in": "ECMASCRIPT5",
                "max_processes": 5
            },
            flows: {
                files: {
                    "js/prostyle.flow.pageStack.min.js": "js/prostyle.flow.pageStack.js"
                }
            },
            items: {
                files: {
                    "js/prostyle.item.simpleBarChart.min.js": "js/prostyle.item.simpleBarChart.js"
                }
            }
        },
        usebanner: {
            banner: {
                options: {
                    banner: '/*!\n' +
                    ' * This file is part of ProStyle Plus, a set of premium extensions for ProStyle. It may be\n' +
                    ' * used for free for personal projects or licensed per website domain name for commercial use.\n' +
                    ' * @license: See http://prostyle.io/plus/license\n' +
                    ' * @author: Gary Chamberlain, gary@pro.graphics.\n' +
                    ' **/\n'
                },
                files: { src: "js/*.js" }
            }
        },
        copy: {
            extensions: {
                files: [
                    {expand: true, cwd: "js", src:"*.js", dest:"../prostyle.js/js/extensions/"}
                ]
            }
        }
    });

    grunt.registerTask('default', ['ts', 'closurecompiler', 'usebanner', 'copy']);
};