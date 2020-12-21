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
        if(err) return res.json({ success: false, err})
        return res.status(200).json({
            success: true
        })
    })
})

app.listen(port, () => {
    console.log(`Open Server! -> http://localhost:${port}`)
})