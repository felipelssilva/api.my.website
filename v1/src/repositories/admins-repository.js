const mongoose = require("mongoose");

const Admins = mongoose.model("Admins");
const bcrypt = require("bcryptjs");

exports.list = async () => {
    const res = await Admins.find({}, "username name password -_id");
    return res;
};

// exports.create = async data => {
//   const admins = new Admins(data);
//   await admins.save();
// };

exports.getUserById = async (id, callback) => {
    const res = await Admins.findById(id, callback).clone();
    return res;
};

exports.getUserByUsername = async (username, callback) => {
    const query = { username };
    const res = await Admins.findOne(query, callback).clone();
    return res;
};

exports.comparePassword = (candidatePassword, hash, callback) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        callback(null, isMatch);
    });
};
