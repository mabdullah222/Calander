const router=require('express').Router()
const event=require('../Models/eventModel')

router.get('/events/:year?/:month?/:date?',async (req,res)=>{
    let re=[]
    try{
        if (req.params.date && req.params.month && req.params.year){
           re=await event.where('year').equals(req.params.year).where('month').equals(req.params.month).where('date').equals(req.params.date)
        }
        if (req.params.month && req.params.year){
            re=await event.where('year').equals(req.params.year).where('month').equals(req.params.month)
        }
        res.send(re);
    }
    catch(err){
        res.send(err.message);
    }
})

router.post("/events/create",async (req,res)=>{
    try{
        let eve=await new event(req.body)
        await eve.save()
        res.send(eve)
    }
    catch(err){
        console.log(err.message)
        res.send(err.message)
    }
    
})

router.post('/events/delete',async (req,res)=>{
    await event.deleteOne({_id:req.body.id})
    res.sendStatus(200)
})


module.exports=router