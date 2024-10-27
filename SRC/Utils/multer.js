// to can upload file>> image >> second way (save name and upload in db)
import multer  from'multer';
import { nanoid } from 'nanoid'

const fileUpload=()=>{
    const storage =multer.diskStorage({ });
     // file filter >> لحتى اخليه يقبل بس صور مش اي نوع ملفات ثانية
    function fileFilter(req,file,cb){
        // امتداد الصور المسموح رفعه
        if(['image/jpeg' ,'image/png' ,'image/gif','image/jpg'].includes(file.mimetype)){
      //or   if(file.mimetype=='image/jpeg' ||file.mimetype=='image/jpg'|| file.mimetype=='image/png' || file.mimetype=='image/gif'){
            cb(null,true)
        }else{
            cb("invalid format",false);
        }
    }
// الترتيب مهم بالاول بفلتر بعدها ببعثه عالستوريح
    const upload=multer({fileFilter,storage});
    // const upload=multer({soso:fileFilter,storage}); soso name of function insted fileFilter
        return upload;
    
}
export default fileUpload;