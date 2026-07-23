import express from "express"
import boletos from "../controllers/boletos.js"
import { validateAuthCookie } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.route("/")
.get(validateAuthCookie(["Admin"]), boletos.getAll)
.post(validateAuthCookie(["Cliente"]), boletos.insert)

router.route("/:id")
.put(validateAuthCookie(["Admin", "Cliente"]), boletos.update)
.delete(validateAuthCookie(["Admin"]), boletos.delete)

export default router;