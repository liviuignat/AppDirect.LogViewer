import superagent from 'superagent';
import config from 'config';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function getUrl(path) {
  return `${config.app.baseApiUrl}${path}`;
}

class _ApiClient {
  constructor(req) {
    methods.forEach((method) =>
      this[method] = (path, requestData = {}) => {
        const {params, data} = requestData;

        return new Promise((resolve, reject) => {
          const url = getUrl(path);
          const request = superagent[method](url);

          if (params) {
            request.query(params);
          }

          if (__SERVER__) {
            copyHeadersToRequest({request, headers: req.headers});
          }

          request.set('Content-Type', 'application/json');
          request.set('Accept', 'application/json, text/javascript');

          if (data) {
            request.send(data);
          }
          request.end((err, response = {}) => {
            const {body, text} = response;

            if (err) {
              return reject(body || err);
            }

            resolve(body || text);

          });
        });
      });
  }
}

function copyHeadersToRequest({request, headers}) {
  Object.keys(headers || {}).forEach(key => request.set(key, headers[key]));
}

const ApiClient = _ApiClient;

export default ApiClient;
