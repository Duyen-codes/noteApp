import axios from "axios";

// const baseUrl = "http://localhost:3001/api/notes";
// const baseUrl = "https://powerful-hollows-59426.herokuapp.com/api/notes";
const baseUrl = "/api/notes";

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

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => {
    return response.data;
  });
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

export default {
  getAll,
  create,
  update,
  remove,
};
