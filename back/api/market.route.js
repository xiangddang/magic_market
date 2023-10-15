import express from "express";
import ProductController from "./product.contorller.js";
import UserController from "./user.controller.js";
import MessageController from "./message.controller.js";

const router = express.Router(); // Get access to Express router

router.route("/user/:id").get(UserController.apiGetUserById);
router.route("/user").post(UserController.apiPostUser);
router.route("/user").put(UserController.apiUpdateUser);

router.route("/product").get(ProductController.apiGetProducts);
router.route("/product/:id").get(ProductController.apiGetProductById);

router.route("/product").post(ProductController.apiPostProduct);
router.route("/product").put(ProductController.apiUpdateProduct);
router.route("/product").delete(ProductController.apiDeleteProduct);

router.route("/message/:id").get(MessageController.apiGetMessagesByUserId);
router.route("/message").post(MessageController.apiAddMessage);
export default router;
