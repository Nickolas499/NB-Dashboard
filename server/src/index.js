import app from "./app.js";
import {connectdb} from "./db.js";
const port = 5000;


connectdb();
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });