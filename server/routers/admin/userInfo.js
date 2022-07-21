/**
 * @Description:
 * @author xiaochen
 * @date 2022/06/28
 */
 const Router = require('koa-router')
 const router = new Router()
 const userInfo = require('../../controllers/userController')
 const routers = router
   .post('/addUser', userInfo.addUserInfo)
   .get('/getUserList', userInfo.getUserList)
   .get('/getUserDetail', userInfo.getUserDetail)

 module.exports = routers
 