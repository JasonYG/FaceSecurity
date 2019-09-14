// This file makes API calls to the Graph API
const axios = require("axios");

const callGraphApi = async () => {
  const appId = "683297672043582";
  const userAccessToken = "";

  axios
    .get(
      `https://graph.facebook.com/117417339643049?fields=friends{picture}&access_token=EAAJtdKMEnD4BAFalkRtsoZCNuyk4NkZCxJ8wEHlW8WrVo1IjPBZAaIuO3daGgLIEsZBc5tD9VMmwfiZBuHbrJduf1EZCSf6GSWo0kr1I090n2ZC25z8hBEezm1a194ZASoaEjf8ItjzDnHVPCPfWbSKAZBekS79aIbNQQELDoBdeRDohqktKGsTDx53EUZAjMTxIZCnhSZBkftodFuGyzTxKHVnr`
    )
    .then(res => console.log(res.data.friends.data[0]))
    .catch(e => console.log(e));
};

module.exports = callGraphApi;
