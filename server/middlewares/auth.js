import { errorThrowing } from "../utils/errorThrowing.js";

export const authenticateUser = (req, _res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) errorThrowing("Unauthorized: no token provided", 401)

  const token = auth.split(" ")[1];
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch {
    errorThrowing("Unauthorized: no token provided", 401)
  }
};

export const authorization = (allowed = []) => {
  return (req, res, next) => {
    if (!req.user) errorThrowing("Unauthorized: no token provided");

    const isAllowed = allowed.includes(req.user.role);
    if (!isAllowed) errorThrowing(403, "User is not allowed");
    next();
  };
};