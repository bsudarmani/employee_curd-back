const mongoose=require('mongoose');
const UserSchema=mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        required: true
    },
    add: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    }
});
const UserModel=mongoose.model("registerform",UserSchema);
module.exports=UserModel;