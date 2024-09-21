# Sports Facility Booking Server app

## Live Url: https://sp-booking-server-three.vercel.app

## Story

This project was inspired by a sports lover named Alex, who wanted to simplify the booking process for sports facilities. Through teamwork and the use of modern technologies like TypeScript, Express.js, and Mongoose, this dream became a reality.

## Features

- **User Authentication**: User sign-up, login, and role-based access control (Admin/User).
- **Booking System**: Book sports facilities with real-time price calculation based on booking duration.
- **Facility Management**: Admins can add, update, delete, and view sports facilities.
- **Booking Management**: Users can create, view, and cancel bookings, while admins can manage all bookings.
- **Availability Checker**: Check facility availability for specific time slots.
- **Global Error Handling**: Robust error handling using middleware.
- **Soft Deletion**: Facilities can be soft-deleted (not permanently removed).
- **Middleware for Transactions**: Global middleware handles validation, transactions, and errors.

## Technologies Used

- **Backend**: Node.js, Express.js, TypeScript
- **Database**: MongoDB with Mongoose ORM
- **Validation**: Zod for input validation
- **Authentication**: JSON Web Tokens (JWT) for secure authentication
- **Error Handling**: Global error handling middleware
- **Booking Logic**: Price calculation based on facility and booking duration

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Kj-RahiL/sports-booking.git

    ```
2. Navigate to the project directory:
    ``` 
    cd sports-facility-booking
    ```
3. Install the dependencies:
    ``` 
    npm install
    ```
4. Set up environment variables:
    ```example
    PORT= port number
    DATABASE_URL=your database
    BCRYPT_SALT_ROUNDS = 5
    JWT_ACCESS_SECRET = secret code
    JWT_ACCESS_EXPIRE_IN= time expire
    JWT_REFRESH_SECRET = refresh secret code
    JWT_REFRESH__EXPIRE_IN=time expire
    ```
5. Start the server:
    ```
    npm run dev
    ```
## API Endpoints
**User Routes**
    POST /api/auth/signup: Register a new user.
    POST /api/auth/login: Login and receive an authentication token.
**Facility Routes**
    POST /api/facility: Create a new facility.
    PUT /api/facility/:id: Update an existing facility.
    DELETE /api/facility/:id: Soft delete a facility.
    GET /api/facility: Get a list of all facilities.
**Booking Routes**
    GET /api/check-availability: Check facility availability for a specific date and time.
    POST /api/bookings: Create a new booking.
    GET /api/bookings: View all bookings (Admin only).
    GET /api/bookings/user: View bookings of the logged-in user.
    DELETE /api/bookings/:id: Cancel a specific booking.

## License
    This project is Assignment Project .

Contact
If you have any questions or feedback, feel free to reach out to me via rahiilarham@gmail.com