# Gym Management System

## Project Overview
The Gym Management System is a web-based application designed to streamline the management of gym operations. This system provides an efficient way to handle various tasks related to gym memberships, class schedules, trainer management, and trainee booking. It enables gym administrators to manage the overall functionality of the gym while providing trainees with an easy-to-use interface to book classes and track their progress.

## Features
- **User Authentication:** Secure login for trainers and trainees.
- **Profile Management:** Trainees can view their profiles, including personal information and booking history.
- **Class Schedule Management:** Admins can create, update, and delete class schedules, while trainees can view available classes and book them.
- **Trainer Management:** Admins can manage trainer profiles, including their availability and assigned classes.
- **Booking System:** Trainees can book classes based on availability, with a visual representation of booked and available classes.
- **Error Handling:** Comprehensive error messages for a better user experience.

## Relational Diagram
 ![Gym Management System Screenshot](/Relational-Diagram.png)

## Technologies Used
- **Frontend:** React.js, React-Hook, Axios, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT for secure user authentication
- **Deployment:** Vercel

## API Endpoints:
  https://documenter.getpostman.com/view/36263256/2sAXxMesbJ

## Database Schema

### 1. User Model
Represents the users of the system (trainees, trainers, and admins).

- **Model Name**: `users`
- **Fields**:
   - `name`: String, required, 
   - `email`: String, required, unique
   - `password`: String, required
   - `role`: String, required (values: `trainee`, `trainer`, `admin`)
   - `createdAt`: Date, default: current date
   - `updatedAt`: Date, default: current date

---

### 2. Trainee Model
Contains information specific to trainees.

- **Model Name**: `trainees`
- **Fields**:
   - `userId`: ObjectId, required (references `User`)
   - `age`: String
   - `phone`: String
   - `weight`: String
   - `scheduledClass` : Array

---

### 3. Trainer Model
Contains information specific to trainers.

- **Model Name**: `trainers`
- **Fields**:
   - `userId`: ObjectId, required (references `users`)
   - `scheduledClass` : Array

---

### 4. Admin Model
Contains information specific to admin.

- **Model Name**: `admins`
- **Fields**:
   - `userId`: ObjectId, required (references `users`)
   - `adminLevel` : String

---

### 5. ClassSchedule Model
Defines the schedule for classes.

- **Model Name**: `class-schedules`
- **Fields**:
   - `classDate`: Date, required
   - `startTime`: String, required
   - `endTime`: String, required
   - `maxTrainees`: String, required
   - `trainees`: Array of ObjectIds, (references `trainees`) 
   - `TrainerId`, ObjectId, (references `trainers`)

---


## Admin Credentials
- email - admin@example.com
- password - 1234


## Instructions to Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/gym-management-system.git
   cd gym-management-system
   
   cd client
   npm install
   npm run dev

   cd server
   npm install
   nodemon app.js

## Live Hosting Link
    Tried vercel first time.
    Frontend(VERCEL)
    https://gym-management-frontend-two.vercel.app/
    Backend(VERCEL) ##Not Working
    https://gym-management-iota.vercel.app/

## Testing Key Features

### 1. Creating Trainers
- **Endpoint**: `POST /api/trainers`
- **Request Body**:
    ```json
    {
      "name": "John",
      "email":"john65@gmail.com",
      "password": "1234"
    }
    ```
- **Expected Response**:
   - **Status Code**: 201 Created
   - **Response Body**:
    ```json
    {
      "statusCode": 201,
      "status": "Success",
      "message": "Trainer created successfully"
    }
    ```

### 2. Scheduling Classes
- **Endpoint**: `POST /api/classes`
- **Request Body**:
    ```json
    {
      "classDate": "2024-10-07",
      "startTime": "10:00 AM",
      "trainerID": "66fd422a42dda2db46f8c7be"
    }
    ```
- **Expected Response**:
   - **Status Code**: 201 Created
   - **Response Body**:
    ```json
    {
      "statusCode": 201,
      "status": "Success",
      "message": "Class scheduled successfully",
      "data": {
        "classDate": "2024-10-07",
        "startTime": "10:00 AM",
        "trainerId": "66fd422a42dda2db46f8c7be",
        "trainees": [],
        "maxTrainees": "10",
        "_id": "66fffc57ae87aeb705f8e4c0",
        "endTime": "12:00 PM",
        "createdAt": "2024-10-04T14:31:51.566Z",
        "updatedAt": "2024-10-04T14:31:51.566Z"
    }
    }
    ```

### 3. Booking Classes
- **Endpoint**: `POST /api/bookings/{classId}`
- **Request Headers**:
   - `user_id`: Trainee's ID
- **Expected Response**:
   - **Status Code**: 200 OK
   - **Response Body**:
    ```json
    {
      "statusCode": 200,
      "status": "Success",
      "message": "Trainee booked successfully",
      "data": {
        "_id": "66fe39bd3b481726a10aa753",
        "classDate": "2024-10-07",
        "startTime": "12:00 PM",
        "trainerId": "66fd422a42dda2db46f8c7be",
        "trainees": [
            "66fd2b0256f30fc67b533808"
        ],
        "maxTrainees": "10",
        "endTime": "02:00 PM",
        "createdAt": "2024-10-03T06:29:17.635Z",
        "updatedAt": "2024-10-04T12:41:01.531Z"
    }
    }
    ```

### Testing Steps
1. **Use a Tool**: Use tools like Postman or cURL to send requests to your API endpoints.
2. **Check Responses**: Ensure that the responses match the expected outcomes outlined above.
3. **Validate Data**: Verify that the data is correctly saved in the database by querying the relevant collections after each operation.
4. **Error Handling**: Test with invalid data to ensure appropriate error messages are returned (e.g., missing fields, invalid IDs).

By following these steps, you can effectively test the core functionalities of your Gym Management System.
