import "dotenv/config";
import app from "./app";
import connectDB from "./config/db";

const PORT = process.env.PORT;


const startServer = async () => {
    await connectDB();
}

app.listen(PORT, ()=>{
    console.log(`Running  on http://localhost:${PORT}`);
    
})

startServer();