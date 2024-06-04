const express = require("express")
const router = express.Router()
const userSchema = require('../validation')
const jwt = require('jsonwebtoken')
const user = require('../db')
const {userSchema,updateUser} = require("../validation")
const secret = require('../validation')
const { authMiddleware } = require("../middlewae")


router.post("/signup",async function(req,res){
    const body = req.body
    const validate = userSchema.safeParse({body})
    const alreadyExist = user.findOne({username:body.username})

    if (validate.success && !user._id){
        const createdUser = await user.create({body})
        const token = jwt.sign({
            userId:createdUser._id
        },secret)
        res.status(200).json({
            msg: "user created successfully"
        })
    }else{
        return res.json({
            msg: "user already exists/wrong input",
            token:token
            
        })
    }
})


router.post('/signin',function(req,res){
    const body = body.req
    const foundUser = user.findOne(body)
    
})


router.put('/:id',authMiddleware, async function(req,res){
    const userId = req.body.id
    const body  = updateUser.safeParse(req.body)
    if(!body.success){
        res.status(403).json({})
    }

    await user.updateOne({_id:userId},req.body)
   
        user.save()
    res.json({
        msg:"user updated"
    })
})

module.exports = router