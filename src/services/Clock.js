function clockQuestion(time, changeTime) {
  const clock = setInterval(() => {
    changeTime(time - 1);
  }, 1000);
  return clock;
}

export default clockQuestion;
