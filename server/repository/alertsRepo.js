import { getDB } from "../db/db.js";
import { ObjectId } from "mongodb";

const collection = () => getDB().collection("alerts");

export const toObjId = (id) => {
    return ObjectId.isValid(id) ? new ObjectId(id) : null;
}

export default {
  createAlert: async (alertData) => {
    const result = await collection().insertOne(alertData);
    return result.insertedId.toString();
  },
  getAlert: async (id) => {
    const objId = toObjId(id)
    if (!objId) return null

    return await collection().findOne({ _id: objId });
  },
  getAlerts: async () => {
    return await collection().find().toArray();
  },
  updateAlert: async (id, data) => {
    const objId = toObjId(id)
    if (!objId) return null
   return await collection().findOneAndUpdate(
      { _id: objId },
      { $set: data },
      { returnDocument: "after" },
    );
  },
  deleteAlert: async (id) => {
    const objId = toObjId(id)
    if (!objId) return null
    return await collection().findOneAndDelete({
      _id: objId,
    });
  },
};
