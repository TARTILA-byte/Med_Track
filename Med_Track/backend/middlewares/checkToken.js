import jwt from "jsonwebtoken";

const checkToken = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      authenticated: false,
      error: "No token provided",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log("JWT Verification Error:", err.message);

      res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
      });

      return res.status(401).json({
        authenticated: false,
        error: "Invalid or expired token",
      });
    }
    console.log("JWT USER:", user);
    req.user = user;
    next();
  });
};

export default checkToken;
