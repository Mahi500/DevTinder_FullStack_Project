const adminAuth=(req, res, next)=>{
    const token ="xyzhh"
    const isadminAuthorized = token === "xyz"
    if(!isadminAuthorized){
        res.status(401).send("Unathorized request")
    }
    else{
        next()
    }
}

const userAuth=(req, res, next)=>{
    const token ="xyz"
    const isadminAuthorized = token === "xyz"
    if(!isadminAuthorized){
        res.status(401).send("Unathorized request")
    }
    else{
        next()
    }
}

module.exports ={adminAuth, userAuth}