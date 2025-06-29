/**
 * Config
 * Initialize the apps environment variables
 * Instead of each layer interacting with process.env, they'll interact with config
 */
import "dotenv/config";

const env = process.env;
export const config = {
  Port: env.port,

  SpotifyAuthScopes: env.SCOPES,
  SpotifyRedirectUri: env.REDIRECT_URI,
  SpotifyClientId: env.SPOT_CLIENT_ID,
  SpotifyClientSecret: env.SPOT_CLIENT_SECRET,
};
