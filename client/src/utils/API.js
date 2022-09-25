import axios from "axios";
const headers = {
  "Content-Type": "application/json"
};
const burl = "http://localhost:8800";

export default {
  login: function(username, password) {
    return axios.post(
      `${burl}/user/login`,
      {
        username,
        password
      },
      {
        headers: headers
      }
    );
  },

  signup: function(send) {
    return axios.post(`${burl}/user/signup`, send, { headers: headers });
  },

  facebook: function() {
    return axios.get(`${burl}/user/auth/facebook`, { headers: headers })
  },

  isAuth: function() {
    return localStorage.getItem("token") !== null;
  },

  logout: function() {
    localStorage.clear();
  }
};