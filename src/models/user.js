const mongoose = require('mongoose')

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
        trim : true
    },
    password : {
        type : String,
        required : true
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
        default : 'https://geographyandyou.com/images/user-profile.png'
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
}
)

// thi should starts with capital letter
const User = mongoose.model("User", userSchema)


module.exports = {
    User
}