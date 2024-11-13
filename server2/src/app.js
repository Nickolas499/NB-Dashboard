import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookie from "cookie-parser";

//============================================================================//
//                              ROUTES IMPORT                                 //
//============================================================================//
import authRoutes from "./routes/auth.routes.js";
// import registration from "./routes/registration.routes.js";
// import scaned from "./routes/scaned.routes.js";
// import designed from "./routes/designed.routes.js";
// import redesigned from "./routes/redesigned.routes.js";
// import graph from "./routes/graph.routes.js";
// import global from "./routes/global.routes.js";
import queue from "./routes/queuevolume.routes.js";
import userjobassigment from "./routes/userjobassigment.routes.js";

//============================================================================//
//                      Express Server CONFIG                                 //
//============================================================================//
const app = express();


app.use(cors(
    {               
        //aceptar todas los origenes
        origin: true,
        // aceptar origenes especificos
        // origin: ["http://10.62.150.33:4000","http://10.62.150.33:3000","http://localhost:4000","http://10.62.150.33:5173","http://localhost:5173"],
        
        //aceptar todas las credenciales 
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
// app.use('/api', registration)
// app.use('/api', scaned)
// app.use('/api', designed)
// app.use('/api', redesigned)
// app.use('/api', graph)
// app.use('/api', global)
app.use('/api', queue)
app.use('/api', userjobassigment)

//============================================================================//
//                                  others                                    //
//============================================================================//

// app.get("/", (req, res) => {
//     res.send("Hello World!");
// })


export default app