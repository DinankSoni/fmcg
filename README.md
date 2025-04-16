# FMCG App API 🚀

Welcome to the **FMCG App API**—a robust backend for managing users and products in an FMCG (Fast-Moving Consumer Goods) platform! Built with **Express**, **TypeScript**, and **MongoDB**, this API offers secure authentication, user management, product CRUD operations, filtering, pagination, and Swagger documentation. Whether you're working on an e-commerce or inventory system, this project has you covered. 🎉

## ✨ Features

- **User Management** 🧑‍💼
  - Register and log in with JWT authentication.
  - Manage user profiles (update name/password only, includes `updatedAt`).
  - Admin-only endpoint to list all users.
- **Product Management** 📦
  - CRUD operations for products (create, read, update, delete).
  - Filter products by category, price, and name.
  - Pagination support for product listing.
- **Security & Access** 🔒
  - Role-based access: Admins can manage products; all users can view them.
  - Password hashing with `bcrypt` and JWT tokens for authentication.
- **API Documentation** 📜
  - Swagger UI at `/api/docs` for interactive API exploration.
- **Postman Collection** 🛠️
  - Ready-to-use Postman collection with automatic token updates after login/register.

---

## 🗺️ API Flow Diagram

Understand the workflow of the FMCG App API with this flowchart:

```mermaid
graph TD
    A[Start] --> B[User: Register<br>POST /api/auth/register]
    A --> C[User: Login<br>POST /api/auth/login]
    
    B --> D[Token Generated<br>Auto-update in Postman]
    C --> D
    
    D --> E[Authenticated User]
    
    E --> F[User Operations]
    F --> G[Get Profile<br>GET /api/users/me]
    F --> H[Update Profile<br>PUT /api/users/me<br>(name, password only)]
    F --> I[Delete Profile<br>DELETE /api/users/me]
    
    E --> J{User Role?}
    J -->|Admin| K[Admin Operations]
    J -->|User| L[Product Read Operations]
    
    K --> M[List Users<br>GET /api/users]
    K --> N[Product CRUD Operations]
    
    N --> O[Create Product<br>POST /api/products]
    N --> P[Update Product<br>PUT /api/products/:id]
    N --> Q[Delete Product<br>DELETE /api/products/:id]
    
    L --> R[View Products]
    R --> S[List Products<br>GET /api/products<br>(filter: category, price, name)<br>(pagination: page, limit)]
    R --> T[Get Product by ID<br>GET /api/products/:id]
    
    subgraph Swagger Documentation
        U[Swagger UI<br>/api/docs]
        S --> U
        T --> U
        G --> U
        H --> U
        I --> U
        M --> U
        O --> U
        P --> U
        Q --> U
    end