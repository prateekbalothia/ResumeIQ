import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import testRoutes from "./routes/test.routes"
import analyzeRoutes from "./routes/analyze.routes";
import authRoutes from "./routes/auth.routes";

const app= express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (_,res)=>{
    res.json({
        success:true,
        message:"API is running"
    });
});

app.use("/api/test", testRoutes)
app.use("/api/auth", authRoutes);
app.use("/api/analyze", analyzeRoutes);

export default app;