import alertsRepo from "../repository/alertsRepo.js";
import { errorThrowing } from "../utils/errorThrowing.js";
import { alertSchema } from "../validation/alertModel.js";
import { validateEnum } from "../validation/validateEnum.js";

export default {
  getAlerts: async (req, res) => {
    const alerts = await alertsRepo.getAlerts();
    return res.json({ alerts });
  },
  getAlert: async (req, res) => {
    const { id } = req.params;
    const alert = await alertsRepo.getAlert(id);
    if (!alert) errorThrowing("Alert not found", 404);

    return res.json({ alert });
  },
  createAlert: async (req, res) => {
    const validation = alertSchema.safeParse(req.body);
    if (!validation.success) errorThrowing("Invalid alert fields", 400);
    const createdId = await alertsRepo.createAlert(validation.data);
    if (!createdId) errorThrowing("Alert creation failed", 500);
    return res
      .status(201)
      .json({ alert: { _id: createdId, ...validation.data } });
  },
  deleteAlert: async (req, res) => {
    const { id } = req.params;
    
    const deleted = await alertsRepo.deleteAlert(id);
    if (!deleted) errorThrowing("Alert not found", 404);

    return res.json({ alert: deleted });
  },
  updateAlert: async (req, res) => {
    const { id } = req.params;
    const alert = await alertsRepo.getAlert(id);
    if (!alert) errorThrowing("Alert not found", 404);

    const { displayName, description, priority, arena, status, lon, lat } =
      req.body;
    if (
      !displayName ||
      !description ||
      !priority ||
      !arena ||
      !status ||
      !lon ||
      !lat
    )
      errorThrowing("Need at least one valid field to update", 400);

    if (priority)
      validateEnum("priority", priority, ["low", "medium", "high", "critical"]);
    if (arena) validateEnum("arena", arena, ["north", "south", "center"]);
    if (status) validateEnum("status", status, ["active", "handled"]);

    const updated = await alertsRepo.updateAlert(id, {
      displayName,
      description,
      priority,
      arena,
      status,
      lon,
      lat,
    });

    if (!updated) errorThrowing("Alert not found", 404);

    return res.json({ alert: updated });
  },
};
