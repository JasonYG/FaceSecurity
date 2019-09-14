const axios = require("axios");

const graphApi = async () => {
  const initialResponse = await new Promise((res, rej) =>
    res(axios.get("http://localhost:3000/"))
  );
  console.log(initialResponse.data);
};

graphApi();
