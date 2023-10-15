import axios from "axios";

class MessageDataService {
  get(id) {
    return axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/api/v1/message/${id}`
    );
  }

  createMessage(data) {
    return axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/api/v1/message/`,
      data
    );
  }
}

/* eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new MessageDataService();
