const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const signInUser = async (userSignIn, res) => {
    const user = await User.findOne({ email: userSignIn.email });
    if (!user) {
        throw new Error('Invalid email or password');
    }
    const doMatch = await bcrypt.compare(userSignIn.password, user.password);
    if (!doMatch) {
        throw new Error('Invalid email or password');
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=3600`); // 1 hour
    return { token };
}

module.exports = { signInUser };