// line 2 - 6, if route is not found
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.OriginalUrl}`);
  res.status(404);
  next(error);
};

// line 9 - 16, the general errors thrown by the server
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    //converting error in a structured form
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack, //won't need stack if application is in production form, so a NODE_ENV is added in .env
  });
};

module.exports = { notFound, errorHandler };
