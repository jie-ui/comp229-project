# COMP229 – Convenience Store Backend (Node.js + Express + MongoDB)

A minimal but complete backend application implementing Authentication, Product Management, and Order Management with Ownership Guard, designed for COMP229 (Enterprise Development) coursework.

# Features
Module	Description
Auth	Register, Login, and Get Current User (/api/auth)
Products	Full CRUD with Admin-only protection (/api/products)
Orders	Core Entity with user ownership guard (/api/orders)
Middleware	JWT authentication, admin-only routes, ownership guard, and unified error handling
Database	MongoDB with Mongoose ODM
Environment	.env configurable (JWT secret, Mongo URI, admin email)

# Technologies Used

Node.js + Express

MongoDB + Mongoose

JWT Authentication

Bcrypt Password Hashing

Morgan Logger

CORS


# Getting Started
1. Clone the repository
git clone https://github.com/jie-ui/comp229-project .git
cd comp229-project

2. Install dependencies
npm install

3. Setup .env file

Create a .env file and configure your Mongo URI and JWT secret as shown above.

4. Run the server
npm run dev


The server will start on http://localhost:4000.

# Team

This project was created as part of the COMP229 coursework at Centennial College.
