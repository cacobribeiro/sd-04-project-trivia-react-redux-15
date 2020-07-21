export const disabledBtn = () => {
  const btn = document.querySelectorAll('.btn-answer');
  btn.forEach((e) => (e.disabled = true));
};

export const enableBtn = () => {
  const btn = document.querySelectorAll('.btn-answer');
  btn.forEach((e) => (e.disabled = false));
};
