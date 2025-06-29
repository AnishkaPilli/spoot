/**
 * Externals
 * API calls, constants and models for external/outward clients are defined here.
 */
import { authorize, generateToken, getTracks } from "./spotty/methods.js";
import {Initialize} from "./spotty/config.js";

// spotify client
export const spotty = {
  Initialize,
  authorize,
  generateToken,
  getTracks,
};
