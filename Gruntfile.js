module.exports = function (grunt) {

    require('time-grunt')(grunt);

    grunt.loadNpmTasks('grunt-banner');
    grunt.loadNpmTasks('grunt-closurecompiler');
		grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks("grunt-ts");

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        proVersion: "1.0.0",
        ts: {
            controller_mouseMove: {
                src: ["src/Controllers/MouseMove/**/*.ts"], out: "js/prostyle.controller.mousemove.js"
            },
            controller_mouseWheel: {
                src: ["src/Controllers/MouseWheel/**/*.ts"], out: "js/prostyle.controller.mousewheel.js"
            },
            controller_tap: {
                src: ["src/Controllers/Tap/**/*.ts"], out: "js/prostyle.controller.tap.js"
            },
            flow_stack: {
                src: ["src/Flows/Stack/**/*.ts"], out: "js/prostyle.flow.stack.js"
            },
            item_barChart: {
                src: ["src/Items/BarChart/**/*.ts"], out: "js/prostyle.item.barchart.js"
            }
        },
        closurecompiler: {
            options: {
                "compilation_level": "SIMPLE_OPTIMIZATIONS",
                "language_in": "ECMASCRIPT5",
                "max_processes": 5
            },
            controllers: {
                files: {
                    "js/prostyle.controller.mousemove.min.js": "js/prostyle.controller.mousemove.js",
                    "js/prostyle.controller.mousewheel.min.js": "js/prostyle.controller.mousewheel.js",
                    "js/prostyle.controller.tap.min.js": "js/prostyle.controller.tap.js"
                }
            },
            flows: {
                files: {
                    "js/prostyle.flow.stack.min.js": "js/prostyle.flow.stack.js"
                }
            },
            items: {
                files: {
                    "js/prostyle.item.barchart.min.js": "js/prostyle.item.barchart.js"
                }
            }
        },
        usebanner: {
            banner: {
                options: {
                    banner: '/*!\n' +
                    ' * VERSION: <%= proVersion %>\n' +
                    ' * DATE: <%= grunt.template.today("dd-mmm-yyyy") %>\n' +
                    ' * UPDATES AND DOCS AT: https://prostyle.io/plus/\n' +
                    ' * \n' +
                    ' * This file is part of ProStyle Plus, a set of premium extensions for ProStyle.\n' +
                    ' * \n' +
                    ' * @copyright - Copyright (c) 2013-<%= grunt.template.today("yyyy") %>, Pro Graphics, Inc. All rights reserved. \n' +
                    ' * @license - This work is subject to the terms at https://prostyle.io/plus/\n' +
                    ' * @author: Gary Chamberlain, gary@pro.graphics.\n' +
                    ' * \n' +
                    ' **/\n'
                },
                files: { src: "js/*.js" }
            }
        },
        copy: {
            to_prostyle_js: {
                files: [
                    {expand: true, cwd: "js", src:"*.js", dest:"../prostyle.js/js/extensions/"}
                ]
            },
            to_prostyle_io: {
                files: [
                    {expand: true, cwd: "js", src:"*.min.js", dest:"../prostyle.io/assets/js/"}
                ]
            }
        }
    });

    grunt.registerTask('default', ['ts', 'closurecompiler', 'usebanner', 'copy']);
};