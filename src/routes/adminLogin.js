import express from "express";
import loginAdminController from "../controllers/adminLogin.js";

const router = express.Router()

router.route("/").post(loginAdminController.login)

export default router