import axios from "axios";

//const baseUrl = "https://localhost:7229/api/authentication";
const baseUrl =
  "https://northwindrestapi20250410122553-gsh7b5e5auccdecs.northeurope-01.azurewebsites.net";
const authenticate = (userForAuth) => {
  const request = axios.post(baseUrl, userForAuth);
  return request.then((response) => response);
};

export default { authenticate };
