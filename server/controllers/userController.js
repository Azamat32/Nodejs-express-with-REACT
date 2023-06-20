import { ApiError } from "../error/ApiError.js";

export class UserController {
  async login(req, res) {}

  async registration(req, res) {}

  async check(req, res, next) {
    const { id } = req.query; // Declare the query variable using const
    if (id) {
      res.json(id);
    } else {
      return next(ApiError.badRequest("No id inputted"));
    }
  }
}
