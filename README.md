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

## ⚡ How to Run This Project

Get the FMCG App API running in just a few simple steps:

1. **Clone the Repo**:
   ```bash
   git clone https://github.com/your-username/fmcg-app.git
   cd fmcg-app
2. **Install Dependencies**:
   ```bash
   npm install
3. **Set Up the .env File**:
   * Create a .env file in the root directory with:
   ```bash
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/fmcg-app
   JWT_SECRET=your_secret_key
4. **Start the Server**:
   ```bash
   npm run dev
5. **View the API Docs**:
   * Open http://localhost:3000/api/docs to explore the Swagger UI.
     
* **Prerequisites**: Make sure you have Node.js (v16+), MongoDB, and Postman installed.

---
##  Postman Collection for Testing

Dive into testing the API with our pre-built Postman collection! It’s packed with all the endpoints and includes a script to automatically update the JWT token after login or registration.

**Get the Collection**
  1. Access the published Postman collection
     * **Link**: [FMCG App API Postman Collection](https://documenter.getpostman.com/view/43565250/2sB2cbaJVG)
  2. Click the Run in Postman button to import it into your Postman app, or download the JSON file and import it manually.

**Configure Your Environment**
  1. In Postman, create an environment named "FMCG App".
  2. Add these variables:
     * baseUrl: http://localhost:3000/api
     * token: replace_with_jwt_token (this will auto-update after login/register)
  3. Select the "FMCG App" environment from the top-right dropdown.

**Start Testing**
  1. Begin with the Register User or Login request under the Auth folder.
     * The script will automatically set the token variable in your environment.
  2. Try user operations like Get Profile or Update Profile.
  3. Use an admin token to access admin-only endpoints (e.g., Create Product, List Users).
  4. Test product endpoints with filtering and pagination (e.g., List Products).

---

## 🗺️ API Flow Diagram

Understand the workflow of the FMCG App API with this flowchart:

```mermaid
graph TD
    A[Start] --> B[User: Register POST /api/auth/register]
    A --> C[User: Login POST /api/auth/login]
    
    B --> D[Token Generated Auto-update in Postman]
    C --> D
    
    D --> E[Authenticated User]
    
    E --> F[User Operations]
    F --> G[Get Profile GET /api/users/me]
    F --> H[Update Profile PUT /api/users/me Name and Password Only]
    F --> I[Delete Profile DELETE /api/users/me]
    
    E --> J{User Role}
    J -->|Admin| K[Admin Operations]
    J -->|User| L[Product Read Operations]
    
    K --> M[List Users GET /api/users]
    K --> N[Product CRUD Operations]
    
    N --> O[Create Product POST /api/products]
    N --> P[Update Product PUT /api/products/:id]
    N --> Q[Delete Product DELETE /api/products/:id]
    
    L --> R[View Products]
    R --> S[List Products GET /api/products Filter by Category Price Name Pagination with Page and Limit]
    R --> T[Get Product by ID GET /api/products/:id]
    
    subgraph Swagger Documentation
        U[Swagger UI /api/docs]
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