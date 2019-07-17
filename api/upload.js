const IncomingForm = require("formidable").IncomingForm;
const Source = require('./models/source');
var fs = require('fs');
const util = require('util');
const rename = util.promisify(fs.rename);

module.exports = function upload(req, res) {
  var form = new IncomingForm(); 

//   form.on("file", (name, file) => {
//     // console.log("body", req)
//     // console.log(req.user)
    
//     // Do something with the file
//     // e.g. save it to the database
//     // you can access it using file.path
//   });
//   form.on('field', function(name, field) {
//     console.log("name",name,  field)
//     if(name == "id"){
//         console.log("ok  jancok", field)
//         // @todo check userid
//         id = field;
//         Source.findByIdAndUpdate(id, {
//             file: id+file.name
//         }).then(() => {
//             console.log("sukses upload")
//         })
//     }
//     __dirname + '/uploads/' + id+file.name
    
//   })
form.parse(req, async (err, fields, files) => {
    try {
        fs.copyFileSync(files.file.path, __dirname + '/uploads/source/'+fields.field+'/'+fields.id+files.file.name);
        fs.unlinkSync(files.file.path);
        await Source.findByIdAndUpdate(fields.id, { [fields.field]: files.file.name })
        res.writeHead(200, {'content-type': 'text/plain'});
        res.write('received upload:\n\n');
        res.end();
    } catch (error) {
        console.log(error)
        res.end();
    }
  });
};