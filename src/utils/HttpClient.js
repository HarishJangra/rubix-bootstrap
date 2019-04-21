require('es6-promise').polyfill();

import Axios from 'axios';
import queryString from 'query-string';

import {
  getCsrfToken
} from '../others/router';

const axios = Axios.create({
  headers: {
    'XSRF-Token': getCsrfToken(),
    'X-Requested-With': 'XMLHttpRequest',
  },
  transformRequest: (data) => {
    return queryString.stringify(data);
  }
});

const commonData = {
  _token: getCsrfToken(),
  utf8: "✓",
  authenticity_token: getCsrfToken()
};

var HttpClient = {
  request: (config) => {
    return axios.request(config);
  },
  get: (url, config) => {
    return axios.get(url, config);
  },
  delete: (url, config) => {
    return axios.post(url, {
      _method: 'delete',
      ...commonData
    }, config);
  },
  head: (url, config) => {
    return axios.post(url, {
      _method: 'head',
      ...commonData
    }, config);
  },
  post: (url, data, config) => {
    return axios.post(url, {
      ...commonData,
      ...data
    }, config);
  },
  put: (url, data, config) => {
    return axios.post(url, {
      _method: 'put',
      ...commonData,
      ...data
    }, config);
  },
  patch: (url, data, config) => {
    return axios.post(url, {
      _method: 'patch',
      ...commonData,
      ...data
    }, config);
  }
};

export default HttpClient;
