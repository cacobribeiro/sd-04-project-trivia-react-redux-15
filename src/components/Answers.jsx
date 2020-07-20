import React from 'react';

function Answers() {
  return <div></div>;
}

export default Answers;

{
  questions.map((e, indexWrong) => {
    if (data[index].correct_answer === e) {
      return <button data-testid="correct-answer">{e}</button>;
    }
    return <button data-testid={`wrong-answer-${indexWrong}`}>{e}</button>;
  });
}
