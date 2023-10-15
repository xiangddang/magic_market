import axios from "axios";

class UserDataService {
  get(id) {
    return axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/api/v1/user/${id}`
    );
  }

  updateUser(data) {
    return axios.put(
      `${process.env.REACT_APP_API_BASE_URL}/api/v1/user/`,
      data
    );
  }

  createUser(data) {
    return axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/api/v1/user/`,
      data
    );
  }
}

/* eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new UserDataService();
