<template>
  <el-card>
    <el-form
      v-if="accountForm"
      ref="accountForm"
      :model="accountForm"
      label-width="150px"
      label-position="right"
    >
      <el-form-item label="姓名" prop="name">
        {{ accountForm.aw_userinfo.name }}
      </el-form-item>
      <el-form-item label="服务日期" prop="time">
        {{ accountForm.time }}
      </el-form-item>
      <el-form-item label="服务项目" prop="item">
        {{ accountForm.item }}
      </el-form-item>
      <el-form-item label="评分" prop="score">
        {{ accountForm.score }}
      </el-form-item>
      <el-form-item label="评价" prop="evaluate">
        {{ accountForm.evaluate | filter1 }}
      </el-form-item>
      <el-form-item label="服务人员" prop="person">
        {{ accountForm.person }}
      </el-form-item>
      <el-form-item label="备注" prop="introduction">
        {{ accountForm.introduction }}
      </el-form-item>
      <el-form-item label="照片" prop="imgUrl">
        <div
          v-for="(item, index) in imgList"
          :key="index"
          class="avatar-uploader"
        >
          <img :src="item" class="img" />
        </div>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import { getServiceDetail } from "@/api/user";

export default {
  name: "Index",
  data() {
    return {
      src: "./static/img/img.jpg",
      accountForm: null,
      imgList: [],
    };
  },
  // 每次进入路有前，重新获取数据
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getServiceDetail();
    });
  },
  filters: {
    filter1: function (value) {
      let evaluateList = [
        {
          value: "0",
          label: "非常满意",
        },
        {
          value: "1",
          label: "满意",
        },
        {
          value: "2",
          label: "一般",
        },
        {
          value: "3",
          label: "不满意",
        },
        {
          value: "4",
          label: "非常不满意",
        },
      ];
      let temp = evaluateList.filter((item, index) => {
        if (item.value == value) {
          return item.label;
        }
      });
      return temp[0].label;
    },
    filter2: function (value) {
      let serverseList = [
        {
          value: "0",
          label: "家庭保洁",
        },
        {
          value: "1",
          label: "洗衣服务",
        },
        {
          value: "2",
          label: "助浴服务",
        },
        {
          value: "3",
          label: "助行服务",
        },
        {
          value: "4",
          label: "代办服务",
        },
        {
          value: "5",
          label: "理发服务",
        },
        {
          value: "6",
          label: "临时康护服务",
        },
        {
          value: "7",
          label: "家电维护",
        },
        {
          value: "8",
          label: "厨房维护",
        },
        {
          value: "9",
          label: "生活护理",
        },
        {
          value: "10",
          label: "修指甲",
        },
        {
          value: "11",
          label: "康复保健",
        },
        {
          value: "12",
          label: "助医服务",
        },
        {
          value: "13",
          label: "代购代买",
        },
        {
          value: "14",
          label: "上门助餐",
        },
        {
          value: "15",
          label: "生日庆祝",
        },
        {
          value: "16",
          label: "赠送礼品",
        },
      ];
      let arr = value.split(",");
      let temp = serverseList.filter((item, index) => {
        for (const ite in arr) {
          if (item.value == ite) {
            return item.label;
          }
        }
      });
      console.log(temp);
      return temp[0].label;
    },
  },
  computed: {},
  methods: {
    getServiceDetail() {
      let params = {
        id: this.$route.query.id,
      };
      getServiceDetail(params).then((res) => {
        if (res.status === 200) {
          this.accountForm = res.data.data[0];
          this.imgList = this.accountForm.imgUrl.split(",");
        } else {
          this.$message.error("获取角色选项失败");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-card {
  margin: 20px;
}

// .el-upload--picture-card 控制加号部分
::v-deep .disabled .el-upload--picture-card {
  display: none !important;
}

::v-deep {
  .el-form-item__content {
    width: 100%;
    margin-left: 20px !important;
  }
  .el-form-item:nth-child(2) .el-form-item__content,
  .el-form-item:nth-child(3) .el-form-item__content {
    margin-left: 28px;
  }

  .el-form-item:nth-child(6) {
    margin-left: 0;
  }

  .el-input__inner {
    width: 100%;
  }

  .el-textarea__inner {
    width: 100%;
  }
}
.input-item {
  width: 400px;
}

.contact-box {
  display: flex;
  width: 100%;
  .contact-item {
    flex: 1;
  }
}
.avatar {
  display: inline-block;
  width: 100px;
  height: auto;
}
.avatar-uploader {
  background-color: #fbfdff;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  box-sizing: border-box;
  width: 148px;
  height: 148px;
  line-height: 146px;
  vertical-align: top;
  text-align: center;
  font-size: 30px;
  color: #c0ccda;
  margin-right: 10px;
  position: relative;
  .img {
    display: block;
    margin-right: 10px;
    width: 140px;
    height: auto;
  }
}
.delete-icon {
  font-size: 20px;
  position: absolute;
  right: 5px;
  top: 5px;
  cursor: pointer;
  color: red;
}
.upload-btn {
  width: 100px;
  height: 40px;
}
</style>
