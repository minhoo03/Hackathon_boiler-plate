const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10

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

// 저장하기 전 실행 => next를 보냄
userSchema.pre("save", function (next) {
// 생성자에 req.body 저장하므로 자기 자신을 가져옴
var user = this
    // 비밀번호 변경시에만
    if(user.isModified("password")){
        // 암호화
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if(err) return next(err);

            bcrypt.hash(user.password, salt, (err, hash) => {
                if(err) return next(err);

                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})

userSchema.methods.comparePassword = (pw, cb) => {
    // 입력 pw, DB pw 비교
    // DB pw를 복호화 할 수 없으니 pw를 암호화해서 비교
    bcrypt.compare(pw, this.password, (err, isMatch) => {
        if(err) return cb(err),
        cb(null, isMatch) // err:null, isMatch : true
    })
}

// 모델화 (스키마 집 - 데이터 허용 방식)
const User = mongoose.model('User', userSchema)
module.exports = {User}