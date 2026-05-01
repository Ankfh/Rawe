import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import uploadFileRoutes from './modules/uploadFile/routes/uploadFileRoutes.js';
import authRoutes from './modules/auth/routes/authRoutes.js';
import aiRoutes from './modules/ai/routes/aiRoutes.js';
import adminRoutes from './modules/admin/routes/adminRoutes.js';
import { configurePassportGoogle } from './modules/auth/services/passportGoogleService.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

configurePassportGoogle();

// Middleware
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'local-session-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// MongoDB Connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Routes
app.get('/', (req, res) => {
  res.send('AI Book Reader API is running...');
});

app.use('/api/upload-file', uploadFileRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/admin', adminRoutes);

// Start Server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
