// This file makes API calls to the Graph API
const axios = require("axios");

const callGraphApi = async () => {
  const appId = "683297672043582";
  const userAccessToken = "";

  const response = await new Promise((res, rej) =>
    res(
      axios.get(
        `https://graph.facebook.com/117417339643049?fields=friends{picture.type(large)}&access_token=EAAJtdKMEnD4BAEZC4ZAwdczRZAZBL6A2Jd5P9TXxrTKbgMJsOhGIYO3q8yNZBfAmdzZADnaiWPzBEGcWNgHHZARNZBJNOUX0ETNd2qJZAmCAfpTZAXCnqQKYw0Jxr2K6vC75j8axSs6rUGLHa0ZCKJF6bnclTQRydU2gZAEZC1SLnd8qBAw0YwsKiDVcWZBqnnSvJKFJqZBvXc18jUgfeZCEnwyZCpPLZA`
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

  axios({
    method: "post",
    url: "http://localhost:3000/detect-img",
    data: {
      hello: "world"
    }
  })
    .then(res => console.log(res.data))
    .catch(e => console.log(e));

  return encodedImages;
};

module.exports = callGraphApi;
