const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(401).json({ message: "Not authorized as admin" });
  }
};

export default isAdmin;
