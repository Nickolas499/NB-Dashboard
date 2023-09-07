import app from "./app.js";
import {connectdb} from "./db.js";
const port = 5000;


connectdb();
  app.listen(port,"192.168.1.186", () => {
    console.log(`Server running on port ${port}`);
  });