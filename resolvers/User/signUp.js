const User = require('../../models/User');
const bcrypt = require('bcryptjs')
const signUpUser = async (userNew) => {
    // first find the user
    const user = await User.findOne({ email: userNew.email });

    // already present
    if (user) {
        console.log('User already present');

        return "User already present, please login";
    }

    const hashedPassword = await bcrypt.hash(userNew.password, 12);
    const newUser = new User({
        ...userNew,
        password: hashedPassword
    });

    return await newUser.save();
};

module.exports = {signUpUser};