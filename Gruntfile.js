module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';\n',
        stripBanners: true,
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */\n',
      },
      SecretSharingDevJS: {
        src: './secret-sharing.js',
        dest: './dev-build/secret-sharing.js'
      },
      SecretSharingProductionJS: {
        src: './secret-sharing.js',
        dest: './build/secret-sharing.js'
      }
    },
    uglify: {
      SecretSharingProductionMinJS: {
        options: {
          banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */',
          compress: {
            drop_debugger: false
          }
        },
        files: {
          './build/secret-sharing.min.js': './build/secret-sharing.ob.js'
        }
      }
    },
    watch: {
      files: ['./*.js'],
      tasks: ['default']
    },
    obfuscator: {
      options: {
        banner: '// You can\'t debug this library.\n',
        //debugProtection: true,
        compact: true,
        deadCodeInjection: true,
        deadCodeInjectionThreshold: 0.2,
        mangle: true,
        unicodeEscapeSequence: false,
        selfDefending: false,
        stringArrayEncoding: true,
      },
      SecretSharingProductionObfuscateJS: {
        options: {},
        files: {
          './build/secret-sharing.ob.js': ['./build/secret-sharing.js']
        }
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-obfuscator')

  grunt.registerTask('default', ['concat', 'obfuscator', 'uglify'])
  grunt.registerTask('watch', ['concat', 'obfuscator', 'uglify'])
}
