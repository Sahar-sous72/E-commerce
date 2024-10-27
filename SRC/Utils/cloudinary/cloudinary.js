import { v2 as cloudinary } from 'cloudinary';

 // Configuration
 cloudinary.config({ 
    cloud_name: 'dthlm8czj', 
    api_key: '347358141167727', 
    api_secret: process.env.APIKEY // Click 'View API Keys' above to copy your API secret
});
export default cloudinary;