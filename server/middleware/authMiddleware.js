import pkg from "jsonwebtoken";
const { sign, verify } = pkg;
import dotenv from "dotenv";
dotenv.config();

export default function authMiddleware(res, req, next) {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const token = req.headers.autorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Not autorized" });
    }
    const decoded = verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ message: `User is not autorized:${e}` });
  }
}
