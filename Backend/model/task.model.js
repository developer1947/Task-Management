import mongoose from "mongoose";

const Task = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  title: { 
    type: String, 
    required: true 
  },
  description: {
    type:String,
    required:true
  },
});

export default mongoose.model("Task", Task);
