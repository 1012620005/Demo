<template>
  <div class="avatar">
    <div class="avatar-uploader">
        <div class="avatar-uploader-size-img" @click="avataruploader" >
          <img v-if="imageUrl" :src="imageUrl" class="avatars">
          <span v-else ><img src="../assets/image/headportrait.png"/></span>
        </div>
    </div>
    <el-dialog
      :visible.sync="avataruploaders"
      size="tiny">
      
        <div slot="title" class="mark-avatar-uploader-cmp" >
          <img class="mark-avatar-uploader-icon" src="../assets/image/avataruploader-icon.png"/><p>头像设置</p>
        </div>
        <div>
        <el-upload
          class="mark-avatar-uploader"
          action="http://192.168.10.226/zuul/uc/common/ctrl/uploadPhoto"
          :show-file-list="false"
           name="photo"
           :http-request="upload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <span v-else ><img src="../assets/image/avatarupload.png"/></span>
        </el-upload>
      </div>
      <span slot="footer" class="dialog-footer">
        
        <el-button type="primary" @click="avataruploaders = false">保存头像</el-button>
        <el-button @click="avataruploadagain">重新上传</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'avatar',
  data () {
    return {
     imageUrl: '',
     avataruploaders: false,
    }
  },
  methods: {
    upload(file){
      console.log(file)
      const isJPG = file.file.type === 'image/jpeg'||'image/bmp'||'image/jpg'||'image/png';
      const isLt2M = file.file.size / 1024 / 1024 < 2;
      
      if (!isJPG) {
        this.$message.error('上传头像图片格式错误!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      if(isJPG && isLt2M){
        this.imageUrl = URL.createObjectURL(file.file);
        this.$emit('services-change',file)
      }
      
    },
    avataruploader(){
      this.avataruploaders = true; 
    },
    avataruploadagain(){
      this.imageUrl =""
    },
  }
}
</script>
<style scoped>
.avatar{
  text-align:center;
}
.avatar-uploader{
  margin-bottom:18px;
}
.avatar-uploader-size-img {
  margin:0 auto;
  width:80px;
  height:80px;
  cursor: pointer;
  border-radius: 50%;
}
.avatar-uploader-size-img .avatars{
  width:80px;
  height:80px;
  border-radius: 50%;
}
.avata{
  width:80px;
  height:80px;
  border-radius: 50%;
}
/*头像上传弹出*/
.mark-avatar-uploader-cmp{
   display:inline-block;
  float: left;
}
.mark-avatar-uploader-cmp p{
   display:inline-block;
  margin-left:10px;
}
.mark-avatar-uploader-icon{
vertical-align: middle;
}
.mark-avatar-uploader .el-upload{
  width:150px;
  height:150px;
  background-color:#bfcbd9;
}
.mark-avatar-uploader img{
  width:183px;
  height:183px;
}
</style>
