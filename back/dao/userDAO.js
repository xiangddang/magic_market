import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let users;

export default class UserDAO {
  static async injectDB(conn) {
    if (users) {
      return;
    }
    try {
      users = await conn
        .db(process.env.MARKET_DB_COLLECTION)
        .collection("user");
    } catch (e) {
      console.error(`Unable to connect to userDAO: ${e}`);
    }
  }

  static async getUserById(id) {
    try {
      return await users
        .aggregate([
          {
            $match: {
              _id: id,
            },
          },
        ])
        .next();
    } catch (e) {
      console.error(`Unable to get user by ID: ${e}`);
      throw e;
    }
  }

  static async addUser(
    userId,
    first_name,
    last_name,
    email,
    description,
    city,
    state,
    avatar
  ) {
    try {
      const userDoc = {
        _id: userId,
        first_name,
        last_name,
        email,
        description,
        city,
        state,
        bought: [],
        sold: [],
        favorites: [],
        avatar
      };

      return await users.insertOne(userDoc);
    } catch (e) {
      console.error(`Unable to add user: ${e}`);
      return { error: e };
    }
  }

  static async updateUser(
    userId,
    first_name,
    last_name,
    email,
    description,
    city,
    state,
    sold,
    bought,
    favorites,
    avatar
  ) {
    try {
      const updatedUser = {
        _id: userId,
        first_name,
        last_name,
        email,
        description,
        city: city,
        state: state,
        bought: bought,
        sold: sold,
        favorites: favorites,
        avatar
      };
      // Store the result
      const result = await users.updateOne(
        { _id: userId },
        { $set: updatedUser }
      );
      if (result.modifiedCount === 0) {
        throw new Error("Unable to update user");
      }
      return result;
    } catch (e) {
      console.error(`Unable to update user: ${e}`);
      return { error: e };
    }
  }
}
