import Admin from "../models/Admin.js";
import generateToken from "../utils/generateToken.js";

// Admin Register
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exist = await Admin.findOne({ email });
    if (exist) return res.status(400).json({ message: "Admin already exists" });

    const admin = await Admin.create({ name, email, password });

    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: "admin",
      token: generateToken(admin._id, "admin"),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin Login
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: "Invalid email" });

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: "admin",
      token: generateToken(admin._id, "admin"),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
