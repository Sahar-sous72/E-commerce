import connectDb from './../DB/connectdb.js'
import cors from'cors';
import { AppError } from '../appError.js';



const initApp=(app,express)=>{
    connectDb();
    app.use(cors())

    app.use(express.json());
   
    app.use('*',(req,res,next)=>{
        return next(new AppError("page not found",400))
    });

    // global error handling 
    app.use( (err,req,res,next) =>{
        return res.status(err.statusCode).json({message:err.message})
    });

}

export default initApp;