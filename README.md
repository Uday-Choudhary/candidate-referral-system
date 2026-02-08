# Candidate Referral Management System

A full-stack application for managing candidate referrals, built with React, Node.js, Express, and MongoDB. This system allows users to refer candidates, upload resumes, and track the status of referrals through a dashboard.

## Features

### Frontend (React + Tailwind CSS)
- **Dashboard**: 
  - Overview of all referred candidates.
  - Metrics display: Total Referrals, Pending Review, Successfully Hired.
  - Candidate cards showing Name, Job Title, Status, Email, Phone.
  - **Search & Filter**: Filter candidates by name, job title, or status (All/Pending/Reviewed/Hired).
  - **Resume View**: Direct link to view/download the candidate's uploaded PDF resume.
  - **Status Management**: Update candidate status (Pending → Reviewed → Hired) directly from the dashboard.
- **Referral Form**: 
  - Submit new candidate referrals.
  - Fields: Name, Email, Phone, Job Title.
  - **Resume Upload**: Supports PDF file uploads.

### Backend (Node.js + Express)
- **RESTful API**: Endpoints for creating, retrieving, updating, and deleting candidates.
- **Database**: MongoDB storage for candidate details.
- **File Storage**: PDF Resumes are stored directly in MongoDB (using `Buffer`) and served via API.
- **Validation**: Ensures resume files are PDFs.

---

## Tech Stack

- **Frontend**: React, main logic in `App.jsx`, `Dashboard.jsx`, `ReferralForm.jsx`. Styling with Tailwind CSS.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (with Mongoose).
- **Libraries**: 
  - Backend: `multer` (file handling), `cors`, `helmet`, `morgan`.
  - Frontend: `axios`, `lucide-react` (icons).

---

## Prerequisites

- **Node.js**: Installed on your machine.
- **MongoDB**: A local instance or a cloud MongoDB Atlas URI.

---

## Installation & Setup

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` root with the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   CLIENT_URL=http://localhost:5173
   ```
   > Note: `CLIENT_URL` should match your frontend URL to allow CORS.

4. Start the backend server:
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:5000`.

### 2. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend` root (if not using defaults):
   ```env
   VITE_API_URL=http://localhost:5000/candidates
   VITE_API_BASE_URL=http://localhost:5000
   ```
   > Ensure the ports match your backend configuration.

4. Start the frontend application:
   ```bash
   npm run dev
   ```
   The application will usually run on `http://localhost:5173` (check terminal output for exact port).

---

## API Documentation

### Candidates

| Method | Endpoint | Description | Body / Params |
| :--- | :--- | :--- | :--- |
| `GET` | `/candidates` | Fetch all candidates | None |
| `POST` | `/candidates` | Create a new candidate | `FormData`: `name`, `email`, `phone`, `jobTitle`, `resume` (File) |
| `PUT` | `/candidates/:id/status` | Update candidate status | JSON: `{ "status": "Reviewed" }` |
| `GET` | `/candidates/:id/resume` | Get candidate resume (PDF) | None |
| `DELETE` | `/candidates/:id` | Delete a candidate | None |

---

## Assumptions & Limitations

- **Authentication**: The system currently does not require user login (implementation is open for all users).
- **Resume Storage**: Resumes are stored in MongoDB as binary data (max 16MB limit per document applies for standard BSON, suitable for typical resumes).
- **Validation**: Enforces `.pdf` format for resume uploads.
