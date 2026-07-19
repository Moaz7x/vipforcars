
# 🌟 VIP For Cars - Luxury Transport & Chauffeur Service

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-B4CA65?style=for-the-badge&logo=ejs&logoColor=black)

**VIP For Cars** is a premium, full-stack web application designed for a high-end chauffeur and luxury car rental business operating in Egypt. It features a breathtaking, glassmorphism-inspired public interface and a powerful, secure admin dashboard.

## ✨ Key Features

### 🌍 Global Reach & SEO
* **12 Languages Supported:** Fully internationalized (i18n) in English, Arabic, French, German, Italian, Spanish, Russian, Turkish, Chinese, Hindi, Vietnamese, and Japanese.
* **Flawless SEO:** Dynamic Meta tags, Open Graph (OG) tags, Twitter Cards, Schema.org JSON-LD markup, and `hreflang` tags optimized for native search queries across all 12 languages.

### 💎 "$1 Million Dollar" UI/UX
* **Dark & Light Mode:** Seamless, user-controlled theme toggling with `localStorage` memory.
* **Glassmorphism Design:** Frosted glass cards, dynamic background glows, and smooth CSS transitions.
* **Fully Responsive:** Perfect layout scaling from 4K desktop monitors to mobile devices with custom sliding sidebars and mobile menus.

### 📱 Smart Booking System
* **WhatsApp Integration:** Customers fill out a detailed, multi-step booking form (Trip details, Car selection, Passenger info) which is instantly formatted and sent directly to the business's WhatsApp for immediate closing.
* **Database Tracking:** Every booking is simultaneously saved to the database with an auto-generated Trip ID for admin tracking.

### 🛡️ Secure Admin Dashboard
* **JWT Authentication:** Secure, HTTP-only cookie-based login system using `bcryptjs` for password hashing.
* **Fleet Management:** Add, edit, and delete vehicles. Upload images directly to Supabase Storage.
* **Booking Management:** View customer details, track trip types, and update booking statuses (Pending, Confirmed, Completed, Cancelled).
* **Articles & News:** Built-in CMS to publish SEO-boosting blog posts and news updates.

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js (v5)
* **Database & Storage:** Supabase (PostgreSQL)
* **Frontend:** EJS (Embedded JavaScript), Tailwind CSS
* **Authentication:** JSON Web Tokens (JWT)
* **File Uploads:** Multer (Memory Storage) -> Supabase Storage
* **Internationalization:** `i18n` node module

---

## 🚀 Getting Started (Local Development)

### Prerequisites
* Node.js (v18 or higher)
* A [Supabase](https://supabase.com/) account and project

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/vipforcars.git
cd vipforcars
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory and add the following keys:
```env
PORT=3000
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_service_role_key
JWT_SECRET=your_super_secret_jwt_string
NODE_ENV=development
```

### 4. Supabase Setup
1. Create three tables in your Supabase database: `admins`, `vehicles`, and `bookings`, and `articles`.
2. Create two **Public** storage buckets named `vehicles` and `articles`.
3. Run the seed script to create your first admin user and sample vehicle:
```bash
node seed.js
```

### 5. Run the Application
```bash
npm run dev
```
* Public Site: `http://localhost:3000`
* Admin Panel: `http://localhost:3000/admin/login`

---

## 📂 Project Structure

```text
vipforcars/
├── config/             # Supabase & DB configuration
├── controllers/        # Route logic (Admin, Auth, Public, Vehicles)
├── locales/            # i18n JSON translation files (12 languages)
├── middlewares/        # JWT Auth protection & Global Error Handling
├── public/             # Static assets (CSS, Images, Client-side JS)
├── routes/             # Express API and View routes
├── views/              # EJS Templates
│   ├── admin/          # Dashboard & Login views
│   ├── partials/       # Reusable UI components (Navbar, Footer, etc.)
│   └── index.ejs       # Main public landing page
├── server.js           # Express app entry point
└── package.json        # Dependencies & Scripts
```

---

## 🌐 Deployment
This application is optimized for deployment on platforms like **Render**, **Vercel**, or **Heroku**. 
Ensure that your `.env` variables are properly set in your hosting provider's dashboard and that your build command is set to `npm install` and start command to `npm start`.

---
*Designed and developed for luxury, speed, and global scale.*
```

### How to use this:
1. Open your `readme.md` file in your code editor.
2. Delete whatever is currently in there.
3. Paste this markdown text.
4. Change the `https://github.com/yourusername/vipforcars.git` link in the "Clone the repository" section to your actual GitHub link.
5. Save the file, commit, and push to GitHub!

```bash
git add readme.md
git commit -m "Added perfect README"
git push
