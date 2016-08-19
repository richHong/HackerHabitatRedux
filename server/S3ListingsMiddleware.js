var fs = require('fs');
var S3FS = require('s3fs');

module.exports = function (app) {

  var s3fsImplementation2 = new S3FS('hackerhabitatlistings', {
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    endpoint: process.env.endpoint,
    region: process.env.region
  });

  app.post('/v1/lp', function(req, res) {
      var file = req.files.file;
      var stream = fs.createReadStream(file.path);

      return s3fsImplementation2.writeFile(file.originalFilename, stream)
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
