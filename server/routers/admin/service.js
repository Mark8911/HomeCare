/**
 * @Description:
 * @author xiaochen
 * @date 2022/06/28
 */
 const Router = require('koa-router')
 const router = new Router()
 const service = require('../../controllers/serviceController')
 const routers = router
   .post('/addService', service.addService)
   .get('/getServiceList', service.getServiceList)

 module.exports = routers
 