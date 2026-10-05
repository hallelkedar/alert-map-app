import { useState } from "react";
import { apiClient } from "../api/apiClient";

const priorityOptions = ["Low", "Medium", "High", "Critical"];
const arenaOptions = ["North", "South", "Center"];
const activeOptions = ["Active", "Handled"];

export const AddAlertForm = ({
  handleSuccess,
}: {
  handleSuccess: () => void;
}) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [arena, setArena] = useState("Center");
  const [status, setStatus] = useState("Active");

  const [error, setError] = useState<string | null>(null);

  const [lon, setLon] = useState(0);
  const [lat, setLat] = useState(0);

  const handleSubmit = async (e: React.SubmitEvent) => {
      e.preventDefault();
      setError(null);
      
      try {
      await apiClient("api/alerts", {
        method: "POST",
        body: JSON.stringify({
          displayName: name,
          description: desc,
          priority,
          arena,
          status,
          lon,
          lat,
        }),
      });
      handleSuccess();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <span style={{ color: "red" }}>{error}</span>}

      <input
        type="text"
        value={name}
        placeholder="Display name"
        minLength={3}
        maxLength={20}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="textarea"
        value={desc}
        minLength={10}
        placeholder="Tell more about your alert"
        onChange={(e) => setDesc(e.target.value)}
        required
      />
      <label>
        Choose priority{" "}
        <select onChange={(e) => setPriority(e.target.value)} required>
          {priorityOptions.map((option) => (
            <option value={option}>{option}</option>
          ))}
        </select>
      </label>

      <label>
        Choose arena{" "}
        <select onChange={(e) => setArena(e.target.value)} required>
          {arenaOptions.map((option) => (
            <option value={option}>{option}</option>
          ))}
        </select>
      </label>

      <label>
        Status{" "}
        <select onChange={(e) => setStatus(e.target.value)} required>
          {activeOptions.map((option) => (
            <option value={option}>{option}</option>
          ))}
        </select>
      </label>

      <input
        type="number"
        placeholder="Location longitude"
        onChange={(e) => setLon(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Location latitude"
        onChange={(e) => setLat(e.target.value)}
        required
      />

      <button type="submit">Send alert</button>
    </form>
  );
};
