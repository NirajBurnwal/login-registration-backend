import express, { urlencoded } from "express"
import cors from "cors"
import mongoose from "mongoose"

const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/myLoginRegisterDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB Connected")
})

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const user = new mongoose.model("user", userSchema)

// Routes

app.post('/login', (req, res) => {
    const { email, password } = req.body
    user.findOne({ email: email }, (err, user) => {
        if (user) {
            if (password === user.password) {
                res.send({ message: "login Successful", user: user })
            } else {
                res.send({ message: "Password didn't match" })
            }
        } else {
            res.send("User not Registered")
        }
    })
})

    app.post('/register', (req, res) => {
        const { name, email, password } = req.body
        user.findOne({ email: email }, (err, user) => {
            if (user) {
                res.send({ message: "User already Registered" })
            } else {
                const user = new user({
                    name,
                    email,
                    password
                })
                user.save(err => {
                    if (err) {
                        res.send(err)
                    } else {
                        res.send({ message: "Successfully Registered" })
                    }
                })
            }
        })

    })

    app.listen(9002, () => {
        console.log("BE started at PORT 9002")
    })





