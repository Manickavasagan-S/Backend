const User = require("../models/User");
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  
  
  let user;
  try {
    user = new User({ name, email, password, role });
    const savedUser = await user.save();
    
    
    const token = jwt.sign({ id: savedUser._id, role: savedUser.role }, 'secret-key');
    res.status(201).json({
      success: true,
      data: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role,
        token
      },
      message: "User registered successfully",
    });
  } catch (error) {
    console.log('✗ REGISTER ERROR:', error.message);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  let user;
  try {
    user = await User.findOne({ email, password });
    if (user) {
      const token = jwt.sign({ id: user._id, role: user.role }, 'secret-key');
      res.status(200).json({
        success: true,
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token
        },
        message: "Login successful",
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { register, login };
