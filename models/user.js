/**
 * A simple client-side only model used to list users in the Admin view, which
 * is acessible if logged in on a profile that has { "admin": true } set on it.
 * It is not used for anything else.
 */

import axios from 'axios';

export default class {
  static async list({ page = 0, size = 10 } = {}) {
    return axios
      .get(`/admin/users?page=${page}&size=${size}`, {
        headers: {
          credentials: 'same-origin',
        },
      })
      .then(({ data }) => data)
      .catch((error) => {
        console.log(error);
      });
  }
}
