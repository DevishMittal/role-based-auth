const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword, role });
    await newUser.save();

    console.log("User registered successfully:", newUser); // Log the registered user

    res.status(201).json({ message: `User registered with username ${username}` });
  } catch (error) {
    console.error("Registration error:", error); // Log any errors
    res.status(500).json({ message: `Something went wrong` });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      console.error("User not found:", username); // Log if user is not found
      return res.status(404).json({ message: `User with username ${username} not found` });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.error("Invalid credentials for user:", username); // Log invalid credentials
      return res.status(404).json({ message: `Invalid Credentials` });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("User logged in successfully:", user); // Log the logged-in user

    res.status(200).json({ token });
  } catch (error) {
    console.error("Login error:", error); // Log any errors
    res.status(500).json({ message: `Something went wrong` });
  }
};

module.exports = {
  register,
  login,
};