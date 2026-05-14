const validator = require('validator');

const validateProject = (data) => {
  const errors = {};

  if (!data.title || !data.title.trim()) {
    errors.title = 'Title is required';
  } else if (data.title.length < 3) {
    errors.title = 'Title must be at least 3 characters';
  } else if (data.title.length > 100) {
    errors.title = 'Title must not exceed 100 characters';
  }

  if (!data.description || !data.description.trim()) {
    errors.description = 'Description is required';
  } else if (data.description.length < 10) {
    errors.description = 'Description must be at least 10 characters';
  }

  if (data.link && !validator.isURL(data.link)) {
    errors.link = 'Invalid URL format';
  }

  if (data.technologies && !Array.isArray(data.technologies)) {
    errors.technologies = 'Technologies must be an array';
  }

  if (data.image && !validator.isURL(data.image)) {
    errors.image = 'Invalid image URL';
  }

  return errors;
};

const validateMessage = (data) => {
  const errors = {};

  if (!data.name || !data.name.trim()) {
    errors.name = 'Name is required';
  } else if (data.name.length < 2) {
    errors.name = 'Name must be at least 2 characters';
  } else if (data.name.length > 50) {
    errors.name = 'Name must not exceed 50 characters';
  }

  if (!data.email || !validator.isEmail(data.email)) {
    errors.email = 'Valid email is required';
  }

  if (!data.subject || !data.subject.trim()) {
    errors.subject = 'Subject is required';
  } else if (data.subject.length < 3) {
    errors.subject = 'Subject must be at least 3 characters';
  } else if (data.subject.length > 100) {
    errors.subject = 'Subject must not exceed 100 characters';
  }

  if (!data.message || !data.message.trim()) {
    errors.message = 'Message is required';
  } else if (data.message.length < 10) {
    errors.message = 'Message must be at least 10 characters';
  } else if (data.message.length > 5000) {
    errors.message = 'Message must not exceed 5000 characters';
  }

  return errors;
};

module.exports = {
  validateProject,
  validateMessage
};
