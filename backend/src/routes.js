import { Router } from "express"

const routes = Router()

routes.get("/", (req, res) => {
    res.send("Hello backend")
})

export default routes