const mongoose=require('mongoose')


// type, name, createdOn date and time, ModifiedOn date and time

const eventSchema=mongoose.Schema({
    name:{
        type:String
    },
    date:{
        type:Number
    },
    year:{
        type:Number
    },
    month:{
        type:Number
    },
    createdOn:{
        type:String,
        default:()=>Date.now()
    },
    desc:{
        type:String,
    },
    heldOn:{
        type:String,
        default:()=>Date.now()
    }
})

module.exports=mongoose.model('event',eventSchema);