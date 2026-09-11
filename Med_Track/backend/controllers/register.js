import Users from "../models/Users.js"; 



// POST
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    const existingUser = await Users.exists({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

   const newUser = await Users.create({email,name,password});

    return res.status(201).json( newUser );
      
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

//  GET 
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
//delete
export const deleteUser = async (req, res) => {
  try {
    const { email } = req.params;

    const user = await Users.findOneAndDelete({ email });

    if (!user) {
      return res.status(404).json({message: "User not found"});
    }
   return res.status(200).json({message: "User deleted successfully"});
  } catch (error) {
    return res.status(500).json({message: "Failed to delete user",error: error.message});
  }
};
export const updateUser = async (req, res) => {
  try {
    const { email } = req.params;

    const {name: newname,email: newemail,password: newpassword} = req.body;

    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(404).json({message: "User not found" });
    }

    const anotherUser = await Users.findOne({email: newemail});

    if (anotherUser &&anotherUser._id.toString() !== user._id.toString()) {
      return res.status(400).json({message: "Email is already used"});
    }

    user.name = newname;
    user.email = newemail;
    user.password = newpassword;

    await user.save();

    return res.status(200).json({message: "User updated successfully",
      user: {name: user.name,email: user.email}});

  } catch (error) {
    return res.status(500).json({message: "Failed to update user",error: error.message});
  }
};