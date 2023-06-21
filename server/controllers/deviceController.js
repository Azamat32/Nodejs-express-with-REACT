import { ApiError } from "../error/ApiError.js";
import { v4 as UUIDV4 } from "uuid";
import { Device, DeviceInfo } from "../models/models.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class DeviceController {
  async create(req, res, next) {
    try {
      const { name, price, brandId, typeId } = req.body;
      const { img } = req.files;
      let fileName = UUIDV4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));
      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        img: fileName,
      });
      if (info) {
        info = JSON.parse(info);
        info.forEach((i) =>
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id,
          })
        );
      }

      return res.json(device);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async getAll(req, res) {
    let { brandId, typeId, page, limit } = req.query;
    let devices;
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;
    if (!brandId && !typeId) {
      devices = await Device.findAndCountAll({ limit, offset });
    }
    if (!brandId && typeId) {
      devices = await Device.findAndCountAll({
        where: { typeId },
        limit,
        offset,
      });
    }
    if (brandId && !typeId) {
      devices = await Device.findAndCountAll({
        where: { brandId },
        limit,
        offset,
      });
    }
    if (brandId && typeId) {
      devices = await Device.findAndCountAll({
        where: { brandId, typeId },
        limit,
        offset,
      });
    }

    return res.json(devices);
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      const device = await Device.findOne({
        where: { id },
        include: [{ model: DeviceInfo, as: "info" }],
      });
      if (!device) {
        return res.status(404).json({ message: "Device not found" });
      }
      return res.json(device);
    } catch (e) {
      return res.json({ e });
    }
  }
}
