# Scatch - Modern E-commerce Platform

Scatch is a full-stack e-commerce web application built with Node.js, Express, and MongoDB. It features a dual-interface system for both customers and store owners, allowing for seamless product management and shopping experiences.

## 🚀 Features

### User Features
- **Authentication**: Secure Sign Up and Login using JWT and bcrypt.
- **Shop**: Browse available products with a clean UI.
- **Cart Management**:
  - Add items to the cart.
  - Remove items (smart logic handles single quantity removal).
  - Real-time bill calculation (including discounts and platform fees).
- **Checkout**: Simple checkout process that moves items to order history.

### Owner/Admin Features
- **Admin Access**: Secure route to create owner accounts (Development mode only).
- **Product Management**:
  - Create new products with images.
  - Set pricing, discounts, and custom styling (background, panel, and text colors).

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Frontend**: EJS (Embedded JavaScript templating), Tailwind CSS
- **Authentication**: JSON Web Tokens (JWT), bcrypt, cookie-parser
- **Validation**: Joi
- **File Handling**: Multer (for image uploads)

## ⚙️ Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/scatch.git
    cd scatch
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Environment Variables**
    Create a `.env` file in the root directory and add the following:
    ```env
    JWT_KEY=your_secret_jwt_key
    EXPRESS_SESSION_SECRET=your_session_secret
    NODE_ENV=development
    ```
    *Note: `NODE_ENV=development` is required to access the Owner Creation route.*

4.  **Run the Server**
    ```bash
    npx nodemon app.js
    ```
    The server will start on `http://localhost:3000`.

## 📖 Usage Guide

1.  **Create an Owner Account**:
    - Go to `http://localhost:3000/owners/create`.
    - Fill in the details to create an admin account.
    - Once created, you will be redirected to the Admin Dashboard to add products.

2.  **Shop as a User**:
    - Go to `http://localhost:3000/`.
    - Create a user account or login.
    - Browse the shop, add items to the cart, and proceed to checkout.
