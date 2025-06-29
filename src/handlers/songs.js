import express from "express";
import { songsUsecase } from "../usecases/songs.js";
import { authMiddleware } from "../middlewares/auth.js";

const songsRouter = express.Router();

songsRouter.use(authMiddleware);

songsRouter.get("/recent", async (req, res) => {
  try {
    const resp = await songsUsecase.list();
    res.status(200).json(resp);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

export { songsRouter };
