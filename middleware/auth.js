 const req = require('express/lib/request');
 const res = require('express/lib/response');
 const jwt = require('jsonwebtoken')

 const auth = (req, res, next) =>{
     try {
         const token = req.header("Authorization")
         if(!token) return res.status(400).send({
             succes: false,
             message: "Invalid Authentication"})
 
         jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>{
             if(err) return res.status(400).send({
                succes: false, 
                message: "Invalid Authentication"})
 
             req.user = user
             next()
         })
     } catch (err) {
         return res.status(500).json({msg: err.message})
     }
 }
 
 module.exports = auth