import app from "./app.js";
import {connectdb} from "./db.js";
import { IP, PORT } from "./config.js";


connectdb();
  app.listen(PORT,IP, () => {
    console.log(`Server running on ${IP}:${PORT}`);
  });