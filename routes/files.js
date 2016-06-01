/*jslint node: true, stupid: true, indent: 2*/

var mkdirp = require('mkdirp');
var fs = require("fs");
var getDirName = require('path').dirname;

function writeFile(path, contents, cb) {
  mkdirp(getDirName(path), function (err) {
    if (err) return cb(err);

    fs.writeFile(path, contents, cb);
  });
}

module.exports = function (server) {
  server.post('/local/file', function(req, res, next){
    console.log('XXXX UPLOADED FILES', req.files)
    var status = 200;
    var response = {};
    for (var fileKey in req.files) {
      if (req.files.hasOwnProperty(fileKey)) { //Remueve elementos del Property (si existen)
        var file = req.files[fileKey]
        data = fs.readFileSync(file.path)//Cargar desde la carpeta Temporal (del sistema)


        if(file.type.indexOf("image")!=-1){ //Es una Imagen
          var imageName = file.name
          /// If there's an error
          if(!imageName){
            console.log("There was an error")
            response[file.name] = "ERROR"
          } else {
            //Guarda dos resoluciones, una completa y una pequena
            var newPath = __dirname + "/tmpFiles/images/fullsize/" + imageName;
            var thumbPath = __dirname + "/tmpFiles/images/thumbs/" + imageName;
            // write file to tmpFiles/fullsize folder
            writeFile(newPath, data, function (err) {
              //Crea la imagen peque;a a partir de la Original
              im.resize({
                srcPath: newPath,
                dstPath: thumbPath,
                width:   200
              }, function(err, stdout, stderr){
                if (err) throw err;
                console.log('resized image to fit within 200x200px');
              });
              response[file.name] = "OK"
            });
          }
        }else{ //Si es cualquier otro tipo de archivo
          // If there's an error
          if(!file.name){
            console.log("There was an error")
            response[file.name] = "ERROR"
          } else {
            var newPath = __dirname + "/tmpFiles/files/" + file.name;
            console.log(newPath)
            // write file to uploads/fullsize folder
            writeFile(newPath, data, function (err) {
              response[file.name] = "OK"
            });
          }
        }
      }
    }
    console.log(response);
    res.send(status,response);
  })


  server.get('/local/file',function(req,res,next){
    console.log('XXXX: BODY', req.body)
    console.log('XXXX params', req.params)
    console.log('XXXX UPLOADED FILES', req.files)
    res.send(200,"OK1");
    // next();
  })

  server.get('/local/file/public_link/:filename',function(req,res,next){
    console.log('XXXX: BODY', req.body)
    console.log('XXXX params', req.params)
    console.log('XXXX UPLOADED FILES', req.files)
    res.send(200,"OK2");
    // next();
  })

  server.get('/local/file/:filename',function(req,res,next){
    console.log('XXXX: BODY', req.body)
    console.log('XXXX params', req.params)
    console.log('XXXX UPLOADED FILES', req.files)
    res.send(200,"OK3");
    // next();
  })

};