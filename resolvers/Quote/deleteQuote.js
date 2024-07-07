require('dotenv').config();
const jwt = require('jsonwebtoken');
const Quote = require('../../models/Quote');

const deleteQuote = async (quoteId, context) => {

    // Extract headers and find the Cookie
    const headers = context.rawHeaders;
    const cookieIdx = headers.indexOf('Cookie');
    if (cookieIdx === -1) {
        throw new Error("You must log in first");
    }

    // Extract token from cookie
    const cookie = headers[cookieIdx + 1];
    let token;
    try {
        token = cookie.split('; ').find(item => item.startsWith('token=')).split('=')[1];
    } catch (error) {
        throw new Error("You must log in first");
    }

    // Verify token
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    if (!token || !userId) {
        throw new Error("You must log in first");
    }
    
    console.log('Verified userId:', userId);

    try {
        // Find the quote to delete
        const quoteToDel = await Quote.findById(quoteId);
        if (!quoteToDel) {
            console.error('Quote not found for ID:', quoteId);
            throw new Error('Quote not found');
        }

        // Check if the user is authorized to delete the quote
        if (quoteToDel.by.toString() !== userId) {
            console.log("Not a valid user");
            throw new Error("Not a valid user");
        }

        // Delete the quote
        await Quote.findByIdAndDelete(quoteId);

        return "Quote deleted successfully";
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = { deleteQuote };
