import  mongoose from 'mongoose'


conser userSchema = mongoose.Schema({
    name:{type:String, min:2, max:50, required:true},
    email:{type:String, required:true,unique:true},
    password:{type:String, min:2, max:50, required:true},
    photoURL:{type:String, default:''},
})


const User = mongoose.model('users', userSchema)

export default User;