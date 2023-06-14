const express=require('express')
require('dotenv').config()
const cors=require('cors')
const mongoose=require('mongoose')
const api=require('./Routes/api')
const app=express()
const corsOptions=require('./Config/corsOptions')

app.use(cors(corsOptions))
app.use(express.json())
app.use('/api',api);


mongoose.connect(process.env.MONGO_URL).then(res=>{
    console.log("Db connection Successful")
    app.listen(process.env.PORT,()=>{
        console.log('App listening on port',process.env.PORT)
    })
}).catch(err=>{
    console.log("Error Loading the Database")
})

    