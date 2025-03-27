import mongoose from "mongoose";

const User = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    unique: true, 
    required: true 
  },
  phoneNumber:{
    type:String,
    require:true
  },
  password: { 
    type: String, 
    required: true 
  },
});

export default mongoose.model("User", User);
