# VIPForCars - AI Development Master Prompt Guide

**How to use this file:** 
Copy the text inside each blockquote and paste it into your AI assistant. Wait for the AI to provide the code, implement it in your code editor, run the provided tests, and only move to the next prompt once the current step is working perfectly.

---

## Phase 1: Project Setup & Foundation

**Prompt 1: Initializing the Server and Database**
> Act as an expert Node.js developer. I am building a project called 'vipforcars'. 
> 1. Provide the terminal commands to initialize a Node.js project and install these dependencies: express, mongoose, dotenv, cors, helmet, morgan, jsonwebtoken, bcryptjs, cookie-parser, ejs, i18n. Also install nodemon as a dev dependency.
> 2. Create the exact folder structure for an MVC architecture.
> 3. Write the code for `.env` (with placeholder variables for PORT, MONGO_URI, JWT_SECRET).
> 4. Write the code for `config/db.js` to connect to MongoDB using Mongoose.
> 5. Write the code for `server.js` setting up Express, global middleware (helmet, cors, morgan, express.json), EJS view engine, and the database connection.
> 6. **TESTING:** Provide a simple test route (`app.get('/ping')`) and the terminal command to start the server so I can verify the server runs and the database connects successfully.

---

## Phase 2: Database & Data Modeling

**Prompt 2: Creating Mongoose Models**
> The server is running and connected to MongoDB. Now, let's create the database schemas.
> Please write the complete code for the following Mongoose models in the `models/` directory:
> 1. `models/Admin.js`: Fields for `username` and `password`. Include a pre-save hook using `bcryptjs` to hash the password before saving.
> 2. `models/Vehicle.js`: Fields for `name`, `category` (String, enum for Sedan, SUV, etc.), `passengers` (Number), `luggage` (Number), `image_url`, `desc_en`, and `desc_ar`.
> 3. `models/Article.js`: Fields for `title`, `content`, `image_url`, `author`, and timestamps.
> 4. **TESTING:** Write a temporary script called `seed.js` that I can run via node to create one Admin user and one dummy Vehicle in the database to verify the models work.

---

## Phase 3: Authentication & Security

**Prompt 3: Admin Authentication & JWT Middleware**
> The database models are ready. Now, let's build the authentication system for the admin panel.
> 1. Write `controllers/authController.js` with `login` (verify password, generate JWT, set HTTP-only cookie) and `logout` (clear cookie) functions.
> 2. Write `routes/authRoutes.js` to handle `POST /auth/login` and `GET /auth/logout`.
> 3. Write `middleware/authMiddleware.js` with a `requireAuth` function that verifies the JWT from the cookie. If invalid, redirect to `/auth/login`.
> 4. Update `server.js` to use the auth routes.
> 5. **TESTING:** Provide a temporary protected route in `server.js` (e.g., `app.get('/test-auth', requireAuth, ...)`). Tell me how to test the login using Postman or a simple HTML form, and verify that the cookie is set and the protected route works.

---

## Phase 4: Admin Dashboard (UI & CRUD)

**Prompt 4: Admin Views and Controllers**
> Authentication is working. Let's build the Admin Dashboard using EJS and Tailwind CSS (via CDN).
> 1. Write the EJS code for `views/admin/login.ejs` (a clean, centered login form).
> 2. Write the EJS code for `views/admin/dashboard.ejs` (a layout with a sidebar, showing a table of vehicles and a button to add a new vehicle).
> 3. Write `controllers/adminController.js` with functions to: render the dashboard (fetching vehicles from DB), add a vehicle, and delete a vehicle.
> 4. Write `routes/adminRoutes.js` applying the `requireAuth` middleware to all routes, mapping to the controller functions.
> 5. Update `server.js` to use the admin routes.
> 6. **TESTING:** Give me step-by-step instructions to navigate to `/admin`, log in with the seeded admin credentials, add a new vehicle via the UI, and delete it, ensuring the database updates accordingly.

---

## Phase 5: Public Website & Multi-Language Setup

**Prompt 5: i18n Localization and Public Views**
> The admin panel is done. Now let's build the public-facing site with multi-language support (English and Arabic).
> 1. Provide the setup code for the `i18n` package in `server.js` (using cookies or query params to switch languages).
> 2. Create `locales/en.json` and `locales/ar.json` with basic translation keys for the navbar (Home, Services, Fleet, Contact).
> 3. Write `views/partials/header.ejs` (including a language switcher and Tailwind CSS setup that supports RTL for Arabic).
> 4. Write `views/public/index.ejs` displaying a Hero section and a loop that displays the Vehicles fetched from the database.
> 5. Write `controllers/publicController.js` to render the index page and pass the vehicles data.
> 6. Write `routes/publicRoutes.js` for the home page.
> 7. **TESTING:** How do I test the language switcher? Provide instructions to load the homepage, click the language toggle, and verify that the text translates and the layout switches to RTL for Arabic.

---

## Phase 6: The Smart Booking System (Core Feature)

**Prompt 6: Booking Form and WhatsApp Integration**
> Now for the core feature: The Smart Booking Form.
> 1. Write the EJS code for `views/public/booking.ejs`. It must include a comprehensive form (Trip type, governorate, pickup/dropoff, date, time, vehicle selection, passengers, luggage, customer name, phone, notes). Use Tailwind CSS for styling.
> 2. Write the client-side JavaScript in `public/js/booking.js`. This script must:
>    - Prevent default form submission.
>    - Gather all form data.
>    - Format a clean, readable string using the data (e.g., "New Booking Request:\nTrip Type: ...").
>    - URL-encode the string.
>    - Open a new tab to `https://wa.me/<ADMIN_NUMBER>?text=<ENCODED_STRING>`.
> 3. Add the route for the booking page in `routes/publicRoutes.js`.
> 4. **TESTING:** Provide instructions on how to fill out the form in the browser, click submit, and verify that the WhatsApp Web URL opens with the exact, correctly formatted data pre-filled in the chat box.

---

## Phase 7: Refinement, UI Polish, & Error Handling

**Prompt 7: Floating Buttons and Error Pages**
> The core functionality is complete. Let's polish the application for production.
> 1. Write the EJS/CSS code to add floating action buttons (FAB ) for WhatsApp and Direct Call to `views/partials/footer.ejs`. They should remain fixed at the bottom right of the screen.
> 2. Write a custom 404 (Not Found) EJS page (`views/public/404.ejs`) and a 500 (Server Error) EJS page (`views/public/500.ejs`).
> 3. Write the middleware in `middleware/errorHandler.js` to catch errors and render the 500 page, and update `server.js` to handle 404s.
> 4. **TESTING:** 
>    - How do I test the floating buttons on mobile view (using Chrome DevTools)?
>    - Provide a URL to type in the browser to trigger the 404 page.
>    - Provide a temporary broken route to trigger and test the 500 error page.

---

## Phase 8: Deployment Preparation

**Prompt 8: Production Readiness**
> The app is fully tested locally. Prepare it for deployment.
> 1. Create a `.gitignore` file with standard Node.js exclusions.
> 2. Update `package.json` with a `"start": "node server.js"` script.
> 3. Provide a checklist and instructions on how to deploy this specific stack (Node/Express/MongoDB) to a platform like Render or Railway.
> 4. Explain how to securely set the environment variables (`MONGO_URI`, `JWT_SECRET`) in the production environment.
