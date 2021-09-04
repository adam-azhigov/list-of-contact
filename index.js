require('dotenv').config()
const cors = require('cors')
const express = require("express")
const mongoose = require("mongoose")
const router = require("./routes/index")


const app = express()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: true}))

app.use(router)


async function start() {
  try {
    await mongoose.connect(process.env.MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(process.env.PORT, () => {
      console.log("Сервер и БД запущены...");
    });
  } catch (e) {
    console.log(e.message);
  }
}

start()