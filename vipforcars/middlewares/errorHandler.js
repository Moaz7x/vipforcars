// Catch 404 Not Found
const notFound = (req, res, next) => {
    const error = new Error(`Page Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error); // Pass the error down to the errorHandler
};

// Global Error Handler
const errorHandler = (err, req, res, next) => {
    // Log the error in the terminal for you to debug
    console.error(`[SERVER ERROR] ${err.message}`);
    if (process.env.NODE_ENV !== 'production') {
        console.error(err.stack);
    }

    // If the status code is still 200, change it to 500 (Internal Server Error)
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);

    // If the request was an API call (like submitting a form or logging in)
    if (req.originalUrl.startsWith('/api')) {
        return res.json({
            success: false,
            message: err.message,
            stack: process.env.NODE_ENV === 'production' ? null : err.stack,
        });
    }

    // If the request was a normal web page, show a luxurious error screen
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Error - VIP For Cars</title>
            <style>
                body { font-family: 'Montserrat', sans-serif; background-color: #0a0a0a; color: #fff; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; text-align: center; }
                h1 { color: #d4af37; font-family: 'Playfair Display', serif; font-size: 3rem; margin-bottom: 10px; }
                p { color: #999; margin-bottom: 30px; max-width: 500px; line-height: 1.6; }
                a { background: linear-gradient(135deg, #a88b2c 0%, #d4af37 50%, #e8c56a 100%); color: #000; padding: 12px 30px; text-decoration: none; border-radius: 50px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; font-size: 0.8rem; transition: transform 0.3s; }
                a:hover { transform: translateY(-3px); }
            </style>
        </head>
        <body>
            <h1>Oops! Something went wrong.</h1>
            <p>${statusCode === 404 ? "The page you are looking for doesn't exist or has been moved." : "We are experiencing a temporary server issue. Please try again later."}</p>
            <a href="/">Return to Homepage</a>
        </body>
        </html>
    `);
};

module.exports = { notFound, errorHandler };
