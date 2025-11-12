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
