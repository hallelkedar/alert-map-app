import { getDB } from "../db/db.js";
import { toObjId } from "./alertsRepo.js";

const collection = () => getDB().collection("users");

export default {
  createUser: async (data) => {
    const result = await collection().insertOne(data);
    return result.insertedId.toString();
  },
  findUserByEmail: async (email) => {
    return await collection().findOne({ email });
  },
  findById: async (id) => {
    const objId = toObjId(id);
    if (!objId) return null;

    return await collection().findOne({ _id: objId });
  },
  getUsers: async () => {
    return await collection().find().toArray();
  },
  deleteUser: async (id) => {
    const objId = toObjId(id)
        if (!objId) return null
        return await collection().findOneAndDelete({
          _id: objId,
        });
  }
};
