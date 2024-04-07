const mongoose=require('mongoose');
const UserSchema=mongoose.Schema({
  name:{
    type:String,
    required: [true, "Your username is required"],
  },
 email:{
    type:String,
    required: [true, "Your email address is required"],
    unique: true,
 },
 password:{
   type: String,
   required: [true, "Your password is required"],
 }
})
const UserModel=mongoose.model ("signupforms",UserSchema);
module.exports = UserModel;