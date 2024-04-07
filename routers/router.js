const express=require("express");
const router=express.Router();
const users=require('../models/UserSchema');
// register data
router.post("/register",async(req,res)=>{
  const {name,email,age,mobile,work,add,desc} = req.body;
  if(!name || !email || !age || !mobile || !work || !add || !desc){
      res.status(422).json("plz fill the data");
  }
  try {  
      const preuser = await users.findOne({email:email});
      console.log(preuser);
      if(preuser){
          res.status(422).json("this is user is already present");
      }else{
          const adduser = new users({
              name,email,age,mobile,work,add,desc
          });
          await adduser.save();
          res.status(201).json(adduser);
          console.log(adduser);
      }
  } catch (error) {
      res.status(422).json(error);
  }
})
//getdata
router.get('/getdata',async(req,res)=>
{
    try{
     const userdata= await users.find();
     console.log(userdata);
     res.status(201).json(userdata);
    }
    catch(err)
    {
        res.status(422).json(err);
    }
})
router.get('/getuser/:id',async(req,res)=>{
   try{
     console.log(req.params);
     const {id}=req.params;
     const userindividual=await users.findById({_id:id});
     console.log(userindividual);
     res.status(201).json(userindividual);
   }
   catch(err)
   {
    res.status(404).json(err);
   }
})
router.patch('/updateuser/:id',async(req,res)=>
{
 try {
    const {id}=req.params;
    const updateuser=await users.findByIdAndUpdate(id,req.body,{
        new:true
    });
    console.log(updateuser);
    res.status(202).json(updateuser);
 } catch (err) {
    res.status(404).json(err);
 }
})
router.delete('/deleteuser/:id',async(req,res)=>
{
try {
   const {id}=req.params;
   const deleteuser= await users.findByIdAndDelete({_id:id});
   console.log(deleteuser);
   res.status(201).json(deleteuser);
} catch (err) {
    res.status(404).json(err);
}
})
module.exports=router;