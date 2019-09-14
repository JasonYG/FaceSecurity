// This file makes API calls to the Graph API
const axios = require("axios");

const callGraphApi = async () => {
  const appId = "683297672043582";
  const userAccessToken = "";

  const response = await new Promise((res, rej) =>
    res(
      axios.get(
        `https://graph.facebook.com/117417339643049?fields=friends{picture.type(large)}&access_token=EAAJtdKMEnD4BALr3vL1SCOlj8k4Hi2eZBpb7oqjjfPHsww3obZCaiCuWCZA1ZAsrl1T7tP98JgUjJLRDnsTXpC6tm6Rxq6dRgMH678IEgAGSatZCvlzyZBlk4WIXB5awNbZBiaTWFWu8LpMfRonjWbosOY7hRWEycaBcqcv8KgflEv6ECqqW7wqIxJTfCVhwKQ5UFdmlglY0lN8jEAw6gUi`
      )
    )
  );
  const friendNodes = response.data.friends.data;
  const imgUrls = friendNodes.map(node => node.picture.data.url);

  const downloadedImgs = await Promise.all(
    imgUrls.map(
      url =>
        new Promise((res, rej) =>
          res(axios.get(url, { responseType: "arraybuffer" }))
        )
    )
  );
  const encodedImages = downloadedImgs.map(img =>
    new Buffer(img.data, "binary").toString("base64")
  );
  return encodedImages;
};

module.exports = callGraphApi;
