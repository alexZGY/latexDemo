const path = require('path');
const fs = require('fs');
const exec = require('child_process').exec;

const DOWNLOAD_FOLDER = path.join(__dirname, '../download');


exports.writeLatexFile = function(fileName, latexString, callback) {
  let texFile = DOWNLOAD_FOLDER + '/' + fileName + '.tex';
  let pdfFile = DOWNLOAD_FOLDER + '/' + fileName + '.pdf';

  fs.writeFile(texFile, latexString, function() {
    exec('xelatex ' + fileName + '.tex', {
      cwd: DOWNLOAD_FOLDER
    }, function(err1) {
      if (err1) {
        callback(err1);
        return;
      }

      exec('xelatex ' + fileName + '.tex', {
        cwd: DOWNLOAD_FOLDER
      }, function(err2) {
        callback(err2, pdfFile);
      });
    });
  });
};

exports.getLatexString = function(text) {
  let latexStringArr = [];
  latexStringArr.push('\\documentclass{article}');
  latexStringArr.push('\\begin{document}');
  latexStringArr.push(text);
  latexStringArr.push('\\end{document}');

  return latexStringArr.join('\n');
};