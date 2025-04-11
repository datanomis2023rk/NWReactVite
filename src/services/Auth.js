import axios from "axios";

//const baseUrl = "https://localhost:7229/api/authentication";
const baseUrl =
  "https://northwindrestapi-gmccb0cxcfgcg0a5.northeurope-01.azurewebsites.net/api";
const authenticate = (userForAuth) => {
  const request = axios.post(baseUrl, userForAuth);
  return request.then((response) => response);
};

export default { authenticate };
