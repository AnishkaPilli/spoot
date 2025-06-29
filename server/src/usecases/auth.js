import { config } from "../config/config.js";
import { spotty } from "../externals/index.js";

export const authUsecase = {
  login: (state) => {
    const redirectUri = config.SpotifyRedirectUri;
    const scopes = config.SpotifyAuthScopes;
    console.log("params: ", state, redirectUri, scopes);

    return spotty.authorize(state, redirectUri, scopes);
  },

  generateToken: (code) => {
    const redirectUri = config.SpotifyRedirectUri;

    return spotty.generateToken(code, redirectUri);
  },
};
