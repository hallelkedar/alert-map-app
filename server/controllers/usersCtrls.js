import usersRepo from "../repository/usersRepo.js";
import usersService from "../service/usersService.js";
import { errorThrowing } from "../utils/errorThrowing.js";
import { userSchema } from "../validation/userModel.js";
import { parseBody } from "../validation/validateBody.js";

export default {
  login: async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
      errorThrowing("Email and password are required fields", 400);

    const token = await usersService.loginUser(email, password);
    return res.status(201).json({ token });
  },
  register: async (req, res) => {
    const data = parseBody(userSchema, req.body);
    const token = await usersService.registUser(data);
    return res.status(201).json({ token });
  },
  getUserDetails: async (req, res) => {
    const { id } = req.user;
    const user = await usersRepo.findById(id);
    if (!user) errorThrowing("User not found", 404);
    return res.json({ user });
  },
  deleteUser: async (req, res) => {
    const deleted = await usersRepo.deleteUser(req.params.id);
    if (!deleted) errorThrowing("User not found", 404);

    return res.json({ user: deleted });
  },
  getAllUsers: async (req, res) => {
    const users = await usersRepo.getUsers();
    return res.json({ users });
  },
};
