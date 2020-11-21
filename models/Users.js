const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    first_name : {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    date_created: {
        type: Date,
        default: Date.now()
    },
    super_user: {
        type: Boolean,
        default: false
    }
});

userSchema.pre("save", function(next) {
    let user = this;

    bcrypt.genSalt(10)
        .then((salt) => {
            bcrypt.hash(user.password, salt)
                .then((encryptedPswrd) => {
                    user.password = encryptedPswrd;
                    next();
                })
                .catch((error) => {
                    console.log(`Error while hashing: ${error}`);
                })
        })
        .catch((error) => {
            console.log(`Error while getting salt: ${error}`);
        })
});

const userModel = mongoose.model("Users", userSchema)

module.exports = userModel;