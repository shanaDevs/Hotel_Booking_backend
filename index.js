import express from 'express';
import bodyParser from 'body-parser';
import userRouter from './routes/usersRoute.js';
import galleryItemRouter from './routes/galleryItemRouter.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()

const app = express();

app.use(bodyParser.json());

app.use("/api/users", userRouter);
app.use("/api/gallery", galleryItemRouter);

app.use((req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
      return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
          return res.status(403).json({ message: "Invalid or expired token" });
      }

      // Attach the decoded user info to the request
      req.user = decoded;
      next();
  });
});


  
const connectionString = process.env.MONGO_URL;
mongoose.connect(connectionString)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error({
        message: 'Failed to connect to MongoDB',
        error: err.message,  
        stack: err.stack,
        timestamp: new Date()
    }));

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
