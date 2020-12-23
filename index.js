const express = require('express')
const app = express()
const port = 5000
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const { User } = require('./models/User')

const config = require('./config/key')

// middleware (body-parser : data 분석)
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log(`mongoDB Connectec...`)).catch(err => console.log(err))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// sign up Route API
app.post('/register', (req, res) => {
    // Client => data => insert DB     :: req.body = {id, pw, name....}
    const user = new User(req.body)
    // save data in model
    user.save((err, doc) => {
        console.log(req.body)
        if(err) return res.json({ success: false, err})
        return res.status(200).json({
            success: true
        })
    })
})

app.post('/login', (req, res) => {
    // 요청된 email이 DB에 있나 확인
    User.findOne({email: req.body.email}, (err, user) => {
        if(!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }
    })
    // DB에 email이 있다면 제대로 된 pw인지 확인 : (입력한 pw, 콜백)
    user.comparePassword(req.body.password, (err, isMatch) => {
        if(!isMatch) return res.json({loginSuccess: false, message:"비밀번호가 틀렸습니다."})

        // pw : true => create token
        user.genToken((err, user) => {
            
        })
        
    })
})

app.listen(port, () => {
    console.log(`Open Server! -> http://localhost:${port}`)
})