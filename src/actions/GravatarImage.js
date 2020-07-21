export const GRAVATAR_IMAGE = 'GRAVATAR_IMAGE';

const gravatarImageAction = (gravatarImage) => ({
  type: GRAVATAR_IMAGE,
  gravatarImage,
});

export { gravatarImageAction };
