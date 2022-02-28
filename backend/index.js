import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

import userRoute from "./routes/users.js";

const app = express();

app.use(bodyParser.json({ limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({ limit:"30mb",extended:true}));

app.use(cors());

app.use('/storeUsers',userRoute);

const CONNECTION_URL = "mongodb+srv://tariq-rasheed:tariq-123@cluster0.xxyrn.mongodb.net/storeUsers?retryWrites=true&w=majority"; 

const PORT = 8000;

mongoose.connect(CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology: true})
    .then(() => app.listen(PORT,() => console.log(`Server running on Port: http://localhost:${PORT}`)))
    .catch((error)=> console.log(`${error} did not connect`));
