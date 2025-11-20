// import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config({ path: './.env' }); // 👈 force load from root

// const connectDB = async () => {
//   try {
//     console.log("Hello");
//     mongoose.connection.on('connected', () => console.log('✅ Database connected'));
//         console.log("Mongo URI:", process.env.MONGODB_URI);
//     await mongoose.connect(process.env.MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//   } catch (error) {
//     console.log("Mongo URI:", process.env.MONGODB_URI);

//     console.log('❌ MongoDB connection error:', error.message);
//   }
// };

// export default connectDB;

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: './.env' });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log(" Database connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};

export default connectDB;
