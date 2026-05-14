const errorHandler = (error, defaultMessage = 'An error occurred') => {
  const errorResponse = {
    message: defaultMessage,
    status: 500
  };

  if (error.name === 'ValidationError') {
    errorResponse.message = 'Validation error';
    errorResponse.status = 400;
    errorResponse.details = Object.keys(error.errors).reduce((acc, key) => {
      acc[key] = error.errors[key].message;
      return acc;
    }, {});
  } else if (error.name === 'CastError') {
    errorResponse.message = 'Invalid ID format';
    errorResponse.status = 400;
  } else if (error.code === 11000) {
    errorResponse.message = 'Duplicate field value';
    errorResponse.status = 400;
  }

  return errorResponse;
};

const successResponse = (data, message = 'Success', statusCode = 200) => {
  return {
    success: true,
    message,
    data,
    statusCode
  };
};

module.exports = {
  errorHandler,
  successResponse
};
