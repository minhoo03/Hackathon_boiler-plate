const express = require('express')
const app = express()
const port = 5000
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { User } = require('./models/User')
const { auth } = require('./middleware/auth')


const config = require('./config/key')

// middleware (body-parser : data 분석)
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser())

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
app.post('/api/users/register', (req, res) => {
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

app.post('/api/users/login', (req, res) => {
    //요청된 이메일을 데이터베이스에서 있는지 찾는다.
    User.findOne({ email: req.body.email }, (err, user) => {
      if (!user) {
        return res.json({
          loginSuccess: false,
          message: "제공된 이메일에 해당하는 유저가 없습니다."
        })
      }
  
      // req.body.pw => DB에 존재 => 둘이 일치하는가?
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch)
          return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." })
  
        // PW까지 일치 => Create token.
        user.generateToken((err, user) => {
          if (err) return res.status(400).send(err);
  
          // save token in cookie
          res.cookie("x_auth", user.token)
            .status(200)
            .json({ loginSuccess: true, userId: user._id })
        })
      }) // user.comparePassword
    }) // User.findOne
  })

app.get('/api/users/auth', auth, (req, res) => {
    // 여기까지 미들웨어를 통과해 왔다는 얘기는
    // Auth가 true라는 것
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
})

app.get('/api/users/logout', auth, (req, res) => {    
    User.findOneAndUpdate({_id: req.user._id},
        {token: ""}, (err, user) => {
            if(err) return res.json({success: false, err})
            return res.status(200).send({
                success: true
            })
        })
})

app.listen(port, () => {
    console.log(`Open Server! -> http://localhost:${port}`)
})