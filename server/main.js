/**
 * Server setup and initialization file
 */

import express from "express";
import { config } from "./src/config/config.js";
import { spotty } from "./src/externals/index.js";
import { authRouter } from "./src/handlers/auth.js";
import { songsRouter } from "./src/handlers/songs.js";

// initialize externals
spotty.Initialize(config.SpotifyClientId, config.SpotifyClientSecret);

// initialize router
console.log("Initializing router");
const app = express();

console.log("Adding middlewares");
// app.use((err, req, res) => {
//   console.error(err.stack);
//   res.status(500).send({ message: "Something went wrong!" });
// });

console.log("Adding routes");
app.get("/", (_, res) => {
  res.send({ message: "Application running" });
});
app.use("/auth", authRouter);
app.use("/songs", songsRouter);

app.listen(8080, () => {
  console.log(`App listening on port ${config.Port}`);
});
