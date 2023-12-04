const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  image: {type: String,required: false,  },
  Phone: { type: String, required: true },
  cnic: { type: String, required: true },
  currentAddress: { type: String, required: true },

  
  listings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Listing' }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
