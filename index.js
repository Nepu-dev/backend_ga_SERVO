import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from './routes/userRoutes.js'
import otRoutes from './routes/otRoutes.js'

const app = express();
app.use(express.json());

dotenv.config();

connectDB();

//Configurar CORS
const whiteList = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: function (origin, callback){
        if (whiteList.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Error de Cors"));
        }
    }
}

app.use(cors(corsOptions));

// Routing
app.use("/api/users", userRoutes);
app.use("/api/ot", otRoutes);

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});