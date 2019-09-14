// This file makes API calls to the Graph API
const axios = require("axios");

const callGraphApi = async () => {
  const appId = "683297672043582";
  const userAccessToken = "";

  const response = await new Promise((res, rej) =>
    res(
      axios.get(
        `https://graph.facebook.com/117417339643049?fields=friends{picture.type(large)}&access_token=EAAJtdKMEnD4BAFalkRtsoZCNuyk4NkZCxJ8wEHlW8WrVo1IjPBZAaIuO3daGgLIEsZBc5tD9VMmwfiZBuHbrJduf1EZCSf6GSWo0kr1I090n2ZC25z8hBEezm1a194ZASoaEjf8ItjzDnHVPCPfWbSKAZBekS79aIbNQQELDoBdeRDohqktKGsTDx53EUZAjMTxIZCnhSZBkftodFuGyzTxKHVnr`
      )
    )
  );
  const friendNodes = response.data.friends.data;
  const imgUrls = friendNodes.map(node => node.picture.data.url);
  console.log(imgUrls);
};

module.exports = callGraphApi;
