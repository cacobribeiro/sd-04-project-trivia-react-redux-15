import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { findQuestionsFalseAction, indexAction } from '../actions/FindQuestions';
import { timeAction } from '../actions/TimeAction';

function ButtonNext({ changeTime, index, changeIndex, findQuestionsFalse }) {
  function nextQuestions() {
    changeIndex(index + 1);
    changeTime(30);
    findQuestionsFalse();
  }
  return (
    <div>
      <button data-testid="btn-next" type="button" onClick={() => nextQuestions()}>
        Proxima
      </button>
    </div>
  );
}

ButtonNext.propTypes = {
  changeIndex: PropTypes.func.isRequired,
  changeTime: PropTypes.func.isRequired,
  findQuestionsFalse: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  findQuestions: state.FindQuestions.findQuestions,
  time: state.ChangeTime.time,
  index: state.index.index,
});

const mapDispatchToProps = (dispatch) => ({
  changeIndex: (newIndex) => dispatch(indexAction(newIndex)),
  findQuestionsFalse: () => dispatch(findQuestionsFalseAction()),
  changeTime: (time) => dispatch(timeAction(time)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ButtonNext);
