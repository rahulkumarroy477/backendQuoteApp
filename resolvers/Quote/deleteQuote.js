const deleteQuote = async (quoteId, context) => {
    console.log(quoteId);
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
    try {
        const deletedQuote = await Quote.findByIdAndDelete(quoteId);
        if (!deletedQuote) {
            throw new Error('Quote not found');
        }
        return deletedQuote;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { deleteQuote };
