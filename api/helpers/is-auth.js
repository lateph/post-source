const isAuthenticated = ({ user }) => {
    if(!user){
        throw new Error("not authorized")
    }
}
const isAdmin = ({ user }) => {
    if(!user){
        throw new Error("not authorized")
    }
}
const isEqualAuthenticated = ({ user }, _id) => {
    if(!user){
        throw new Error("not authorized")
    }
    if(user.userId != _id){
        throw new Error("user not match")
    }
}
module.exports = {
    isAdmin,
    isAuthenticated,
    isEqualAuthenticated
}