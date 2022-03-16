const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userCtrl = {
    getUsers: async (req, res) => {
        try {
            const users = await User.find({})
            return res.json({msg: "Usuario creado",
            users
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getOneUser: async (req, res) => {
        try {
            const users = await User.findById(req.params.id)
            res.json({msg: "Usuario encontrado",
            users
            })
        } catch (error) {
            res.status(500).send({message: error.message})
        }
    },
    createUser: async (req, res) => {
        const {userName, surname, age, email, password} = req.body

        try {
            if (!userName || !surname || !email || !password) {
                return res.status(400).send({
                    success: false,
                    message: "Campos incompletos"
                })
            }

            let user = await User.findOne({email})
            if (user) {
                return res.status(400).send({
                    succes: false,
                    message: "Este mail ya esta registrado"
                })
            }

            const passwordHash = bcrypt.hashSync(password, 10)

            let newUser = new User({
                userName,
                surname,
                age,
                email,
                password: passwordHash
            })

            await newUser.save()
            return res.json({
                msg: "Usuario creado correctamente",
                newUser
            })
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: error.message
            })
        }
    },
    login: async (req, res) => {
        const{email, password} =req.body
        try {
            let user = await User.findOne({email})
            
            if(!password){
                return res.status(400).send({
                    message:"COntraseña equivocada"
                })
            }
    
            let passwordMatch = await bcrypt.compare(password, user.password)
            if(!passwordMatch) {
                return res.status(400).send({
                   message: "Wrong credential/password"
                })
            }
    
            if (!user) {
                return res.status(400).send({
                    message:"Usuario no registrado"
                })
            }
            const token = accessToken({id:user._id})
            return res.json({
                message: "Usuario logueado correctamente",
                token
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateUser: async (req, res) => {
        const { userName, surname, age, password
        } = req.body
        try {
            await User.findByIdAndUpdate(req.params.id, {
                userName,
                surname,
                age,
                password
            })
            return res.json({
                message: "Usuario actualizado"
            })
        } catch (error) {
            return res.status(500).send({
            message: error.message
            })
        }
    },
    deleteUser: async (req, res) => {
        try {
            await User.findByIdAndDelete(req.params.id)
            return res.json({
                message: "Usuario borrado"
            })
        } catch (error) {
            return res.status(500).send({
                message: error.message
            })
        }
    },
    addCart: async (req, res) => {
    
        try {
            const user = await User.findById(req.user.id)
            if (!user) return res.status(400).json({
                message: "El usuario no existe"
            })
    
            await User.findOneAndUpdate({
                _id: req.user.id
            }, {
                cart: req.body.cart
            })
    
            return res.status(200).json({
                msg: "Producto añadido al carrito!"
            })
        } catch (err) {
            return res.status(500).json({
                msg: err.message
            })
        }
    }
}

const accessToken = (user)=> {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "7d"})
}

module.exports = userCtrl