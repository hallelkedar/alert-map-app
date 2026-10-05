import { useState } from "react";
import type { Alert } from "../types/alertModel";

export const priorityOptions = ["Low", "Medium", "High", "Critical"];
export const arenaOptions = ["North", "South", "Center"];
export const activeOptions = ["Active", "Handled"];

export const AlertForm = ({
  onSubmit,
  onCancel,
  error = null,
  initialItems = null
}: {
  onSubmit: (e: React.FormEvent<HTMLFormElement>, data: Alert) => void;
  onCancel: () => void;
  error: string | null;
  initialItems: Alert | null
}) => {
  const [displayName, setName] = useState(initialItems ? initialItems.displayName : "");
  const [description, setDesc] = useState(initialItems ? initialItems.description : "");
  const [priority, setPriority] = useState(initialItems ? initialItems.priority : "Medium");
  const [arena, setArena] = useState(initialItems ? initialItems.arena : "Center");
  const [status, setStatus] = useState(initialItems ? initialItems.status : "Active");

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
      onSubmit={(e) =>
        onSubmit(e, {
          displayName,
          description,
          priority,
          arena,
          status,
          lon,
          lat,
        })
      }
    >
      <button onClick={() => onCancel()}>Cancel</button>
      {error && <span style={{ color: "red" }}>{error}</span>}
      <input
        type="text"
        value={displayName}
        placeholder="Display name"
        minLength={3}
        maxLength={20}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <textarea
        value={description}
        minLength={10}
        placeholder="Tell more about your alert"
        onChange={(e) => setDesc(e.target.value)}
        required
      />

      <label>
        Choose priority{" "}
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          required
        >
          {priorityOptions.map((option) => (
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
          onChange={(e) => setArena(e.target.value)}
          required
        >
          {arenaOptions.map((option) => (
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
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          {activeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <input
        type="number"
        step="any"
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
