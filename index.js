require("dotenv").config();
const express=require('express');
const app=express();
const cors=require('cors');
 const mongoose = require('mongoose');
const UserModel=require('./models/App.js');
const bcrypt=require('bcrypt');
const router=require('./routers/router.js');
app.use(cors());
app.use(express.json());
// require('./db.js');
const mongoURI='mongodb+srv://sudar:Sudar123@cluster0.brpgvku.mongodb.net/signup?retryWrites=true&w=majority';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log("connection start")).
catch((err)=>console.log(err.message));
// app.get("/users", async (req, res) => {
//   try {
//     const results = await UserModel.find({});
//     res.json(results);
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred' });
//   }
// });
// app.post("/signup", async (req, res) => {
//     const userData = req.body;
//     const newUser = new UserModel(userData);
//     await newUser.save();
//     res.status(201).json(newUser); 
// });
// app.post("/login",async(req,res)=>
// {
//   const user=req.body;
//   const User=new UserModel(user);
//   await User.save();
//   res.status(201).json(User);
// })
app.post('/login', async (req, res) => {
  const user = req.body; 
  const newUser=UserModel(user);
  try {
    const existingUser = await UserModel.findOne({ email:user.email });
    if (existingUser) {
      const isPasswordMatch = await bcrypt.compare(user.password, existingUser.password);
      if (isPasswordMatch) {
        res.json('User successfully logged in');
        await newUser.save();
      } else {
        res.status(400).json('Incorrect password');
      }
    } else {
      res.status(400).json('User not found. Please sign up first.');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json('Server error');
  }
});

app.post('/signup', async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);

  try {
    const existingUser = await UserModel.findOne({ email: user.email });

    if (existingUser) {
      return res.json("User already exists");
    } else {
      // Hash the user's password before saving it to the database
      bcrypt.hash(user.password, 10, async (err, hash) => {
        if (err) {
          console.error(err);
          return res.status(500).json("Server error");
        }
        
        // Replace the user's password with the hashed password
        newUser.password = hash;

        await newUser.save();
        res.json("User successfully created");
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
});
app.use(router);

app.listen(8003,()=>
{
 console.log(`port listen to the 8003`)
})