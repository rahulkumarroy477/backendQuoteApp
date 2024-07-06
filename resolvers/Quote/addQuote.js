require('dotenv').config();
const jwt = require('jsonwebtoken');
const Quote = require('../../models/Quote');
const addQuote = async (name, context) => {
    console.log(name);
    const headers = context.rawHeaders;
    const cookieIdx = headers.indexOf('Cookie');
    if (cookieIdx === -1) {
        throw new Error("You must log in first");
    }

    const cookie = headers[cookieIdx + 1];
    let token;
    try {
        token = cookie.split('; ').find(item => item.startsWith('token=')).split('=')[1];
    } catch (error) {
        throw new Error("You must log in first");
    }
    
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    if (!token || !userId) {
        throw new Error("You must log in first");
    }
    
    console.log('Verified userId:', userId);
    const newQuote = new Quote({
        name,
        by: userId
    });

    await newQuote.save();
    return "quote added successfully";

}

module.exports = { addQuote };

