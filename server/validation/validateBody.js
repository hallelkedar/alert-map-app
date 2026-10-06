import { errorThrowing } from "../utils/errorThrowing.js";

export const parseBody = (schema, body) => {
  const result = schema.safeParse(body);
  if (!result.success) {
    const details = result.error.issues
      .map((i) => `${i.path.join(".") || "body"}: ${i.message}`)
      .join("; ");
    errorThrowing(`Invalid fields - ${details}`, 400);
  }
  return result.data;
};