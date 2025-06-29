import { config } from "./config.js";
import { AUTHORIZE_EP, RECENT_TRACKS_EP, TOKEN_EP } from "./endpoints.js";
import querystring from "querystring";
import axios from "axios";
import { axo } from "../../utils/axo.js";

const authorize = (state, redirectUri, scope) => {
  let query = querystring.stringify({
    response_type: "code",
    client_id: config.clientId,
    scope: scope,
    redirect_uri: redirectUri,
    state: state,
  });

  return `${AUTHORIZE_EP}?${query}`;
};

const generateToken = async (code, redirect_uri) => {
  // base64 encoded basic auth header
  const auth = btoa(`${config.clientId}:${config.clientSecret}`);
  const headers = {
    Authorization: `Basic ${auth} `,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  // form data req body
  const formData = new URLSearchParams();
  formData.append("grant_type", "authorization_code");
  formData.append("code", code);
  formData.append("redirect_uri", redirect_uri);

  // call API to gen token
  try {
    const resp = await axios.post(TOKEN_EP, formData, {
      headers,
    });

    if (resp.status >= 400) {
      throw new Error(resp.data.error);
    }

    return {
      accessToken: resp.data.access_token,
      refreshToken: resp.data.refresh_token,
    };
  } catch (err) {
    console.error("failed to generate token:", err.data);
    throw new Error(err);
  }
};

const getTracks = async (limit) => {
  // initial url
  const query = querystring.stringify({
    limit: limit,
  });
  let url = `${RECENT_TRACKS_EP}?${query} `;

  const data = await (async () => {
    var data = [];
    // gathering all tracks listened in previous day
    while (url) {
      try {
        const response = await axo.get(url);
        console.log("Response received:", response.status);
        console.log("Response next?:", response.data.next);

        for (const item of response.data.items) {
          data.push(item);
        }

        url = response.data.next;
      } catch (error) {
        console.error("Error:", error.message);
        throw new Error(error.message);
      }
    }
    return data;
  })();

  return data;
};

export { authorize, generateToken, getTracks };
