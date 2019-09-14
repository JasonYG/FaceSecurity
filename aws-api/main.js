const AWS = require("aws-sdk");
const dotenv = require("dotenv").config();

const config = new AWS.Config({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const client = new AWS.Rekognition();

const params = {
  CollectionId: "htn2019collection" /* required */,
  Image: {
    /* required */
    Bytes:
      Buffer.from("...") ||
      "STRING_VALUE" /* Strings will be Base-64 encoded on your behalf */
  },
  DetectionAttributes: [
    "DEFAULT"
    /* more items */
  ],
  ExternalImageId: "STRING_VALUE",
  MaxFaces: "1",
  QualityFilter: "NONE"
};
client.indexFaces(params, function(err, data) {
  if (err) console.log(err, err.stack);
  // an error occurred
  else console.log(data); // successful response
});
