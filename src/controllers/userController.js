const { model } = require("mongoose")
const userModel = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "NOTESAPI"

const signup = async (req, res) => {
    const {username, email, password} = req.body
    try {
        const existingUser = await userModel.findOne({email: email})
        if(existingUser) {
            return res.status(400).json({message: "User already exists"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const res = await userModel.create({
            email: email,
            password: hashedPassword,
            username: username
        })

        const token = jwt.sign({email: res.email, id: res._id}, SECRET_KEY)
        res.status(201).json({user: res, token: token})
    }
    catch(error) {
        console.log(error)
        res.status(500).json({message: "Something went wrong"})

    }

}

const signin = async (req, res) => {
    const {email, password} = req.body
    try {
        const existingUser = await userModel.findOne({email: email})
        if(!existingUSer) {
            return res.status(404).json({message: "User not found"})
        }

        const matchPassword = await bcrypt.compare(password, existingUser.password)
        if(!matchPassword) {
            return res.status(400).json({message: "Invalid credentials"})
        }

        const token = jwt.sign({email: existingUser.email, existingUser: res._id}, SECRET_KEY)
        res.status(201).json({user: existingUser, token: token})
    }
    catch(error) {
        console.log(error)
        res.status(500).json({message: "Something went wrong")}
    }
}

module.exports = {signin, signup}