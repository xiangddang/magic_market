import UserDAO from "../dao/userDAO.js";

export default class UserController {
  static async apiGetUserById(req, res, next) {
    try {
      let id = req.params.id || {};
      let user = await UserDAO.getUserById(id);
      if (!user) {
        res.status(404).json({ error: "not found" });
        return;
      }
      res.json(user);
    } catch (e) {
      console.log(`API, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiPostUser(req, res, next) {
    try {
      const userId = req.body._id;
      const first_name = req.body.first_name;
      const last_name = req.body.last_name;
      const email = req.body.email;
      const description = req.body.description;
      const city = req.body.city;
      const state = req.body.state;
      const avatar = req.body.avatar;

      const userResponse = await UserDAO.addUser(
        userId,
        first_name,
        last_name,
        email,
        description,
        city,
        state,
        avatar
      );

      var { error } = userResponse;

      if (error) {
        res.status(500).json({ error: "Unable to add user." });
      } else {
        res.json({
          status: "success",
          response: userResponse,
        });
      }
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }

  static async apiUpdateUser(req, res, next) {
    try {
      const userId = req.body._id;
      const first_name = req.body.first_name;
      const last_name = req.body.last_name;
      const email = req.body.email;
      const description = req.body.description;
      const city = req.body.city;
      const state = req.body.state;
      const sold = req.body.sold;
      const bought = req.body.bought;
      const favorites = req.body.favorites;
      const avatar = req.body.avatar;

      const userResponse = await UserDAO.updateUser(
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
      );

      var { error } = userResponse;

      if (error) {
        res.status(500).json({ error: "Unable to update user." });
      } else {
        res.json({
          status: "success",
          response: userResponse,
        });
      }
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }
}
