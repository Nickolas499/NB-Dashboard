import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookie from "cookie-parser";
//============================================================================//
//                              ROUTES IMPORT                                 //
//============================================================================//
import authRoutes from "./routes/auth.routes.js";
import registration from "./routes/registration.routes.js";
import scaned from "./routes/scaned.routes.js";

//============================================================================//
//                      Express Server CONFIG                                 //
//============================================================================//
const app = express();
app.use(cors(
    {
        origin: "http://192.168.1.186:3000",
        credentials: true
    }
));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookie());

//============================================================================//
//                                  ROUTES                                    //
//============================================================================//
app.use('/api', authRoutes)
app.use('/api', registration)
app.use('/api', scaned)

//============================================================================//
//                                  others                                    //
//============================================================================//

app.get("/", (req, res) => {
    res.send("Hello World!");
})


export default app