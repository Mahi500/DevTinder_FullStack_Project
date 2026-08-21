const validator = require('validator')

const validateSignUpData = (req)=>{

    const {firstName, lastName, emailId, password} = req.body

    if(!firstName || !lastName){
      throw new Error("Invalid Name!")
    }
    else if(!validator.isEmail(emailId)){
      throw new Error("Invalid EmailId!")
    }
    else if(!validator.isStrongPassword(password)){
      throw new Error("Enter a Strong Password")
    }

}

const validateLoginData = (req) =>{
    const {emailId, password} = req.body
    if(!emailId || !password) {
        throw new Error("Enter All Credentials")
    }
    if(!validator.isEmail(emailId)){
        throw new Error("Enter valid EmailId!")
    }
}

const validateProfileUpdateData = (req) =>{
    const UPDATE_ALLOWED_FIELDS = ["firstName","lastName","emailId","skills","photoUrl", "age", "gender", "about"]
    if(req.body.skills.length > 10){
        throw new Error("Skills must not be greater than 10")
    }
    if(req.body.about.length > 100){
        throw new Error("about should be lessthan 100 characters")
    }
    if(!validator.isURL(req.body.photoUrl)){
        throw new Error("Please provide valid photo details")
    }
    const isEditAllowed = Object.keys(req.body).every((key)=>{
       return UPDATE_ALLOWED_FIELDS.includes(key)
    })
    //const isEditAllowed = Object.keys(req.body).every((key)=>UPDATE_ALLOWED_FIELDS.includes(key))

    return isEditAllowed
}

module.exports = {
    validateSignUpData,
    validateLoginData,
    validateProfileUpdateData
}