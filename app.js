import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import limiter from "./src/middlewares/limiter.js"
import admin from "./src/routes/adminregister.js"
import boletos from "./src/routes/boletos.js"
import clientes from "./src/routes/clientesregister.js"

const app = express();

app.use(
    cors({
        origin:["http://localhost:5173", "http://localhost:5174"],
        credentials: true,
    }),
);

app.use(limiter);
app.use(cookieParser);
app.use(express.json());

app.use("/api/adminRegister", admin)
app.use("/api/boletos", boletos)
app.use("/api/clientesRegister", clientes)

export default app;