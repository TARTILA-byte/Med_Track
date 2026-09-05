import Users from "../models/Users.js"; 

// POST
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    const newUser = new Users({
      name,
      email,
      password, 
    });

    await newUser.save();

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

//  GET Controller 
export const getUsers = async (req, res) => {
  try {
    
    const users = await Users.find().select("-password");

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ 
      message: "Failed to fetch users", 
      error: error.message 
    });
  }
};