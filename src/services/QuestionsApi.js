import { connect } from 'react-redux';

const URL_API = ({ token }) => `https://opentdb.com/api.php?amount=5&token=${token}`;

function questionsApi() {
  console.log(URL_API);
  fetch(`${URL_API}`).then((response) =>
    response.json().then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))),
  );
}

const mapStateToProps = (state) => ({
  token: state.tokenApi.token,
});

export default connect(mapStateToProps)(URL_API, questionsApi);
