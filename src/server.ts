import dotenv from "dotenv";
dotenv.config();

import app from "./app";

const PORT = parseInt(process.env.PORT || "3000", 10);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📦 Storage: in-memory JSON arrays (data resets on restart)`);
  console.log(`🔑 Default admin: admin@ems.com / admin123`);
  console.log(`📋 Available routes:`);
  console.log(`   POST  /auth/register`);
  console.log(`   POST  /auth/login`);
  console.log(`   GET   /auth/me`);
  console.log(`   GET   /employees          (All roles)`);
  console.log(`   GET   /employees/:id      (All roles)`);
  console.log(`   POST  /employees          (Admin, Manager)`);
  console.log(`   PUT   /employees/:id      (Admin, Manager)`);
  console.log(`   DELETE /employees/:id     (Admin only)`);
  console.log(`   POST  /upload/csv         (Admin, Manager)`);
  console.log(`   GET   /upload/export      (Admin, Manager)`);
});
