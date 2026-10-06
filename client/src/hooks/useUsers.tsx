import { useEffect, useState } from "react";
import { deleteUser, getAllUsers, registerUser } from "../api/authApi";
import type { User } from "../types/userModel";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    const usersData = await getAllUsers();
    setUsers(
      usersData.map((u) => {
        const { _id, ...rest } = u;
        return { id: _id, ...rest };
      }),
    );
  };

  const addUser = async (data: User) => {
    try {
      const result = await registerUser(data);
      setUsers((prev) => [...prev, data]);
    } catch (error) {
      setError(error.message);
    }
  };

  const removeUser = async (id: string) => {
    try {
      const deleted = await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    removeUser,
    addUser,
    error,
  };
};
