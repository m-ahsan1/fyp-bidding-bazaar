const mongoose = require('mongoose');
const Joi = require('joi');

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, maxlength: 50, minlength: 5 },
  email: { type: String, required: true, unique: true, maxlength: 255, minlength: 5 },
  password: { type: String, required: true, maxlength: 1024, minlength: 5 }
});

function validateAdmin(admin) {
  const schema = Joi.object({
    username: Joi.string().required().min(5).max(50),
    email: Joi.string().required().email().max(255),
    password: Joi.string().required().min(5).max(1024)
  });

  return schema.validate(admin);
}

const Admin = mongoose.model('Admin', adminSchema);

module.exports = {
  Admin,
  validateAdmin
};
