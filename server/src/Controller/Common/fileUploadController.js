// External Dependancies
const boom = require('boom')

const fs = require('fs')
const { promisify } = require('util')

const RemoteUploadService = require("../../Services/RemoteFileUploadService");

const unlinkAsync = promisify(fs.unlink)

//file.fields.nww.value
exports.uploadSingleFile = async (take, give) => {
    try {
        let file = await take.file();
       // let uploaded = await upload.single("files");
        let RemoteUploadServiceRef = new RemoteUploadService();
        console.log(take.file,"file")
        const url = await RemoteUploadServiceRef.uploadToCloud(file.files);
        console.log(url);
//         console.log(take.file,"hello")
//         await setTimeout(async() => {await unlinkAsync(take.file.path)}, 1000 ) 
        return {path:url};
    } catch (err) {
      throw boom.boomify(err);
    }
  };
