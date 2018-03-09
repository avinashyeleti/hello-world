// eslint-disable-next-line import/prefer-default-export1
export const ping = (req, res, next) => {
  console.log("123");
  res.status(200).json({ message: 'pong' });
};
