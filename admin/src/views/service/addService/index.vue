<template>
  <el-card>
    <el-form
      ref="accountForm"
      :model="accountForm"
      :rules="accountFormRules"
      label-width="150px"
      label-position="right"
    >
      <el-form-item label="姓名" prop="name">
        <el-select
          class="input-item"
          v-model="accountForm.name"
          placeholder="请选择"
          @change="selectChange"
        >
          <el-option
            v-for="(item, index) in roles"
            :key="index"
            :label="item.name"
            :value="item.person_id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="服务日期" prop="time">
        <el-date-picker
          class="input-item"
          v-model="accountForm.time"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="服务项目" prop="item">
        <el-select
          class="input-item"
          v-model="accountForm.item"
          placeholder="请选择"
          multiple
        >
          <el-option
            v-for="(item, index) in serverseList"
            :key="index"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="评分" prop="score">
        <el-input class="input-item" v-model="accountForm.score" />
      </el-form-item>
      <el-form-item label="评价" prop="evaluate">
        <el-select
          class="input-item"
          v-model="accountForm.evaluate"
          placeholder="请选择"
        >
          <el-option
            v-for="(item, index) in evaluateList"
            :key="index"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="服务人员" prop="person">
        <el-input class="input-item" v-model="accountForm.person" />
      </el-form-item>
      <el-form-item label="备注" prop="introduction">
        <el-input
          class="input-item"
          v-model="accountForm.introduction"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 8 }"
        />
      </el-form-item>
      <el-form-item label="照片" prop="imgUrl">
        <div
          v-for="(item, index) in imgList"
          :key="index"
          class="avatar-uploader"
        >
          <img :src="item" class="img" />
          <i class="el-icon-delete delete-icon" @click="deleteImg"></i>
        </div>
        <el-upload
          action=""
          v-model="imgList"
          :http-request="uploadURL"
          :before-upload="handleBeforeUpload"
          :show-file-list="false"
          :limit="9"
        >
          <el-button
            v-if="imgList.length <= 9"
            type="primary"
            class="upload-btn"
          >
            点击上传
          </el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-popconfirm
          confirm-button-text="确定"
          cancel-button-text="不用了"
          icon="el-icon-info"
          icon-color="red"
          title="确认添加该用户吗？"
          @onConfirm="addService"
        >
          <el-button slot="reference" type="primary" round plain>
            添加用户
          </el-button>
        </el-popconfirm>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import { addService, getUserList } from "@/api/user";
import { uploadFile } from "@/api/file";
import VueCoreImageUpload from "vue-core-image-upload";
import { client, getFileNameUUID } from "@/utils/alioss";

export default {
  name: "Index",
  data() {
    return {
      src: "./static/img/img.jpg",
      accountForm: {
        name: "",
        time: "",
        item: [],
        score: "",
        evaluate: "",
        person: "",
        introduction: "",
        imgUrl: "",
        person_id: "",
      },
      imgList: [],
      serverseList: [
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
      ],
      evaluateList: [
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
      ],
      accountFormRules: {
        name: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur",
          },
        ],
        time: [
          {
            required: true,
            message: "请选择服务日期",
            trigger: "blur",
          },
        ],
        item: [
          {
            required: true,
            message: "请选择服务项目",
            trigger: "blur",
          },
        ],
        score: [
          {
            required: true,
            message: "请输入评分",
            trigger: "blur",
          },
        ],
        evaluate: [
          {
            required: true,
            message: "请选择评价",
            trigger: "blur",
          },
        ],
        person: [
          {
            required: true,
            message: "请输入服务人员",
            trigger: "blur",
          },
        ],
      },
      // 角色列表
      roles: [],
      // 图片默认提交地址，未使用。
      action: "",
      // 上传文件列表
      fileList: [],
      // 是否禁用上传
      uploadDisabled: false,
    };
  },
  // 每次进入路有前，重新获取数据
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getUserList();
    });
  },
  computed: {
    headers() {
      return {
        Authorization: "Bearer " + this.$store.getters.token, // 直接从本地获取token就行
      };
    },
  },
  methods: {
    selectChange(item) {
      console.log(item);
      this.accountForm.person_id = item;
    },
    deleteImg(index) {
      this.imgList.splice(index, 1);
    },
    handleBeforeUpload(file) {
      const isJPEG = file.name.split(".")[1] === "jpeg";
      const isJPG = file.name.split(".")[1] === "jpg";
      const isPNG = file.name.split(".")[1] === "png";
      const isWEBP = file.name.split(".")[1] === "webp";
      const isGIF = file.name.split(".")[1] === "gif";
      const isLt500K = file.size / 1024 / 1024 / 1024 / 1024 < 4;
      if (!isJPG && !isJPEG && !isPNG && !isWEBP && !isGIF) {
        this.$message.error("上传图片只能是 JPEG/JPG/PNG 格式!");
      }
      if (!isLt500K) {
        this.$message.error("单张图片大小不能超过 4mb!");
      }
      return (isJPEG || isJPG || isPNG || isWEBP || isGIF) && isLt500K;
    },
    imageuploaded(res) {
      console.log(res);
    },
    handleError() {
      this.$notify.error({
        title: "上传失败",
        message: "图片上传接口上传失败，可更改为自己的服务器接口",
      });
    },
    uploadURL(file, index) {
      console.log(file, index);
      //注意哦，这里指定文件夹'image/'，尝试过写在配置文件，但是各种不行，写在这里就可以
      var fileName = "image/" + "banner" + `${Date.parse(new Date())}` + ".jpg";
      //定义唯一的文件名，打印出来的uid其实就是时间戳
      client()
        .multipartUpload(fileName, file.file, {
          progress: function (percentage, cpt) {
            console.log("打印进度", percentage);
          },
        })
        .then((res) => {
          //此处赋值，是相当于上传成功之后，手动拼接服务器地址和文件名
          //简单描述就是bucket概括，里面的域名地址，粘贴过来可以直接用
          console.log(res, "res++++");
          this.imgList.push(
            "https://service0615.oss-cn-hangzhou.aliyuncs.com/" + fileName
          );
        });
    },
    getUserList() {
      let params = {
        pagenum: 1,
        pagesize: 50,
      };
      getUserList(params).then((res) => {
        console.log(res.data.data.list);
        if (res.status === 200) {
          this.roles = res.data.data.list;
        } else {
          this.$message.error("获取角色选项失败");
        }
      });
    },
    addService() {
      this.$refs.accountForm.validate((valid) => {
        if (valid) {
          if (this.imgList.length == 0) {
            this.$message.error("请上传至少一张图片");
            return;
          }
          this.accountForm.imgUrl = this.imgList.toString();
          this.accountForm.item = this.accountForm.item.toString();
          addService(this.accountForm).then((response) => {
            const res = response.data;
            if (res.status === 200) {
              this.$message.success("账户添加成功");
            } else {
              this.$message.error("账户添加失败");
            }
          });
        } else {
          this.$message.error("添加失败，请检查内容是否填写完整！");
          return false;
        }
      });
    },
    // 上传文件
    uploadFile(param) {
      const formData = new FormData();
      formData.append("file", param.file);
      uploadFile(formData).then((response) => {
        const res = response.data;
        // 上传状态
        if (res.status === 200) {
          this.accountForm.avatar = res.data.fileUrl;
          param.onSuccess();
          this.uploadDisabled = true;
        } else {
          this.accountForm.avatar = "";
          this.$message.error("上传失败,请联系管理员！");
          param.onError();
          this.uploadDisabled = false;
        }
      });
    },
    beforeImgUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1;

      if (!isLt1M) {
        this.$message.error("上传封面图片大小不能超过 1MB!");
      }
      return isLt1M;
    },
    // 上传中
    imgOnProgress(event, file) {
      this.uploadDisabled = true;
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
