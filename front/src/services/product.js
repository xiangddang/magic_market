import axios from "axios";

class ProductDataService {
  getProducts(filters = {}) {
    return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/product/`, {
      params: filters,
    });
  }

  getProductById(id) {
    return axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/api/v1/product/${id}`
    );
  }

  createProduct(data) {
    return axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/api/v1/product/`,
      data
    );
  }

  updateProduct(data) {
    return axios.put(
      `${process.env.REACT_APP_API_BASE_URL}/api/v1/product/`,
      data
    );
  }

  deleteProduct(data) {
    return axios.delete(
      `${process.env.REACT_APP_API_BASE_URL}/api/v1/product/`,
      { data }
    );
  }
}

/* eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new ProductDataService();
