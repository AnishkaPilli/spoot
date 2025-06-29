import { axo } from "../utils/axo.js";

export const authMiddleware = (req, res, next) => {
  console.log("req", req);
  const a = req.headers.authorization;
  if (!a || a === "") {
    res.status(401).json({ message: "No auth header provided" });
  }

  const splitz = a.split(" ");
  if (splitz.length != 2) {
    res.status(401).json({ message: "Invalid auth header" });
  }
  if (splitz.at(0) != "Bearer") {
    res.status(401).json({ message: "Invalid bearer auth header" });
  }

  const token = splitz.at(1);
  if (token === "") {
    res.status(401).json({ message: "Invalid token" });
  }

  axo.interceptors.request.use(
    (config) => {
      config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    },
    (error) => {
      // Handle request error
      return Promise.reject(error);
    }
  );
  next();
};
