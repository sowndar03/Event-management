# Event Management System

A full-stack Event Management System built using **React**, **Node.js**, **Express.js**, **Prisma ORM**, **MySQL**, and **Redis**. The application allows users to create events, reserve seats, view reservations, and manage seat availability with transactional consistency.

---

## 🚀 Features

- Create new events
- View all available events
- Reserve seats for an event
- Prevent overbooking
- Cancel reservations
- Automatically restore seats after cancellation
- Transaction support using Prisma

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- Prisma ORM
- MySQL
- Redis

---


## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/<your-github-username>/Event-management.git
```

Navigate to the project directory

cd Event-Management


## Backend Setup

Navigate to the backend folder

cd Event-management

Install dependencies

npm install

Create a `.env` file
env
DATABASE_URL="mysql://root:password@localhost:3306/event_management"

PORT=3001


Run Prisma Migration

npx prisma migrate dev

Generate Prisma Client
npx prisma generate


Start the backend
npm start

-------------------------
## Frontend Setup
Navigate to the frontend folder
cd frontend

npm install

Create `.env`

VITE_API_URL=http://localhost:3001/api

Start the application


npm run dev


----------------------------------

## 📌 API Endpoints

### Events

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/events | Create Event |
| GET | /api/events | List All Events |

---
### Reservations

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/reservations | Reserve Seats |
| DELETE | /api/reservations/:id | Cancel Reservation |
| GET | /api/user/reservations | List User Reservations |


---
