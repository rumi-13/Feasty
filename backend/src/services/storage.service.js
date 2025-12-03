const ImageKit = require('imagekit');

// initialize imagekit
const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLICKEY,
    privateKey: process.env.IMAGEKIT_PRIVATEKEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

// upload file to imagekit
async function uploadFile(file, fileName){
  
    const result = await imagekit.upload({
        file:file,
        fileName:fileName,
    })

    return result;
}

module.exports ={
    uploadFile,
}