import bodyParser from 'body-parser';
import express from 'express';
import userRouter from './routes/usersRoute.js';
import mongoose from 'mongoose';
import galleryItemRouter from './routes/galleryItemRouter.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()

const app = express();

app.use(bodyParser.json());

const connectionString = process.env.MONGO_URL;

app.use((req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (token) {
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return next();  
      }
      req.user = decoded; 
      next();
    });
  } else {
    next();  
  }
});

mongoose.connect(connectionString)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch(err => {
    console.error("Connection failed", err.message);
  });

app.use("/api/users", userRouter);
app.use("/api/gallery", galleryItemRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
