import express from "express";
import { generateRandomString } from "../utils/utils.js";
import { authUsecase } from "../usecases/auth.js";
import cookieParser from "cookie-parser";

const authRouter = express.Router();
authRouter.use(cookieParser());

authRouter.get("/login", (req, res) => {
  var state = generateRandomString(16);
  res.cookie("state", state, {
    maxAge: 1000 * 60 * 60, //1 hr
    // path: "/callback",
  });

  res.redirect(authUsecase.login(state));
});

authRouter.get("/callback", async (req, res) => {
  const state = req.query.state ?? null;
  const storedState = req.cookies.state;

  // state checks
  if (state == null || state !== storedState) {
    res.status(401).json({ message: "Mismatched state" });
    return;
  }

  // clear state from cookies
  res.clearCookie("state");
  var error = req.query.error;
  if (error !== undefined) {
    res.status(500).json({ message: error });
    return;
  }

  var code = req.query.code;
  try {
    const resp = await authUsecase.generateToken(code);
    res.status(200).json(resp);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

export { authRouter };
