/*jslint node: true, stupid: true, indent: 2*/

var s3 = require('s3');
var async = require("async");
var mkdirp = require('mkdirp');
var fs = require("fs");
var getDirName = require('path').dirname;


var config = require('../common/config')


var client = s3.createClient({
  maxAsyncS3              : config.clientOptions.maxAsyncS3,
  s3RetryCount            : config.clientOptions.s3RetryCount,
  s3RetryDelay            : config.clientOptions.s3RetryDelay,
  multipartUploadThreshold: config.clientOptions.multipartUploadThreshold,
  multipartUploadSize     : config.clientOptions.multipartUploadSize,
  s3Options               : config.s3Options
});


function uploadFile(file, callback){
  client.s3.headObject({
    Bucket: config.Bucket,
    Key: file.name
  }, function(err, data) {
    if (err.statusCode == 404) { // File does not exist
      var params = {
        localFile   : file.path,
        ContentType : file.type,

        s3Params: {
          Bucket: config.Bucket,
          Key: file.name,
        },
      };
      var uploader = client.uploadFile(params);
      uploader.on('error', function(err) {
        console.error("unable to upload:", err.stack);
        callback({key:file.name,value:{description:"ERROR UPLOADING TO S3",code:err.statusCode, stack:err.stack}});
      });

      uploader.on('end', function() {
        console.log("done uploading");
        callback({key:file.name,value:{description:"UPLOAD OK",code:200,url:file.getPublicUrl()}});
      });
    }else{ //File Exist Return Error
      callback({key:file.name,value:{description:"FILE EXIST",code:302}}); //302 HTML code for FOUND
    }
  });
}

module.exports = function (server) {
  server.post('/s3/file', function(req, res, next){
    var status = 200;
    var response = {};
    var files=[];
    for (var fileKey in req.files) {
      if (req.files.hasOwnProperty(fileKey)) { //Remueve elementos del Property (si existen)
        var file = req.files[fileKey]
        if(!!file.name){
          //TODO: Si es una imagen generar tambien un thumb de baja resolucion
          /*
          if(file.type.indexOf("image")!=-1){ //Es una Imagen
            im.resize({
              srcPath: newPath,
              dstPath: thumbPath,
              width:   200
            }, function(err, stdout, stderr){
              if (err) throw err;
              console.log('resized image to fit within 200x200px');
            });
          }
          */
          files.push(file);
        } else {
          console.log("There was an error")
          response[file.name] = {description:"ERROR UPLOADING TO API",code:500} // 500 HTML code for Internal Error
        }
      }
    }

    async.map(files, uploadFile, function(err, results){
      for (var i = results.length - 1; i >= 0; i--) {
        response[results[i].key] = results[i].value
      }
      console.log(response);
      res.send(status,response);
    });

  })


  server.get('/s3/file',function(req,res,next){
    console.log('XXXX: BODY', req.body)
    console.log('XXXX params', req.params)
    console.log('XXXX UPLOADED FILES', req.files)
    res.send(200,"OK1");
    // next();
  })

  server.get('/s3/file/:filename',function(req,res,next){
    var params = {
      Bucket: config.Bucket
    };
    s3.getBucketLocation(params, function(err, data) {
      if (err){
        console.log(err, err.stack);
        res.send(500,{error:"Error in Bucket "+ config.Bucket +" Configuration, please contact Operations Team"})
      }
      else{
        res.send(200,s3.getPublicUrl(config.Bucket, req.params.filename, data));
      }
    });
  })

};