const { sequelize, DataTypes } = require("../config/connect") // 引入相关依赖以及数据库
const HomeCare = sequelize.define(
    "aw_homecare", // 数据库中生成的表名(最终会自动在末尾添加s,因此最终数据库中生自动成表名为accounts
    { // 表字段信息配置
      id: {
        type: DataTypes.INTEGER(11), // 字段类型
        allowNull: false, // 是否允许为空
        autoIncrement: true,
        primaryKey: true, // 是否主键
      },
      time: {
        type: DataTypes.DATE, // 字段类型
        allowNull: false, // 是否允许为空
        comment: '服务时间'
      },
      item: {
        type: DataTypes.STRING, // 字段类型
        allowNull: false, // 是否允许为空
        comment: '服务项目'
      },
      score: {
        type: DataTypes.INTEGER, // 字段类型
        allowNull: true, // 是否允许为空
        comment: '服务评分'
      },
      evaluate: {
        type: DataTypes.STRING, // 字段类型
        allowNull: true, // 是否允许为空
        comment: '服务反馈'
      },
      person: {
        type: DataTypes.STRING, // 字段类型
        allowNull: true, // 是否允许为空
        comment: '服务人员'
      },
      introduction:{
        type: DataTypes.STRING, // 字段类型
        allowNull: true, // 是否允许为空
        comment: '备注'
      }
    },
    {
      timestamps: true, // 是否自动在数据表中添加数据操作时间
    }
)

// Service.sync({force:true}).catch((err) => {
//   console.log(err)
// }) // 是否自动创建表

module.exports = HomeCare
