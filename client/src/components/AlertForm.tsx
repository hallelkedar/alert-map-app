import { useState } from "react";
import type { Alert } from "../types/alertModel";

export const priorityOptions = ["Low", "Medium", "High", "Critical"];
export const arenaOptions = ["North", "South", "Center"];
export const activeOptions = ["Active", "Handled"];

export const AlertForm = ({
  onSubmit,
}: {
  onSubmit: (e: React.FormEvent<HTMLFormElement>, data: Alert) => void;
}) => {
  const [displayName, setName] = useState("");
  const [description, setDesc] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [arena, setArena] = useState("Center");
  const [status, setStatus] = useState("Active");
  const [error, setError] = useState<string | null>(null);

  const [lon, setLon] = useState<number | null>(null);
  const [lat, setLat] = useState<number | null>(null);

  return (
    <form
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
