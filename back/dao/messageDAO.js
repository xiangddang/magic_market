import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let messages;

export default class UserDAO {
  static async injectDB(conn) {
    if (messages) {
      return;
    }
    try {
      messages = await conn
        .db(process.env.MARKET_DB_COLLECTION)
        .collection("messages");
    } catch (e) {
      console.error(`Unable to connect to userDAO: ${e}`);
    }
  }

  static async addMessage(message) {
    try {
      const messageDoc = { ...message };
      return await messages.insertOne(messageDoc);
    } catch (e) {
      console.error(`Unable to add message: ${e}`);
      return { error: e };
    }
  }

  static async getMessagesByUserId(userId) {
    try {
      return await messages
        .find({
          $or: [{ senderId: userId }, { receiverId: userId }],
        })
        .toArray();
    } catch (e) {
      console.error(`Unable to get messages by user ID: ${e}`);
      throw e;
    }
  }
}
