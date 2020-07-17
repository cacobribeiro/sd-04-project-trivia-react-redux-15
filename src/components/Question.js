import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
    this.timeOut = this.timeOut.bind(this);
  }
  componentDidMount() {
    this.timeOut();
  }

  timeOut() {
    const { index } = this.state;
    setInterval(() => {
      this.setState({ index: index + 1 });
    }, 1000);
    if (index === 4) return clearInterval(this.timeOut());
  }

  render() {
    const { data, QuestionsLoading } = this.props;
    const { index } = this.state;
    if (QuestionsLoading) return <p>L O A D I N G . . . </p>;
    const questions = [...data[index].incorrect_answers, data[index].correct_answer].sort();
    return (
      <div>
        <div>
          <h2 data-testid="question-text">{data[index].question}</h2>
          <small data-testid="question-category">{data[index].category}</small>
        </div>
        {questions.map((e, indexWrong) => {
          if (data[index].correct_answer === e) {
            return <button data-testid="correct-answer">{e}</button>;
          }
          return <button data-testid={`wrong-answer-${indexWrong}`}>{e}</button>;
        })}
      </div>
    );
  }
}

Questions.propTypes = {
  QuestionsLoading: PropTypes.bool.isRequired,
  data: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.questionApi.data,
  QuestionsLoading: state.questionApi.QuestionsLoading,
});

export default connect(mapStateToProps)(Questions);
