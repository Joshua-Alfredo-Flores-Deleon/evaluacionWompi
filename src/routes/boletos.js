import express from "express"
import boletos from "../controllers/boletos.js"

const router = express.Router()

router.route("/")
.get(boletos.getAll)
.post(boletos.insert)

router.route("/:id")
.put(boletos.update)
.get(boletos.delete)

export default router;