const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, maxlength: 50, minlength: 5 },
  email: { type: String, required: true, unique: true, maxlength: 255, minlength: 5 },
  password: { type: String, required: true, maxlength: 1024, minlength: 5 }
});

adminSchema.methods.generateAuthToken = function(){
  const privateKey = process.env.JWT_PRIVATE_KEY;
    // Use the privateKey variable to sign your token
    const token = jwt.sign({ _id: this._id }, privateKey);
    return token;
}

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
