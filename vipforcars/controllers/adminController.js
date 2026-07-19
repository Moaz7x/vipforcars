const supabase = require('../config/supabase');

const renderLogin = (req, res) => {
  if (req.cookies.token && req.cookies.token !== 'none') {
    return res.redirect('/admin/dashboard');
  }
  res.render('admin/login');
};

const getDashboard = async (req, res) => {
  try {
    // Fetch Vehicles
    const { data: vehicles, error: vError } = await supabase.from('vehicles').select('*').order('created_at', { ascending: false });
    if (vError) throw vError;

    // Fetch Bookings
    const { data: bookings, error: bError } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
    if (bError) throw bError;

    // Fetch Articles
    const { data: articles, error: aError } = await supabase.from('articles').select('*').order('created_at', { ascending: false });
    if (aError) throw aError;

    // Pass everything to the view
    res.render('admin/dashboard', { vehicles, bookings, articles, admin: req.admin });
  } catch (error) {
    res.status(500).send('Error loading dashboard: ' + error.message);
  }
};

// --- VEHICLE LOGIC ---
const addVehicle = async (req, res) => {
  try {
    const { name, category, passengers, luggage, desc_en, desc_ar } = req.body;
    let image_url = '/images/default-car.jpg';

    if (req.file) {
      const fileExt = req.file.originalname.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const { data, error: uploadError } = await supabase.storage.from('vehicles').upload(fileName, req.file.buffer, { contentType: req.file.mimetype });
      if (uploadError) throw uploadError;
      const { data: publicUrlData } = supabase.storage.from('vehicles').getPublicUrl(fileName);
      image_url = publicUrlData.publicUrl;
    }

    const { error } = await supabase.from('vehicles').insert([{ name, category, passengers, luggage, desc_en, desc_ar, image_url }]);
    if (error) throw error;
    res.redirect('/admin/dashboard');
  } catch (error) {
    res.status(400).send('Error adding vehicle: ' + error.message);
  }
};

const deleteVehicle = async (req, res) => {
  try {
    await supabase.from('vehicles').delete().eq('id', req.params.id);
    res.redirect('/admin/dashboard');
  } catch (error) {
    res.status(400).send('Error deleting vehicle');
  }
};

// --- BOOKING LOGIC ---
const deleteBooking = async (req, res) => {
  try {
    await supabase.from('bookings').delete().eq('id', req.params.id);
    res.redirect('/admin/dashboard');
  } catch (error) {
    res.status(400).send('Error deleting booking');
  }
};

const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    await supabase.from('bookings').update({ status }).eq('id', req.params.id);
    res.redirect('/admin/dashboard');
  } catch (error) {
    res.status(400).send('Error updating status');
  }
};

// --- ARTICLE LOGIC ---
const addArticle = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    let image_url = '/images/default-article.jpg';

    if (req.file) {
      const fileExt = req.file.originalname.split('.').pop();
      const fileName = `article-${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      // NOTE: Make sure you create a storage bucket named 'articles' in Supabase!
      const { data, error: uploadError } = await supabase.storage.from('articles').upload(fileName, req.file.buffer, { contentType: req.file.mimetype });
      if (uploadError) throw uploadError;
      
      const { data: publicUrlData } = supabase.storage.from('articles').getPublicUrl(fileName);
      image_url = publicUrlData.publicUrl;
    }

    const { error } = await supabase.from('articles').insert([{ title, content, author, image_url }]);
    if (error) throw error;
    res.redirect('/admin/dashboard');
  } catch (error) {
    res.status(400).send('Error adding article: ' + error.message);
  }
};

const deleteArticle = async (req, res) => {
  try {
    await supabase.from('articles').delete().eq('id', req.params.id);
    res.redirect('/admin/dashboard');
  } catch (error) {
    res.status(400).send('Error deleting article');
  }
};

module.exports = { renderLogin, getDashboard, addVehicle, deleteVehicle, deleteBooking, updateBookingStatus, addArticle, deleteArticle };
