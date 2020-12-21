const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
    },
    email: {
        type: String,
        trim: true, // 공백 허용 안함
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: { // 관리자 구분
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String,
    },
    tokenExp: { // 유효기간
        type: Number
    }
})

// 모델화 (스키마 집 - 데이터 허용 방식)
const User = mongoose.model('User', userSchema)
module.exports = {User}