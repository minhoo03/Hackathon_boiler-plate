const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')

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
    // 입력 pw, DB pw 비교
    // DB pw를 복호화 할 수 없으니 pw를 암호화해서 비교
    userSchema.methods.comparePassword = function (plainPassword, cb) {

        //plainPassword 1234567    암호회된 비밀번호 $2b$10$l492vQ0M4s9YUBfwYkkaZOgWHExahjWC
        bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
            if (err) return cb(err);
            cb(null, isMatch);
        })
    }

// Create token use 'jsonwebtoken'
userSchema.methods.generateToken = function (cb) {
    var user = this;
    // _id는 한 DB마다의 key
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    // user._id + 'secretToken' = token... 'secretToken'만 넣어도 user._id가 나오니 토큰만 가지고 누군지 알 수 있다

    user.token = token
    user.save(function (err, user) {
        if (err) return cb(err)
        cb(null, user)
        // index.js에서 cb에 콜백을 넣음 => 어떤 값을 돌려줄지 작성한 것
    })
}
 
userSchema.statics.findByToken = function(token, cb) {
    var user = this;
    // user._id + ''  = token
    //토큰을 decode 한다. 
    jwt.verify(token, 'secretToken', function (err, decoded) {
        // 유저 id를 이용해 유저를 찾은 후
        // 클라에서 가져온 token과 DB에 보관된 토큰과 일치하나 확인

        // token을 secretToken으로 복호화 하면 decoded된 것이 _id다
        user.findOne({ "_id": decoded, "token": token }, function (err, user) {
            if (err) return cb(err);
            cb(null, user)
        })
    })
}

// 모델화 (스키마 집 - 데이터 허용 방식)
const User = mongoose.model('User', userSchema)
module.exports = {User}