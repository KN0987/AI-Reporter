import mongoose from 'mongoose';

const userScheme = new mongoose.Schema({
    username: {
        type: String,
        requried: true,
        unique: true,
    },
    email: {
        type: String,
        requried: true,
        unique: true,
    },
    password: {
        type: String,
        requried: true,
    }
}, {timestamps: true});

/*'User' must be upper case so mongodb can define*/
const User = mongoose.model('User', userScheme);

export default User;