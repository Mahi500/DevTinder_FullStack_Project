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

module.exports = {
    validateSignUpData,
    validateLoginData
}