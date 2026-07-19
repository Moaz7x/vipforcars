const supabase = require('../config/supabase');

const getHomePage = async (req, res) => {
  try {
    // Fetch vehicles
    const { data: vehicles, error: vError } = await supabase
      .from('vehicles')
      .select('*')
      .order('created_at', { ascending: false });

    if (vError) throw vError;

    // Fetch articles
    const { data: articles, error: aError } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (aError) throw aError;

    // Render the index page and pass both vehicles and articles
    res.render('index', { vehicles, articles });
  } catch (error) {
    console.error('[ERROR] Loading homepage:', error.message);
    res.status(500).send('Error loading homepage: ' + error.message);
  }
};

module.exports = { getHomePage };
