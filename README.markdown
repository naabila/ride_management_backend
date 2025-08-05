# Ride Booking API

## Project Overview
The Ride Booking API is a robust, RESTful API built with Node.js, Express.js, MongoDB, and optional Redis integration for token blacklisting. Designed for a ride-sharing platform, it enables user management with customizable roles (`rider`, `driver`, `admin`), driver profile management, ride operations, and administrative controls such as user blocking and driver suspension. The API uses JSON Web Tokens (JWT) for secure authentication via cookies, bcrypt for password hashing, and Zod for input validation, ensuring reliability and security. Key features include ride requests, driver availability management, and role-based access control.

## Setup & Environment Instructions

### Prerequisites
- **Node.js**: v16 or higher
- **MongoDB**: Local instance or cloud (e.g., MongoDB Atlas)
- **Redis**: Optional, for JWT blacklisting
- **npm**: For dependency management
- **Postman**: Recommended for API testing

### Installation Steps
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd ride-booking-api
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the project root with the following:
   ```env
   MONGO_URI=mongodb://localhost:27017/ride_booking
   JWT_SECRET=your_secure_jwt_secret
   JWT_EXPIRES_IN=1h
   PORT=5000
   ```
   - `MONGO_URI`: MongoDB connection string.
   - `JWT_SECRET`: A secure string for JWT signing.
   - `PORT`: Default is 5000; adjust as needed.

4. **Set Up Databases**:
   - **MongoDB**: Ensure the MongoDB server is running (`mongod`) or connect to a cloud instance.
  

5. **Create Admin User**:
   - Generate a hashed password using bcrypt (10 rounds):
     ```javascript
     // scripts/generatePassword.js
     const bcrypt = require('bcrypt');
     async function generateHashedPassword(password) {
       const saltRounds = 10;
       const hashedPassword = await bcrypt.hash(password, saltRounds);
       console.log('Hashed Password:', hashedPassword);
     }
     generateHashedPassword('Admin123456');
     ```
     Run: `node scripts/generatePassword.js`
   - Insert into MongoDB:
     ```javascript
     db.users.insertOne({
       email: "admin@rideapp.com",
       password: "$2b$10$...your_hashed_password...",
       name: "System Admin",
       role: "admin",
       isBlocked: false,
       createdAt: new Date(),
       updatedAt: new Date()
     });
     ```

6. **Start the Application**:
   ```bash
   npm start
   ```
   The API will be accessible at `http://localhost:5000/api/v1`.

### Project Structure
- `src/app/middlewares/`: Authentication, validation, and error handling.
- `src/app/modules/`: Core modules for auth, user, driver, and ride operations.
- `src/app/routes/`: API route definitions.
- `src/app/utils/`: Helper functions (e.g., response formatting).
- `.env`: Environment configuration.
- `package.json`: Dependencies and scripts.

## API Endpoints Summary

All endpoints are prefixed with `/api/v1`. Authentication uses JWT cookies (`jwt`), and responses follow a standard format: `{ success: boolean, statusCode: number, message: string, data: any }`.

### Authentication
| Method | Endpoint            | Description                          | Authentication       | Request Body                                |
|--------|---------------------|--------------------------------------|---------------------|---------------------------------------------|
| POST   | `/auth/login`       | Authenticate user, set JWT cookie     | None                | `{ email: string, password: string }`        |
| POST   | `/auth/logout`      | Log out, clear cookie, blacklist token| JWT cookie (any role) | None                                       |

### Users
| Method | Endpoint                 | Description                          | Authentication       | Request Body                                |
|--------|--------------------------|--------------------------------------|---------------------|---------------------------------------------|
| POST   | `/users/register`        | Register user with specified role     | None                | `{ email: string, password: string, name: string, role: "rider" | "driver" | "admin" }` |
| GET    | `/users`                 | List all users                       | JWT cookie (admin)  | None                                        |
| PATCH  | `/users/block/:id`       | Block/unblock user                   | JWT cookie (admin)  | `{ isBlocked: boolean }`                    |

### Drivers
| Method | Endpoint                 | Description                          | Authentication       | Request Body                                |
|--------|--------------------------|--------------------------------------|---------------------|---------------------------------------------|
| POST   | `/drivers`               | Create driver profile                | JWT cookie (driver) | `{ userId: string, vehicleInfo: { type: string, licensePlate: string, model?: string, color?: string } }` |
| PATCH  | `/drivers/approve/:id`   | Approve driver profile               | JWT cookie (admin)  | None                                        |
| PATCH  | `/drivers/suspend/:id`   | Suspend driver, set offline          | JWT cookie (admin)  | None                                        |
| PATCH  | `/drivers/availability/:id` | Set driver online/offline         | JWT cookie (driver) | `{ isOnline: boolean }`                     |
| GET    | `/drivers/available`     | List available drivers               | JWT cookie (rider)  | None                                        |
| GET    | `/drivers/earnings`      | Get driver’s ride earnings           | JWT cookie (driver) | None                                        |

### Rides
| Method | Endpoint                 | Description                          | Authentication       | Request Body                                |
|--------|--------------------------|--------------------------------------|---------------------|---------------------------------------------|
| POST   | `/rides/request`         | Request a new ride                   | JWT cookie (rider)  | `{ pickupLocation: { lat: number, lng: number }, destinationLocation: { lat: number, lng: number } }` |
| PATCH  | `/rides/:id/cancel`      | Cancel a requested ride              | JWT cookie (rider)  | None                                        |
| PATCH  | `/rides/:id/accept`      | Accept a ride                        | JWT cookie (driver) | None                                        |
| PATCH  | `/rides/:id/status`      | Update ride status                   | JWT cookie (driver) | `{ status: "picked_up" | "completed" }`     |
| GET    | `/rides/history`         | Get ride history for user            | JWT cookie (rider or driver) | None                               |

                                    |
## Testing
Use Postman to test the API:
1. **Create Collection**: Name it "Ride Booking API" with folders `Setup`, `Auth`, `Users`, `Drivers`, `Rides`, `Download`.
2. **Environment Variables**: Set `baseUrl`, `adminToken`, `riderToken`, `driverToken`, `adminId`, `riderId`, `driverId`, `driverProfileId`, `rideId`.
3. **Test Setup**:
   - Follow admin user creation and login steps as described above.
   - Register rider and driver, create driver profile, approve driver, set online, request ride, and test suspension.
4. **Run Tests**: Use Postman’s Collection Runner for automated testing.
5. **Debugging**:
   - Add middleware for logging:
     ```typescript
     app.use((req, res, next) => {
       console.log('Cookies:', req.cookies);
       console.log('Headers:', req.headers);
       console.log('Body:', req.body);
       next();
     });
     ```
   - Ensure request bodies match Zod schemas to avoid validation errors.

## Notes
- **Security**: Passwords are hashed with bcrypt (10 rounds). Use a secure `JWT_SECRET`.
- **Driver Suspension**: Suspended drivers cannot go online or accept rides.
- **Testing Earnings**: Set `fare` in MongoDB for `GET /drivers/earnings`:
 

## Contributing
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit changes (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License
MIT License. See `LICENSE` file for details.