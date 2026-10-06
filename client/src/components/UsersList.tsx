import type { User } from "../types/userModel";

export const UsersList = ({
  users,
  onDelete,
}: {
  users: User[];
  onDelete: (id: string) => void;
}) => {
  return (
    <ul className="users-list">
      {users.map((u) => (
        <li className="user-card">
          <div className="user-card-header">
            <p>id: {u.id}</p>
            <h3>Username: {u.username}</h3>
          </div>
          <div className="user-details">
            <span>Email: {u.email}</span>
            <span>Role: {u.role}</span>
            <span>Area: {u.assignedArena}</span>
          </div>

          <button
            style={{
              color: "red",
              backgroundColor: "rgb(177, 208, 234)",
              borderRadius: "9px",
            }}
            onClick={() => onDelete(u.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};
