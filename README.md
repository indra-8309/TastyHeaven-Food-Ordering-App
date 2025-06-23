# 🍽️ TastyHeaven - Food Ordering App

[![Live Demo](https://img.shields.io/badge/Live-Demo-green?style=for-the-badge&logo=netlify)](https://tastyheaven4.netlify.app/)

TastyHeaven is a full-stack food ordering app where users can browse food items, filter by category, place orders, view their order history, and manage cart items. Admins can add, edit, and delete products in real-time.

---

## 🔗 Live Demo
🌐 [Click here to try the app](https://tastyheaven4.netlify.app)

---

## 🧑‍🍳 Features

### 🔍 User Features:
- ✅ Browse food by category (Pizza, Biryani, Starters, etc.)
- 🔍 Search bar to filter food
- 🛒 Add to cart with quantity & size options
- 💳 Checkout and view orders
- 📋 See past order history

### 🛠️ Admin Features:
- ➕ Add new food products
- 📝 Edit or delete existing items
- 📂 Manage categories dynamically

---

## 🏗️ Tech Stack

| Tech            | Description                        |
|----------------|------------------------------------|
| **Frontend**   | React.js, Bootstrap, CSS           |
| **Backend**    | Node.js, Express.js                |
| **Database**   | MongoDB (via Mongoose)             |
| **Deployment** | Frontend: Netlify <br> Backend: Render |

---

## 🛠️ Installation & Setup (Local Development)

### 📦 Prerequisites
- Node.js installed
- MongoDB running locally or via MongoDB Atlas

### 🚀 Run the App Locally

```bash
# Step 1: Clone the repo
git clone https://github.com/pravallika-0502/Tasty_Heaven.git
cd tasty-heaven

# Step 2: Start Backend
cd backend
npm install
node index.js
# (Optional) in-order to create an admin
node admin.js
# admin details
Email:admin@tastyheaven.com
Password:kindly contact to pravallika7780@gmail.com

# Step 3: Start Frontend
npm install
npm start


