import express from "express"
import cors from "cors"

const app = express()

app.use(cors({
    origin: '*',
    credentials: true
}))

app.use(express.json({limit: "50mb"}))
app.use(express.urlencoded({extended: true, limit: "50mb"}))
app.use(express.static("public"))

// Routes import
import healthcheckRouter from "./routes/healthcheck.routes.js"
import lostandfoundRouter from "./routes/lostandfound.routes.js"
import inventoryRouter from "./routes/inventory.routes.js"
import eventsRouter from "./routes/events.routes.js"

// Routes declaration
app.use("/api/v1/healthcheck", healthcheckRouter)
app.use("/api/v1/lost-and-found", lostandfoundRouter)
app.use("/api/v1/inventory", inventoryRouter)
app.use("/api/v1/events", eventsRouter)

export {app}