export class UserController {
  async login(req, res) {}

  async registration(req, res) {}

  async check(req, res) {
    const { id } = req.query; // Declare the query variable using const
    if (id) {
      res.json(id);
    } else {
      res.json({ message: "Enter id" });
    }
  }
}
