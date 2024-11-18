import app from "./app.js";
import {connectdb} from "./db.js";
export const IP = process.env.IP;
export const PORT =process.env.PORT || 5000;


connectdb();
  app.listen(PORT,IP, () => {
    console.log(`Server running on ${IP}:${PORT}`);
  });