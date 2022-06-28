const {
  HomeCare
} = require('../models/index')

class HomeCareService {
  // 根据id查询
  async getServiceById(id) {
    return HomeCare.findAll({
      where: {
        id: id
      },
    })
  }
  
  // 新增
  async createService(service) {
    console.log(service)
    return HomeCare.create(service)
  }
  
  async getServiceList(params) {
    return HomeCare.findAndCountAll({
      limit: parseInt(params.pagesize),
      // 跳过实例数目
      offset: (params.pagenum - 1) * parseInt(params.pagesize)
    })
  }
  
  // 更新
  async updateService(serviceId, data) {
    return HomeCare.update(data, {
      where: {
        id: serviceId
      },
    })
  }
  
  // 删除
  async deleteService(id) {
    return HomeCare.destroy({
      where: {
        id: id
      },
    })
  }
}

module.exports = new HomeCareService()
