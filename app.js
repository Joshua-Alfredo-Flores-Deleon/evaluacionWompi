import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import limiter from "./src/middlewares/limiter.js"
import admin from "./src/routes/adminregister.js"
import boletos from "./src/routes/boletos.js"
import clientes from "./src/routes/clientesregister.js"
import wompi from "./src/routes/wompi.js"
import adminLogin from "./src/routes/adminLogin.js"
import clientesLogin from "./src/routes/clientesLogin.js"

const app = express();

app.use(
    cors({
        origin:["http://localhost:5173", "http://localhost:5174"],
        credentials: true,
    }),
);

app.use(limiter);
app.use(cookieParser());
app.use(express.json());

app.use("/api/adminRegister", admin)
app.use("/api/loginAdmin", adminLogin)
app.use("/api/clientesRegister", clientes)
app.use("/api/clientesLogin", clientesLogin)
app.use("/api/boletos", boletos)
app.use("/api/wompi", wompi)

export default app;