import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import connectDB from "./config/db.js";
import userRoutes from './routes/userRoutes.js'
import otRoutes from './routes/otRoutes.js'

const app = express();
app.use(express.json());

dotenv.config();

connectDB();

//Configurar CORS
const whiteList = [process.env.FRONTEND_URL, process.env.BACKEND_URL];

const corsOptions = {
    origin: function (origin, callback) {
      if (whiteList.includes(origin)) {
        // Puede consultar la API
        callback(null, true);
      } else {
        // No esta permitido
        callback(new Error("Error de Cors"));
      }
    },
  };
  
app.use(cors(corsOptions));
app.use('/uploads', express.static('public/uploads'));


// Routing
app.use("/api/users", userRoutes);
app.use("/api/ot", otRoutes);

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});