
# Hospital Management System

A comprehensive hospital management system that provides efficient management of patients, staff, and appointments. The system enables administrators to handle hospital data and workflows effectively, with user-friendly dashboards and modular components for each section.

## Features

- **Patient Dashboard:** Manage patient details and their appointments.
- **Staff Dashboard:** View and manage staff information, including roles and shifts.
- **Financial Dashboard (Planned):** Manage financials and reports (upcoming feature).
- **CRUD Functionality:** Create, Read, Update, and Delete operations for managing patients, staff, and appointments.
- **Reusable Components:** Modular frontend structure with reusable components like Navbar, Sidebar, SummaryCards.
- **Dynamic Data Fetching:** Real-time data retrieval for patient and staff information.

## Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB (Mongoose for ORM)
- **Authentication:** JWT (JSON Web Tokens)
- **Routing:** React Router
- **State Management:** Context API / Redux (if used)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/hospital-management-system.git
cd hospital-management-system
```

### 2. Install Backend Dependencies

Navigate to the backend folder and install dependencies:

```bash
cd backend
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the `backend` folder and add the following:

```env
PORT=10000
MONGO_URI=your-mongo-db-uri
JWT_SECRET=your-jwt-secret
```

### 4. Install Frontend Dependencies

Navigate to the frontend folder and install dependencies:

```bash
cd frontend
npm install
```

### 5. Run the Application

#### Backend

```bash
cd backend
npm start
```

#### Frontend

```bash
cd frontend
npm start
```

The backend will run on `http://localhost:10000` and the frontend on `http://localhost:3000`.

## Structure

### Frontend

- `src/`: Contains all the source code.
  - `components/`: Reusable UI components like Navbar, Sidebar, SummaryCards.
  - `pages/`: Different pages for Patients, Staff, and Home.
  - `routes/`: Routing configuration for navigation between pages.
  - `context/`: State management using Context API.

### Backend

- `server.js`: Main server file to start the Express server.
- `models/`: Mongoose models for Patients, Staff, and Appointments.
- `routes/`: Express routes to handle CRUD operations for each entity.
- `controllers/`: Functions to handle API logic for various routes.

## API Endpoints

- **GET `/patients`**: Retrieve all patients.
- **POST `/patients`**: Create a new patient.
- **GET `/patients/:id`**: Get a specific patient by ID.
- **PUT `/patients/:id`**: Update a specific patient.
- **DELETE `/patients/:id`**: Delete a specific patient.

*Similarly, endpoints for staff and appointments.*

## Future Enhancements

- Financial Dashboard for managing hospital finances.
- Real-time notifications for appointments and staff updates.
- Role-based access control for admins, staff, and doctors.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

