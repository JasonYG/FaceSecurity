// This file makes API calls to the Graph API
const axios = require("axios");

const callGraphApi = async () => {
  const appId = "683297672043582";
  const userAccessToken = "";

  axios.get(`https://graph.facebook.com/{your-user-id}
  ?fields=id,name
  &access_token={your-user-access-token}`);
};

module.exports = callGraphApi;
