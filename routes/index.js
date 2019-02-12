var express = require('express');
var router = express.Router();

let latexUtils = require('../utils/latexUtils');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/download', function(req, res) {
  let timestamp = new Date().getTime();
  let fileName = 'latex_' + timestamp;

  let text = 'This is the first demo document.';
  let latexString = latexUtils.getLatexString(text);

  latexUtils.writeLatexFile(fileName, latexString, function(err, pdfFile) {
    if (err) {
      res.status(500).json({
          message: '导出失败'
      });
      return;
    }

    res.download(pdfFile, fileName + '.pdf');
  });
});

module.exports = router;
