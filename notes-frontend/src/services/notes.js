import axios from "axios";

// const baseUrl = "http://localhost:3001/api/notes";
// const baseUrl = "https://powerful-hollows-59426.herokuapp.com/api/notes";
const baseUrl = "/api/notes";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl); // assigned the promise returned by axios to the request variable and call its then method
  const nonExisting = {
    id: 10000,
    content: "This note is not saved to server",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  };

  return request.then((response) => response.data.concat(nonExisting));
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);

  return response.data;
};

const update = (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.put(`${baseUrl}/${id}`, newObject, config);
  return request.then((response) => {
    console.log("response.data from noteService update", response.data);
    return response.data;
  });
};

const remove = (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.delete(`${baseUrl}/${id}`, config);
  return request.then((response) => response.data);
};

export default {
  getAll,
  create,
  update,
  remove,
  setToken,
};
