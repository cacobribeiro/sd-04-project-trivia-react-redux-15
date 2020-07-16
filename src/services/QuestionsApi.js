const URL_API = (token) => `https://opentdb.com/api.php?amount=5&token=${token}`;

function questionsApi(token) {
  console.log(URL_API(token));
  return fetch(`${URL_API(token)}`).then((response) =>
    response.json().then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))),
  );
}

export default questionsApi;
