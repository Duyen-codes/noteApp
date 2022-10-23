import axios from "axios";
const baseUrl = "/api/users";

const register = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  console.log("response.data from register", response.data);

  return response.data;
};

export default { register };
