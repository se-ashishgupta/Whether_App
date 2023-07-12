import { app } from "./app.js";

//Listing on port 4000
app.listen(process.env.PORT, () => {
  console.log(`Server Working on PORT ${process.env.PORT} `);
});
