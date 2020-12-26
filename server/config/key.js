// Local 환경 / Deploy(배포)한 후       :: HEROKU에 배포 후 변수 관리 중일 경우
if(process.env.NODE_ENV === 'production'){
    module.exports = require('./prod')
} else {
    module.exports = require('./dev')
}