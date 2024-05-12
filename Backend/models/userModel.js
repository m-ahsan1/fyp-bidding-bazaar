const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  uid: { type: String, required: true, unique: true },
  image: {type: String,required: false,  },
  phone: { type: String, required: true },
  cnic: { type: String, required: false },
  currentAddress: { type: String, required: false },
  token: { type: String, required: false }

  
  // listings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Listing' }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
