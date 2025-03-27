import Task from "../model/task.model.js";
import User from "../model/user.model.js"
import jwt from 'jsonwebtoken'


export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "Fill all the fields",
        status: 400,
        success: false,
      });
    }

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "Authorization token is required",
        success: false,
        status: 401,
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.SECRETE_KEY);
    } catch (error) {
      return res.status(401).json({
        message: "Invalid or expired token",
        success: false,
        status: 401,
      });
    }

    const userId = decoded.id; 
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
        status: 404,
      });
    }
    const result = await Task.create({ userId, title, description });

    return res.status(200).json({
      message: "Successful",
      success: true,
      status: 200,
      data:{
        id:result.id,
        title:result.title,
        description:result.description
      }
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server Issue",
      success: false,
      status: 500,
    });
  }
};

export const getTasks = async (req, res) => {
  try {

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "Authorization token is required",
        success: false,
        status: 401,
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.SECRETE_KEY);
    } catch (error) {
      return res.status(401).json({
        message: "Invalid or expired token",
        success: false,
        status: 401,
      });
    }

    const userId = decoded.id; 
    const tasks = await Task.find({userId});
    return res.status(200).json({
      message: "Sucessfull",
      success: true,
      status: 200,
      tasks
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Issue",
      success: false,
      status: 500,
    });
  }
};

export const getTaskDetailById = async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "Authorization token is required",
        success: false,
        status: 401,
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.SECRETE_KEY);
    } catch (error) {
      return res.status(401).json({
        message: "Invalid or expired token",
        success: false,
        status: 401,
      });
    }

    const userId = decoded.id;

    const task = await Task.findOne({ _id: id, userId });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
        success: false,
        status: 404,
      });
    }

    return res.status(200).json({
      message: "Successfully retrieved task",
      success: true,
      status: 200,
      task,
    });
  } catch (error) {
    console.error("Error fetching task:", error);

    return res.status(500).json({
      message: "Server Issue",
      success: false,
      status: 500,
    });
  }
};


export const updateTask = async (req, res) => {

  try {
    const { id, title, description } = req.body;

    if (!id || !title || !description) {
      return res.status(400).json({
        message: "Provide all required data (id, title, description)",
        success: false,
        status: 400,
      });
    }
    

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "Authorization token is required",
        success: false,
        status: 401,
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.SECRETE_KEY);
    } catch (error) {
      console.log("33333333333",error)
      return res.status(401).json({
        message: "Invalid or expired token",
        success: false,
        status: 401,
      });
    }

    const userId = decoded.id;

    const task = await Task.findOne({ _id: id, userId });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
        success: false,
        status: 404,
      });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );

    return res.status(200).json({
      message: "Task updated successfully",
      success: true,
      status: 200,
      data: updatedTask,
    });

  } catch (error) {
    console.error("Error updating task:", error);

    return res.status(500).json({
      message: "Server issue",
      success: false,
      status: 500,
    });
  }
};


export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "Authorization token is required",
        success: false,
        status: 401,
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.SECRETE_KEY);
    } catch (error) {
      return res.status(401).json({
        message: "Invalid or expired token",
        success: false,
        status: 401,
      });
    }

    const userId = decoded.id;

    const task = await Task.findOne({ _id: id, userId });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
        success: false,
        status: 404,
      });
    }

    await task.deleteOne();

    return res.status(200).json({
      message: "Task deleted successfully",
      success: true,
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server Issue",
      success: false,
      status: 500,
    });
  }
};
