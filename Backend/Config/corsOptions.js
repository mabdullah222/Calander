const allowedOrigins=require('./allowedOrigins')
const corsOptions=
{
    origin:(origin,callback)=>
    {
        // no origin is for the apps like postman
        if (allowedOrigins.indexOf(origin)!=-1 || !origin)
        {
            callback(null,true)
        }
        else
        {
            callback(new Error("Not Allowed By Cors"))
        }
    },
    credentials:true,
    optionSuccessStatus: 200
}
module.exports=corsOptions
