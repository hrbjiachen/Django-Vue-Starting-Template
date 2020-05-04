import axios from "axios";

export default {
  fetchNotes: token => callServer("/api/notes/", "get", null, tokenUtil(token)),
  addNote: (data, token) =>
    callServer("/api/notes/", "post", data, tokenUtil(token)),
  deleteNote: (id, token) =>
    callServer(`/api/notes/${id}`, "delete", null, tokenUtil(token)),
  login: data => callServer("api/auth/login", "post", data),
  logout: token =>
    callServer("api/auth/logout", "post", null, tokenUtil(token)),
  register: data => callServer("api/auth/register", "post", data),
  getUser: token => callServer("api/auth/user", "get", null, tokenUtil(token))
};

/**
 * @param url
 * @param method
 * @param params
 * @param data
 * @returns
 */

function callServer(url, method, data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    axios({
      url,
      method,
      headers,
      data
    }).then(
      res => {
        resolve(res);
      },
      res => {
        reject(res);
      }
    );
  });
}

function tokenUtil(token) {
  return token
    ? {
        Authorization: `Token ${token}`
      }
    : null;
}
