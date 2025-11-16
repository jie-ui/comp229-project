
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


## Getting Started
```bash

# 1. Clone the repository
git clone https://github.com/jie-ui/comp229-project.git
cd comp229-project

# 2. Install dependencies
npm install

# 3. Setup `.env`
Create a `.env` file and configure:
PORT=4000  
JWT_SECRET=your_secret_here  
MONGODB_URI=your_mongo_uri_here

# 4. Start the server
npm run dev

```
The server will run at: http://localhost:4000

## Team

This project was built by Team 229 as part of Centennial College COMP229 coursework:

Jie Yang – Product & Order Routes

Harsh Katariy – Authentication

Nijanthan Saravanapavan – QA

Abdullah Zafar – EDD, Video & Presentation






