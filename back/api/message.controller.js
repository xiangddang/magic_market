import messageDAO from "../dao/messageDAO.js";

export default class MessageController {
  static async apiAddMessage(req, res, next) {
    try {
      const messageBody = req.body.messageBody;
      const senderId = req.body.senderId;
      const senderName = req.body.senderName;
      const receiverId = req.body.receiverId;
      const receiverName = req.body.receiverName;
      const productId = req.body.productId;
      const productName = req.body.productName;
      if (senderId === receiverId) {
        res.status(400).json({ error: "You cannot message yourself." });
        return;
      }
      const message = {
        messageBody,
        senderId,
        receiverId,
        productId,
        senderName,
        receiverName,
        productName,
      };

      const messageResponse = await messageDAO.addMessage(message);
      var { error } = messageResponse;
      if (error) {
        res.status(500).json({ error: "Unable to add message." });
      } else {
        res.json({
          status: "success",
          response: messageResponse,
        });
      }
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }

  static async apiGetMessagesByUserId(req, res, next) {
    try {
      let id = req.params.id || {};
      let messages = await messageDAO.getMessagesByUserId(id);
      if (!messages) {
        res.status(404).json({ error: "not found" });
        return;
      }
      res.json(messages);
    } catch (e) {
      console.log(`API, ${e}`);
      res.status(500).json({ error: e });
    }
  }
}
