const configFn = {
  postDB: function (postObj) {
    return fetch(import.meta.env.VITE_BACKEND_API_URL + "/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(postObj),
    });
  },

  updateDB: function (document_id, editedObj) {
    return fetch(
      import.meta.env.VITE_BACKEND_API_URL + `/put?id=${document_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(editedObj),
      }
    );
  },

  deleteDB: function (document_id) {
    return fetch(
      import.meta.env.VITE_BACKEND_API_URL + `/delete?id=${document_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
  },

  getDBid: function (id) {
    return fetch(import.meta.env.VITE_BACKEND_API_URL + `/get?id=${id}`);
  },

  getDBemail: function (email) {
    return fetch(import.meta.env.VITE_BACKEND_API_URL + `/get?email=${email}`);
  },

  getAllDBs: function () {
    return fetch(import.meta.env.VITE_BACKEND_API_URL + "/get");
  },

  apply: function (jobID, providerEmail, seekerEmail) {
    return fetch(import.meta.env.VITE_BACKEND_API_URL + "/apply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ jobID, providerEmail, seekerEmail }),
    });
  },

  appliedBYseeker: function (email) {
    return fetch(
      import.meta.env.VITE_BACKEND_API_URL + `/getapplied?email=${email}`
    );
  },
};

export default configFn;
