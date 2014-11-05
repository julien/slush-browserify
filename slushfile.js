'use strict';

var gulp = require('gulp')
  , gutil = require('gulp-util')
  , install = require('gulp-install')
  , conflict = require('gulp-conflict')
  , template = require('gulp-template')
  , __ = require('underscore.string')
  , inquirer = require('inquirer');

gulp.task('default', function (done) {

  var questions = [
    {
      type: 'input',
      name: 'name',
      message: 'What\'s the name of your project?',
      default: gulp.args.join(' ')
    },
    {
      type: 'input',
      name: 'inputFilePath',
      message: 'What is the path of the main entry point',
      default: './src/main.js'
    },
    {
      type: 'input',
      name: 'outputDir',
      message: 'What is the path of your "build" folder?',
      default: 'build'
    },
    {
      type: 'input',
      name: 'outputFile',
      message: 'What is the name of your "output" file?',
      default: 'bundle.js'
    }
  ];

  inquirer.prompt(questions, function (answers) {
    // fix name
    answers.name = __.slugify(answers.name);

    gulp.src(__dirname + '/templates/**', {dot: true})
      .pipe(template(answers))
      .pipe(conflict('./'))
      .pipe(gulp.dest('./'))
      .pipe(install())
      .on('end', function () {
        gutil.log('All done...');
      })
      .on('error', function () {
        gutil.log();
      });
  });
});
