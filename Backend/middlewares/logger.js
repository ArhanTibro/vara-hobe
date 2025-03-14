const log = (req, res, next) => {
  console.log(`URL: ${req.url}, Method: ${req.method}`);
  next();
};

export default log;