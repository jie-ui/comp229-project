
## COMP229 – Convenience Store Backend


A minimal but complete backend application implementing Authentication, Product Management, and Order Management with Ownership Guard, designed for COMP229 coursework.

## Features
Module	Description
Auth	Register, Login, and Get Current User (/api/auth)
Products	Full CRUD with Admin-only protection (/api/products)
Orders	Core Entity with user ownership guard (/api/orders)
Middleware	JWT authentication, admin-only routes, ownership guard, error handling
Database	MongoDB with Mongoose ODM
Environment	.env configurable (JWT_SECRET, Mongo URI, Admin Email)

## Technologies Used


Node.js + Express

MongoDB + Mongoose

JWT Authentication

Bcrypt Password Hashing

Morgan Logger
CORS


## How to Run the Project

This project contains frontend (React + Vite) and backend (Node + Express).

Please follow the steps below after cloning the repository.

1.  Clone the project
git clone <your-repo-link>
cd COMP229-PROJECT

2.  Install and run the FRONTEND
cd frontend
npm install
npm run dev


You should see Vite running on:

http://localhost:5173

3.  Install and run the BACKEND
cd ../server
npm install
npm run dev


Backend will run at:

http://localhost:5000

4. 🔧 Environment Variables

Create a .env file inside /server.

Example:

MONGO_URI=mongodb+srv://...
JWT_SECRET=xxxx
PORT=3000

## Team

This project was built by Team 229 as part of Centennial College COMP229 coursework:

Jie Yang – Product & Order Routes/BANKEND

Harsh Katariy – Authentication/FRONTEND

Nijanthan Saravanapavan – QA

Abdullah Zafar – EDD, Video & Presentation






