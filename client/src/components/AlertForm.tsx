import { useState } from "react";
import type { Alert, AlertInput, Arena, Priority, Status } from "../types/alertModel";
import { ARENAS, PRIORITIES, STATUSES } from "../types/alertModel";

export const AlertForm = ({
  onSubmit,
  onCancel,
  error = null,
  initialItems = null,
}: {
  onSubmit: (data: AlertInput) => void;
  onCancel: () => void;
  error: string | null;
  initialItems: Alert | null
}) => {
  const [displayName, setName] = useState(initialItems ? initialItems.displayName : "");
  const [description, setDesc] = useState(initialItems ? initialItems.description : "");
  const [priority, setPriority] = useState<Priority>(initialItems ? initialItems.priority : "Medium");
  const [arena, setArena] = useState<Arena>(initialItems ? initialItems.arena : "Center");
  const [status, setStatus] = useState<Status>(initialItems ? initialItems.status : "Active");

  const [lon, setLon] = useState<number | string>(initialItems ? initialItems.lon : '');
  const [lat, setLat] = useState<number | string>(initialItems ? initialItems.lat : '');

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        width: "300px",
        margin: "12px auto",
      }}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({
          displayName: displayName.trim(),
          description: description.trim(),
          priority,
          arena,
          status,
          lon: Number(lon),
          lat: Number(lat),
        });
      }}
    >
      <button type="button" onClick={() => onCancel()}>Cancel</button>
      {error && <span style={{ color: "red" }}>{error}</span>}
      <input
        type="text"
        value={displayName}
        placeholder="Display name"
        maxLength={50}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <textarea
        value={description}
        maxLength={500}
        placeholder="Tell more about your alert"
        onChange={(e) => setDesc(e.target.value)}
        required
      />

      <label>
        Choose priority{" "}
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          required
        >
          {PRIORITIES.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label>
        Choose arena{" "}
        <select
          value={arena}
          onChange={(e) => setArena(e.target.value as Arena)}
          required
        >
          {ARENAS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label>
        Status{" "}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as Status)}
          required
        >
          {STATUSES.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <input
        type="number"
        step="any"
        min={-180}
        max={180}
        placeholder="Location longitude"
        value={lon}
        onChange={(e) =>
          setLon(e.target.value === "" ? "" : Number(e.target.value))
        }
        required
      />

      <input
        type="number"
        step="any"
        min={-90}
        max={90}
        placeholder="Location latitude"
        value={lat}
        onChange={(e) =>
          setLat(e.target.value === "" ? "" : Number(e.target.value))
        }
        required
      />

      <button type="submit">Send alert</button>
    </form>
  );
};