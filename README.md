# 🚖 Taxi24 API

A RESTful API built with **NestJS**, **PostgreSQL**, and **Docker**, for managing a taxi booking system. It includes core entities like `Driver`, `Passenger`, and `Trip`.

---

## 📦 Technologies Used

- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker & Docker Compose](https://www.docker.com/)

---

## 🚀 Local Setup

### 📦 Prerequisites

Before you can run this project locally, make sure the following tools are installed on your machine:

### 🟢 Node.js

- Version: `22.x` or later
- Download: [https://nodejs.org/](https://nodejs.org/)
- Check installation:

```bash
node -v
```

### 🐳 Docker & Docker Compose (Recommended)

Used to run the app and database in containers

```bash
docker --version
docker-compose --version
```

### 🚀 NestJS CLI (for local development)

```bash
npm install -g @nestjs/cli
```

## 🛠️ Installation

1. **Clone the repository**

```bash
git clone git@github.com:IvanVilla1585/taxi24.git
cd taxi-api
```

2. **Install dependencies**

Run the following command to install the required dependencies:

```bash
npm install
```

3. **Set up environment variables**

Create a .env file in the root directory based on the .env.example file:

```bash
cp .env.example .env
```

4. **Configure PostgreSQL database**

Make sure PostgreSQL is running on your machine or use Docker to spin up a container with a PostgreSQL database.

* If you prefer Docker, run the following to start the database:

```bash
docker-compose up database
```

Connect to the container to create the database, run the following commands:

```bash
docker exec -it database psql -U your_db_username

CREATE DATABASE taxi24;

exit
```

Then stop the container by pressing Ctrl+C

* If you prefer to use a locally installed database, use any client to connect and create a database named **taxi24**.

## 🚀 Running the Application

You can run the application using either **Docker** or **locally**.

### Option 1: Using Docker (Recommended)

1. Build the Docker image:

```bash
docker compose build
```

2. Start the application and PostgreSQL container:

```bash
docker compose up
```

This will start the application, database, and any required services in containers.

### Option 2: Running Locally

1. Start the PostgreSQL database locally (if you don't use Docker).

2. Run the application:

```bash
npm run start:dev
```

This will start the NestJS application in development mode. You should now be able to access it on http://localhost:3000, if you setup the variable PORT use this value instead of 3000.

## 🧑‍💻 Running Tests

To run the init tests, use the following command:

```bash
npm run test
```

## 📄 License

This project is licensed under the MIT License.
