const axios = require("axios");
const callGraphApi = require("./graph-api");

const graphApi = async () => {
  const initialResponse = await new Promise((res, rej) =>
    res(axios.get("http://localhost:3000/"))
  );
  console.log(initialResponse.data);
  return callGraphApi();
};
graphApi();

module.exports = graphApi;
