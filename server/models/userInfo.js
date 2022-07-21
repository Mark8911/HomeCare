const { sequelize, DataTypes } = require("../config/connect") // 引入相关依赖以及数据库
const UserInfo = sequelize.define(
    "aw_userinfo", // 数据库中生成的表名(最终会自动在末尾添加s,因此最终数据库中生自动成表名为accounts
    { // 表字段信息配置
      person_id: {
        type: DataTypes.INTEGER(11), // 字段类型
        allowNull: false, // 是否允许为空
        autoIncrement: true,
        primaryKey: true, // 是否主键
      },
      name: {
        type: DataTypes.STRING, // 字段类型
        allowNull: false, // 是否允许为空
        comment: '姓名'
      },
      age: {
        type: DataTypes.STRING, // 字段类型
        allowNull: true, // 是否允许为空
        comment: '年龄'
      },
      sex: {
        type: DataTypes.STRING, // 字段类型
        allowNull: true, // 是否允许为空
        comment: '性别'
      },
      birth: {
        type: DataTypes.DATE, // 字段类型
        allowNull: true, // 是否允许为空
        comment: '出生日期'
      },
      idCard: {
        type: DataTypes.STRING, // 字段类型
        allowNull: false, // 是否允许为空
        comment: '证件号'
      },
      address: {
        type: DataTypes.STRING, // 字段类型
        allowNull: true, // 是否允许为空
        comment: '家庭住址'
      },
      marital: {
        type: DataTypes.STRING, // 字段类型
        allowNull: true, // 是否允许为空
        comment: '婚姻状况'
      },
      type: {
        type: DataTypes.STRING, // 字段类型
        allowNull: false, // 是否允许为空
        comment: '残疾类型'
      },
      introduction:{
        type: DataTypes.STRING, // 字段类型
        allowNull: true, // 是否允许为空
        defaultValue:'备注'
      },
      imgUrl:{
        type: DataTypes.STRING, // 字段类型
        allowNull: true, // 是否允许为空
        defaultValue:'照片'
      }
    },
    {
      freezeTableName: false,
      timestamps: true, // 是否自动在数据表中添加数据操作时间
    }
)

// UserInfo.sync({force:true}) // 是否自动创建表

module.exports = UserInfo
