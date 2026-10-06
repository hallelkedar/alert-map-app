import { NavBar } from "../components/NavBar";
import { useAuthStore } from "../store/authStore";
import { UsersList } from "../components/UsersList";
import { useUsers } from "../hooks/useUsers";
import { useState } from "react";
import { AddUserForm } from "../components/AddUserForm";

export const AdminPage = () => {
  const { user, logout } = useAuthStore();
  const [addUserOpen, setAddUserOpen] = useState(false)

  const { users, removeUser, error, addUser } = useUsers();

  return (
    <div>
      <NavBar
        username={user.username}
        userRole={user.role}
        isAdmin={user.role === "admin"}
        inAdminManager={true}
        onLogout={logout}
      />
      {error && <span style={{ color: "red" }}>{error}</span>}
      {!addUserOpen &&  <button onClick={() => setAddUserOpen(true)}>Add new user</button>}
      {addUserOpen && <AddUserForm register={addUser} onBack={() => {setAddUserOpen(false)}} />}

      {!addUserOpen && <UsersList users={users} onDelete={removeUser} />}
    </div>
  );
};
