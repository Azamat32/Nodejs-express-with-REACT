import { ApiError } from "../error/ApiError.js";
import bcrypt from "bcrypt";
import pkg from "jsonwebtoken";
const { sign, verify } = pkg;
import dotenv from "dotenv";
dotenv.config();
import { User, Basket } from "../models/models.js";

const generateJWT = (id, email, role) => {
  return sign({ id: id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

export class UserController {
  async login(req, res, next) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.badRequest("User not found"));
    }

    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.badRequest("User not found"));
    }
    const token = generateJWT(user.id, user.email, user.role);
    return res.json({ token });
  }

  async registration(req, res, next) {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest("Not correct email or password"));
    }
    let candidate = await User.findOne({ where: { email } });

    if (candidate) {
      return next(ApiError.badRequest("There is already used email"));
    }

    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ email, role, password: hashPassword });
    const basket = await Basket.create({ userId: user.id });
    const token = generateJWT(user.id, user.email, user.role);
    return res.json({ token });
  }

  async check(req, res, next) {
    const token = generateJWT(req.user.id, req.user.email, req.user.role);
    return res.json({ token });
  }
}
