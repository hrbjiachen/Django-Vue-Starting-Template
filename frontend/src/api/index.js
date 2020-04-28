import axios from "axios";

export default {
  fetchNotes: () => callServer("/api/notes/", "get"),
  addNote: data => callServer("/api/notes/", "post", data),
  deleteNote: id => callServer(`/api/notes/${id}`, "delete"),
  login: data => callServer("api/auth/login", "post", data),
  logout: token =>
    callServer("api/auth/logout", "post", null, {
      Authorization: `Token ${token}`
    }),
  register: data => callServer("api/auth/register", "post", data),
  getUser: token =>
    callServer("api/auth/user", "get", null, {
      Authorization: `Token ${token}`
    })
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
