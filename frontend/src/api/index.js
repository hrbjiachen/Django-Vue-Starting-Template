import axios from "axios";

export default {
  fetchNotes: () => callServer("/api/notes/", "get"),
  addNote: data => callServer("/api/notes/", "post", data),
  deleteNote: id => callServer(`/api/notes/${id}`, "delete")
};

/**
 * @param url
 * @param method
 * @param params
 * @param data
 * @returns
 */

function callServer(url, method, data = {}, params = {}) {
  return new Promise((resolve, reject) => {
    axios({
      url,
      method,
      params,
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
