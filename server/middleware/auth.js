const { User } = require('../models/User')

let auth = (req, res, next) => {
    // 인증처리

    // client의 'x_auth'라는 cookie에서 token 가져옴
    let token = req.cookies.x_auth
    // token 복호화 => DB에서 유저를 찾는다
    User.findByToken(token, (err, user) => {
        if(err) throw err
        if(!user) return res.json({isAuth: false, error:true})

        // DB에서 확인한 유저 정보를 보내줌
        req.token = token
        req.user = user
        // 이제 다음단계로 넘어가렴
        next()
    })

} 

module.exports = {auth}