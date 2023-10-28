# Login API with Bun.js and Drizzle ORM

This project is a simple login API built with Bun.js and Drizzle ORM, following the domain model pattern. It allows users to register, log in, and perform basic user-related operations. This README provides an overview of the project, its features, and instructions for setup and usage.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)

## Features

- User registration with email and password.
- User login with password.
- Secure password hashing.
- Domain model pattern for organized code.
- Bun.js and Drizzle ORM for database interactions.
- RESTful API endpoints for user management.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Install docker (that's it)!

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/potential-train.git
   cd potential-train
   ```

2. Run the container:

  ```bash
  sudo docker compose up
  ```

## API Endpoints
- **POST /api/user**: Register a new user.
- **POST /api/login**: Authenticate and log in a user.