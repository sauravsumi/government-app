import superagent from 'superagent';

const _get = (url,queryString, callback) => 
superagent
  .get(url)
  .query(queryString) // query string
  .end((err, res) => {
    callback(res.body)
  });

const _post = (url, requestBody, callback) =>
superagent
  .post(url)
  .send(requestBody) // sends a JSON post body
  .set('Content-Type', 'application/json')
  .end((err, res) => {
    callback(res.body)
  });

 export { _get, _post };