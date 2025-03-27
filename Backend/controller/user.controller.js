import User from "../model/user.model.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password, phoneNumber } = req.body;
    if (!name && !email && !password && !phoneNumber) {
      res.status(400).json({
        message: "Fill all the fields",
        sucess: false,
        status: 400,
      });
    }
    const result = await User.create(req.body);
    return res.status(200).json({
      message: "Sucessful",
      success: true,
      status: 200,
      result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
      sucess: false,
      status: 500,
      error,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    if (!phoneNumber || !password) {
      return res.status(400).json({
        message: "Fill all the fields",
        success: false,
        status: 400,
      });
    }

    const result = await User.findOne({ phoneNumber: phoneNumber });

    if (!result) {
      return res.status(404).json({
        message: "User not found",
        success: false,
        status: 404,
      });
    }

    const token = jwt.sign(
      {
        id: result.id,
        email: result.email,
      },
      process.env.SECRETE_KEY
    );

    return res.status(200).json({
      message: "Login Successful",
      success: true,
      status: 200,
      user: {
        id: result.id,
        phoneNumber: result.phoneNumber,
        email: result.email,
        name:result.name
      },
      token: token,
    });
  } catch (error) {
    console.error("Error in login:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      status: 500,
      error: error.message,
    });
  }
};


