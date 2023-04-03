import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const remove = (id) => {
  axios
    .delete(`${baseUrl}/${id}`)
    .then((response) => {
      console.log("Resource deleted successfully", response);
    })
    .catch((error) => {
      console.log("Error deleting: " + error);
    });
};

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject);
};

export default {
  getAll,
  create,
  remove,
  update,
};
