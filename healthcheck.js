// eslint-disable-next-line import/prefer-default-export
export const ping = (req, res, next) => {
  res.status(200).json({ message: 'pong' });
};
