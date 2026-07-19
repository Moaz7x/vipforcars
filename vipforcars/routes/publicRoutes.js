const express = require('express');
const router = express.Router();
const { getHomePage } = require('../controllers/publicController');
// Language Switcher Route
router.get('/lang/:locale', (req, res) => {
  const supportedLocales = ['en', 'ar', 'fr', 'zh', 'hi', 'vi', 'ja', 'de', 'it', 'es', 'ru', 'tr'];
  const requestedLocale = req.params.locale;
  
  // Validate the requested locale
  if (supportedLocales.includes(requestedLocale)) {
    // Set the cookie to the requested language
    res.cookie('lang', requestedLocale, { maxAge: 900000, httpOnly: true });
    console.log(`[DEBUG] Language switch requested: ${requestedLocale}`);
  } else {
    console.log(`[DEBUG] Invalid language requested: ${requestedLocale}, falling back to 'en'`);
    res.cookie('lang', 'en', { maxAge: 900000, httpOnly: true });
  }

  // Redirect back to the homepage
  res.redirect('/');
});
// Public Homepage Route
router.get('/', getHomePage);

module.exports = router;
