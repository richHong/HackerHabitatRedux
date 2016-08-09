var config = require('../config.json');
var fs = require('fs');
var S3FS = require('s3fs');

module.exports = function (app) {

  var s3fsImplementation1 = new S3FS('hackerhabitatavatars', {
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
    endpoint: config.endpoint,
    region: config.region
  });

  app.post('/v1/ap', function(req, res) {
      var file = req.files.file;
      var stream = fs.createReadStream(file.path);

      return s3fsImplementation1.writeFile(file.originalFilename, stream)
      .then(function() {
        fs.unlink(file.path, function(err) {
          if (err) {
            console.log('Error');
          }
          console.log('Success');
        });
        res.send('File Upload Complete');
      });
    });
};
