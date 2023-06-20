import { DeviceInfo } from "../models/models.js";
import { UUIDV4 } from "sequelize";
export class DeviceController {
  async create(req, res) {
    const { name, price, brandId, typeId, info } = req.body;
    const { img } = req.files;
    let filename = UUIDV4 + ".jpg";
  }

  async getAll(req, res) {}

  async getOne(req, res) {}
}
