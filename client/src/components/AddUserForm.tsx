import { useState } from "react";
import { useAuthStore } from "../store/authStore";

export const AddUserForm = ({ register, onBack }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"arena_user" | "general_user" | "admin">(
    "arena_user",
  );
  const [area, setArea] = useState<"North" | "South" | "Center" | "All">(
    "North",
  );

  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await register({
        username: username.trim(),
        email: email.trim(),
        password: password.trim(),
        role: role.trim(),
        assignedArena: area.trim(),
      });
    } catch (error) {
      setError(error.message || "Somthing went wrong");
    }
  };
  return (
    <form className="register-form" onSubmit={handleSubmit}>
      {error && <span style={{ color: "red" }}>{error}</span>}
      <button onClick={() => onBack()} type="button">
        Back
      </button>

      <input
        type="text"
        value={username}
        placeholder="Name"
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <input
        type="email"
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <label>
        Choose role{" "}
        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          {["arena_user", "general_user", "admin"].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label>
        Choose area{" "}
        <select value={area} onChange={(e) => setArea(e.target.value)} required>
          {["North", "South", "Center", "All"].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <button type="submit">Add user</button>
    </form>
  );
};
