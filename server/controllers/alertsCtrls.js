import alertsRepo from "../repository/alertsRepo.js";
import { errorThrowing } from "../utils/errorThrowing.js";
import { alertSchema, alertUpdateSchema } from "../validation/alertModel.js";
import { parseBody } from "../validation/validateBody.js";

export default {
  getAlerts: async (req, res) => {
    const alerts = await alertsRepo.getAlerts();
    if (req.user.role === "arena_user")
      return res.json({
        alerts: alerts.filter((a) => a.arena === req.user.assignedArena),
      });

    return res.json({ alerts });
  },
  getAlert: async (req, res) => {
    const alert = await alertsRepo.getAlert(req.params.id);
    if (!alert) errorThrowing("Alert not found", 404);
    if (
      req.user.role === "arena_user" &&
      alert.arena !== req.user.assignedArena
    )
      errorThrowing("You are not allowed to get -another arena- alert", 403);

    return res.json({ alert });
  },
  createAlert: async (req, res) => {
    const data = parseBody(alertSchema, req.body);
    if (req.user.role === "arena_user" && data.arena !== req.user.assignedArena)
      errorThrowing("You are not allowed to use -another arena- alert", 403);

    const createdId = await alertsRepo.createAlert({...data, createdAt: new Date()});
    return res.status(201).json({ alert: { _id: createdId, ...data } });
  },

  deleteAlert: async (req, res) => {
    const deleted = await alertsRepo.deleteAlert(req.params.id);
    if (!deleted) errorThrowing("Alert not found", 404);

    if (
      req.user.role === "arena_user" &&
      deleted.arena !== req.user.assignedArena
    )
      errorThrowing("You are not allowed to delete -another arena- alert", 403);

    return res.json({ alert: deleted });
  },
  updateAlert: async (req, res) => {
    const data = parseBody(alertUpdateSchema, req.body);
    if (
      req.user.role === "arena_user" &&
      (data.arena !== req.user.assignedArena || data.status)
    )
      errorThrowing(
        "You are not allowed to edit -another arena- or -status- alert",
        403,
      );

    const updated = await alertsRepo.updateAlert(req.params.id, data);
    if (!updated) errorThrowing("Alert not found", 404);

    return res.json({ alert: updated });
  },
};
