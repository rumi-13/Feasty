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

// get optimized video URL
function getOptimizedVideoUrl(url) {
    if (!url) return url;
    
    return imagekit.url({
        src: url,
        transformation: [
            {
                quality: "30",          // Extreme compression
                format: "auto",         // WebM/MP4
                height: "480",          // 480p is very light and looks okay on mobile
                video_bitrate: "500k",  // Low bitrate for guaranteed smoothness
            }
        ]
    });
}

module.exports ={
    uploadFile,
    getOptimizedVideoUrl,
}