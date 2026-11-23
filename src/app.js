const express = require("express")
const cookieParser = require("cookie-parser")
const authRoutes = require("./routes/auth.routes")
const morgan = require("morgan")
const accountRoutes = require("./routes/accont.routes")

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))


app.use("/api/auth", authRoutes)
app.use("/api/accounts", accountRoutes)


module.exports = app