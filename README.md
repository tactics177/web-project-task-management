# web-project-task-management

## Setup Instructions

Backend (NestJS)

1. Navigate to the backend folder:

cd backend


2. Install dependencies:

npm install


3. Create a .env file in the backend folder and add the following:

JWT_SECRET=yourSuperSecretKey
DATABASE_URL="your_mongodb_connection_url"

Replace your_mongodb_connection_url with your actual MongoDB connection URL.


4. Start the backend server:

npm run start


5. Access the backend API at:

http://localhost:3000




---

Frontend (Angular)

1. Navigate to the frontend folder:

cd frontend


2. Install dependencies:

npm install


3. Start the frontend server:

ng serve


4. Access the frontend application at:

http://localhost:4200




---

With both the backend and frontend running, you can interact with the full application by visiting the frontend URL and ensuring it connects to the backend for API requests.
