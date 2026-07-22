import express from "express"
import admin from "../controllers/clientesRegister.js"

const router = express.Router()

router.route("/")
.post(admin.register);

router.route("/verifyCodeEmail")
.post(admin.verifyCode);

export default router;