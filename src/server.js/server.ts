import express from "express";

import bulkRoutes
from "./routes/bulkRoutes";

const app = express();

app.use(
 "/api",
 bulkRoutes
);

app.listen(
 3000,
 () =>
 console.log(
   "Server Running"
 )
);
