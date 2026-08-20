const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

// Schema and SchemaType
const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        minLength : 4,
        maxLength : 50
    },
    lastName : {
        type : String
    },
    emailId : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        validate(value) {
          if(!validator.isEmail(value)){
            throw new Error("Invalid emailId format")
          }
        }
    },
    password : {
        type : String,
        required : true,
        validate(value) {
            if(!validator.isStrongPassword(value)){
                throw new Error("Strong password is required")
            }
        }
    },
    age : {
        type : Number,
        min : 18,
        max : 60
    },
    gender : {
        type : String,
        validate(value){
            if(!["Male", "Female", "Others"].includes(value)){
                 throw new Error("Gender data is not valid")
            }
        }
    },
    photoUrl : {
        type : String,
        default : 'https://geographyandyou.com/images/user-profile.png',
        validate(value) {
            if(!validator.isURL(value)){
                throw new Error("Please provide valid photo details")
            }
        }
    },
    about : {
        type : String,
        default :"This is default of about the user"
    },
    skills : {
        type : [String]
    },
},
{
    timestamps : true,
},

)
userSchema.methods.getJWT = async function() {
    const user = this
    const jwttoken = await jwt.sign({_id : user._id}, 'Tk@5f&W3021', {expiresIn : '1d' })
    return jwttoken
},

userSchema.methods.validatePassword = async function(passwordInputByUser) {
    const user = this
    const validPassword = await bcrypt.compare(passwordInputByUser, user.password)
    return validPassword
}

// this should starts with capital letter
const User = mongoose.model("User", userSchema)


module.exports = {
    User
}