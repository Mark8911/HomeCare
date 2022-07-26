<template>
  <div>
    <el-upload
      class="avatar-uploader"
      action=""
      v-model="Addfrom.url"
      :http-request="uploadURL"
      :multiple="true"
      :before-upload="handleBeforeUpload"
      :limit="8"
    >
      <img v-if="Addfrom.url" :src="Addfrom.url" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import VueCoreImageUpload from "vue-core-image-upload";
import { client, getFileNameUUID } from "../../utils/alioss";

export default {
  data: function () {
    return {
      src: "./static/img/img.jpg",
      fileList: [],
      fileList: [],
      Addfrom: {
        url: "",
      },
    };
  },
  components: {
    VueCoreImageUpload,
  },
  methods: {
    imageuploaded(res) {
      console.log(res);
    },
    handleError() {
      this.$notify.error({
        title: "上传失败",
        message: "图片上传接口上传失败，可更改为自己的服务器接口",
      });
    },
    uploadURL(file) {
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
          this.Addfrom.url =
            "https://service0615.oss-cn-hangzhou.aliyuncs.com/" + fileName;
          console.log(this.Addfrom.url, "this.Addfrom.url");
        });
    },
  },
};
</script>

<style scoped>
.content-title {
  font-weight: 400;
  line-height: 50px;
  margin: 10px 0;
  font-size: 22px;
  color: #1f2f3d;
}
.pre-img {
  width: 250px;
  height: 250px;
  margin-bottom: 20px;
}
</style>
