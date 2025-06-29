/**
 * Spotify client
 * contains all interactions with spotify client incl. initialization & external API calls
 */

// src/spotify/config.js

let config = {
  clientId: null,
  clientSecret: null,
};

// Function to initialize the config
const Initialize = (clientId, clientSecret) => {
  if (!clientId || !clientSecret) {
    console.error(
      "All configuration values (clientId, clientSecret) must be provided"
    );
    return;
  }

  config = {
    clientId,
    clientSecret,
  };

  console.log("Initialized spotify client");
};

export { config, Initialize };
