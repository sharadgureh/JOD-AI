const ImageKit = require("imagekit");
const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGE_KIT_URL_ENDPOINT,
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY
});

const AuthController=async (req,res)=>{
        const result = imagekit.getAuthenticationParameters();
        res.send(result);
}

module.exports=AuthController