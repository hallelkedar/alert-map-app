import usersRepo from "../repository/usersRepo.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { errorThrowing } from "../utils/errorThrowing.js";

export default {
  registUser: async (data) => {
    const { username, password, email, role, assignedArena } = data;
    const hashedPassword = bcrypt.hash(password, 12);

    const createdId = await usersRepo.createUser({
      username,
      password: hashedPassword,
      email,
      role,
      assignedArena,
    });
    return jwt.sign(
      { id: createdId, username, email, role, assignedArena },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );
  },
  loginUser: async (email, password) => {
    const user = await usersRepo.findUserByEmail(email);
    if (!user) errorThrowing("Email or password are incorrect", 401);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) errorThrowing("Email or password are incorrect", 401);

    return jwt.sign(
      { id: user._id, username: user.username, email: user.email, role: user.email, assignedArena: user.assignedArena },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );
  },
};
