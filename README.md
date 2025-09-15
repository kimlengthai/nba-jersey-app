# NBA Jersey Shop

A full-stack NBA jersey eCommerce application built with the **MERN stack** (MongoDB, Express, React, Node.js) that allows users to browse NBA jerseys, place orders, and make payments. Staff members can create products, manage orders, and handle payments.

---

## Features

### User Features
- View all NBA jersey products
- Place orders and submit payment
- View order history

### Staff Features
- Create new NBA jersey products
- View all user orders
- Delete orders from all users
- Delete payments

---

## Technical Highlights
- **Frontend:** React, React Router, Axios, Bootstrap
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Authentication & Authorization:** Role-based access (staff vs user) via headers
- **State Management:** React `useState` and `useEffect`
- **API Integration:** CRUD operations for products, orders, and payments

---

## Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- MongoDB Atlas account or local MongoDB instance

---

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/nba-jersey-shop.git
cd nba-jersey-shop
```
### 2. Backend Setup
```bash
cd server
npm install

```
Create a .env file in the server folder with the following:
```bash
PORT=3001
MONGO_URI=your_mongodb_connection_string

```
Start the backend server:
```bash
npm run dev
```
The backend will run at http://localhost:3001.
### 3. Frontend Setup
```bash
cd client
npm install
npm run dev
```
The frontend will run at http://localhost:5173 (default for Vite). It should automatically open in your browser.

---

## API Endpoints
### Public Routes
- `POST /login` - User login

- `POST /register` - Register new user

- `GET /products` - Fetch all products

- `GET /orders` - Fetch orders for the logged-in user

### Staff-only Routes
- `POST /create-product` - Create a new product

- `GET /orders/all` - Fetch all orders from all users

- `DELETE /orders/all/:id` - Delete a specific order from all users

- `DELETE /orders/:id` - Delete a specific order

- `DELETE /payments/:id` - Delete a payment record

**Note:** All staff-only routes require `x-user-id` in headers corresponding to a staff user.

---

## Project Structure
```bash
nba-jersey-shop/
├── client/                  # React frontend
│   ├── src/
│   │   ├── pages/           # Pages: CreateProduct, AllOrders, Catalogue
│   │   ├── components/      # Navbar, forms, etc.
│   │   └── utils/           # api.js, authHelpers.js
├── server/                  # Node/Express backend
│   ├── controllers/         # User, Product, Order, Payment controllers
│   ├── models/              # MongoDB models: User, Product, Order, Payment
│   ├── middleware/          # authorizeRole.js
│   └── index.js             # Entry point
└── README.md

```

---

## Running the Project
**1.** Start MongoDB (if using local DB) or ensure your MongoDB Atlas URI is correct.

**2.** Start the backend server (server folder):
```bash
npm run dev
```

**3.** Start the frontend server (client folder):
```bash
npm run dev
```

**4.** Open http://localhost:5173 in your browser to use the app.

---
