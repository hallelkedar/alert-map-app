import type { Alert } from "../types/alertModel";
import { PRIORITY_COLOR } from "./AlertsMap";

export const AlertCard = ({
  alert,
  onEdit,
  onDelete,
  onSelect,
  selected = false,
}: {
  alert: Alert;
  onEdit: () => void;
  onDelete: () => void;
  onSelect: () => void;
  selected: boolean;
}) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3>{alert.displayName}</h3>
        <span>{alert.status}</span>
      </div>
      <p>{alert.description}</p>

      <span style={{ color: PRIORITY_COLOR[alert.priority] }}>
        {alert.priority}
      </span>
      <div className="card-loaction">
        <span>{alert.arena}</span>
        <span>{alert.lat}</span>
        <span>{alert.lon}</span>
      </div>

      {!selected && <button onClick={() => onSelect()}>More...</button>}
      <button onClick={() => onEdit()}>Edit alert</button>
      <button onClick={() => onDelete()}>Delete</button>
    </div>
  );
};
