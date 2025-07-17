// import mongoose, { mongo } from 'mongoose'

// const connectDB = async () => {
//     mongoose.connection.on('Connected', ()=> {
//         console.log("Database Connected");        
//     })

//     await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`)
// }

// export default connectDB;






import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Database connected');
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1); // stop the app
  }
};

export default connectDB;
