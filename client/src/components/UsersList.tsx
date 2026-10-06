import type { User } from "../types/userModel";

export const UsersList = ({
  users,
  onDelete,
}: {
  users: User[];
  onDelete: (id: string) => void;
}) => {
  return (
    <ul className="cards-list">
      {users.map((u) => (
        <li className="card">
          <p>{u.id}</p>
          <h3>{u.username}</h3>
          <span>{u.email}</span>
          <span>{u.role}</span>
          <span>{u.assignedArena}</span>

          <button style={{color: 'red', backgroundColor: 'white'}} onClick={() => onDelete(u.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};
