const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const i18n = require('i18n');
const dotenv = require('dotenv');

// Import Error Handlers
const { notFound, errorHandler } = require('./middlewares/errorHandler');

// Load environment variables
dotenv.config();

const app = express();

// --- 1. Middlewares ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// --- 2. i18n (Internationalization) Setup ---
i18n.configure({
    locales: ['en', 'ar', 'fr', 'zh', 'hi', 'vi', 'ja', 'de', 'it', 'es', 'ru', 'tr'],
    directory: path.join(__dirname, 'locales'),
    defaultLocale: 'en',
    cookie: 'lang',
    queryParameter: 'lang',
    autoReload: true,
    updateFiles: false,
    objectNotation: true
});

app.use(i18n.init);

app.use((req, res, next) => {
    res.locals.lang = req.getLocale();
    next();
});

// --- 3. View Engine Setup ---
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// --- 4. Routes ---
const publicRoutes = require('./routes/publicRoutes');
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');

app.use('/', publicRoutes);
app.use('/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/vehicles', vehicleRoutes);

// --- 5. ERROR HANDLING (Must be after all routes) ---
app.use(notFound);
app.use(errorHandler);

// --- 6. Start Server ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}` );
});
